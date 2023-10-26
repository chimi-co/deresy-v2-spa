const hypercertNames = {};

const getRequest = async () => {
  if (account) {
    let alertBox = document.getElementById("get-request-info");
    let getRequestBtn = document.getElementById("getRequestBtn");

    try {
      alertBox.classList.add("info");
      alertBox.innerHTML = '<span>In Progress...</span> <img width="2%" src="spinner.gif"/>';

      getRequestBtn.disabled = true;

      const optimismWeb3 = new Web3("https://optimism-mainnet.infura.io/v3/93cf3e10ca0044cdad4ac63eecdc04fc");
      const hypercertContract = new optimismWeb3.eth.Contract(hypercertAbi, hypercertContractAddress, {
        from: account,
      });
      const name = document.getElementById("getRequestName").value;
      
      const validData = validateGetRequestFields(name);
      
      if(validData) {
        const contract = new web3.eth.Contract(abi, contractAddress, {
          from: account,
        });
        const easContract = new web3.eth.Contract(easAbi, easContractAddress, {
          from: account,
        });
        const request = await contract.methods.getRequest(name).call();
        const reviewForm = await contract.methods.getReviewForm(request.reviewFormIndex).call();
        const easAttestations = [];
        for(const r of request.reviews){
          easAttestations.push(await easContract.methods.getAttestation(r.attestationID).call());
        }

        for (const hypercertID of request.hypercertIDs) {
          let hypercertUri = await hypercertContract.methods.uri(hypercertID).call();
          if(hypercertUri){
            const sanitizedUri = hypercertUri.startsWith('ipfs://') ? hypercertUri.replace('ipfs://', '') : hypercertUri
            const hypercertData = await (await fetch(`https://ipfs.io/ipfs/${sanitizedUri}`)).json();
            hypercertNames[hypercertID] = hypercertData.name;
          } else {
            hypercertNames[hypercertID] = null
          }
        }

        
        await fillReviewsTable(reviewForm, request, easAttestations);
        await fillReviewRequestTable(request);
        await fillReviewFormTable(reviewForm);
        initializeSimpleMDETextAreas();
      }
    } catch (error) {
      getRequestBtn.disabled = false;

      alertBox.classList.remove("info");
      alertBox.innerHTML = "";

      throw error;
    }
    getRequestBtn.disabled = false;

    alertBox.classList.remove("info");
    alertBox.innerHTML = "";
  }
};

const initializeSimpleMDETextAreas = () => {
  setTimeout(() => {
    const textAreas = document.getElementsByClassName("textarea-markdown");
    for (let textArea of textAreas) {
      const s = new SimpleMDE({ element: textArea, toolbar: false, spellChecker: false, status: false });
      s.togglePreview();
    }
  }, 300);
};

const fillReviewsTable = async (reviewForm, request, easAttestations) => {
  const easContract = new web3.eth.Contract(easAbi, easContractAddress, {
    from: account,
  });
  var noReviewsDiv = document.getElementById("no-reviews-message");
  document.getElementById("reviews-table-div").style="display:block";
  var reviewsTable = document.getElementById("reviews-table");
  if(request.reviews.length > 0) {
    noReviewsDiv.style = "display:none;"
    var reviewsTbody = document.getElementById('reviewsTbody');
    reviewsTbody.innerHTML = '';
    var oddTd = true;
    request.reviews.forEach(async (review, index) => {
      const reviewAttestation = easAttestations.find((attestation) => attestation.uid == review.attestationID);
      const abi = [
        { type: 'string', name: 'requestName' },
        { type: 'uint256', name: 'hypercertID' },
        { type: 'string[]', name: 'answers' },
        { type: 'string', name: 'pdfIpfsHash'},
        { type: 'string[]', name: 'attachmentsIpfsHashes' },
      ];
      const amendmentAbi = [
        { type: 'string', name: 'requestName' },
        { type: 'uint256', name: 'hypercertID' },
        { type: 'string', name: 'amendment' },
        { type: 'string[]', name: 'attachmentsIpfsHashes' },
      ];
      const decodedData = web3.eth.abi.decodeParameters(abi, reviewAttestation.data);
      
      var reviewTr = document.createElement('tr');
      if(oddTd){
        reviewTr.classList.add("pure-table-odd");
      }
      oddTd = !oddTd;
      var reviewTd = document.createElement('td');
      reviewTr.appendChild(reviewTd);
      let reviewsText = "";
      reviewsText += `
        <h3 style="margin:0% !important">
          Review ${index+1} by (${review.reviewer})
        </h3>
        <br/>
        <strong>HypercertID</strong>
        <br/>
        <a href="${HYPERCERTS_BASE_URL}${hypercertContractAddress.toLowerCase()}-${review.hypercertID}" target="_blank">
          ${hypercertNames[review.hypercertID] ? `${hypercertNames[review.hypercertID]} (ID: ${review.hypercertID})` : `Name Unavailable (ID: ${review.hypercertID})`}
        </a>
        <br/><br/>
        <strong>Attestation ID:</strong>
        <br/>
        <a href="${easExplorerURL}/attestation/view/${review.attestationID}" target="_blank">
          ${review.attestationID}
        </a>
        ${decodedData.pdfIpfsHash ? `
          <br/><br/>
          <strong>PDF IPFS Hash:</strong>
          <br/>
          <a href="https://ipfs.io/ipfs/${decodedData.pdfIpfsHash}" target="_blank">
            ${decodedData.pdfIpfsHash}
          </a>
          <br/><br/>` :
          '<br><br>'
        }
      `
      decodedData.answers.forEach((answer, index) =>{
        if(reviewForm.questionTypes[index] == '0'){
          reviewsText += `<strong>${reviewForm.questions[index]}</strong><br><textarea class="textarea-markdown">${answer}</textarea><br><br>`
        } else{
          reviewsText += `<strong>${reviewForm.questions[index]}</strong><br>${answer}<br><br>`
        }
      });
      if (decodedData.attachmentsIpfsHashes.length > 0) {
        reviewsText += "<strong>Attachments:</strong><br />"
        decodedData.attachmentsIpfsHashes.forEach((attachmentHash, index) =>{
          reviewsText += `<a href="${ipfsBaseUrl+attachmentHash}" target="_blank">${ipfsBaseUrl+attachmentHash}</a><br>`
        });
      }

      reviewsText += "<br/><br/>"

      if (review.amendmentsUIDs.length > 0) {
        reviewsText += `<strong>Amendments:</strong><br/>`;
        for (let i = 0; i < review.amendmentsUIDs.length; i++) {
          const ammendmentUid = review.amendmentsUIDs[i];
          const ammendment = await easContract.methods.getAttestation(ammendmentUid).call();
          const decodedData = web3.eth.abi.decodeParameters(amendmentAbi, ammendment.data);
          reviewsText += `
            <br/>
            <strong>Amendment ${i + 1}</strong>
            <br/>
            <strong>Amendment Attestation ID:</strong>
            <br/>
            <a href="${easExplorerURL}/attestation/view/${ammendmentUid}" target="_blank">
              ${ammendmentUid}
            </a>
            <br/>
            <strong>Amendment Notes:</strong>
            <br/>
            <textarea class="textarea-markdown">${decodedData.amendment}</textarea>
            <br/><br/>
          `;
          if (decodedData.attachmentsIpfsHashes.length > 0) {
            reviewsText += "<strong>Attachments:</strong><br />"
            decodedData.attachmentsIpfsHashes.forEach((attachmentHash, index) =>{
              reviewsText += `<a href="${ipfsBaseUrl+attachmentHash}" target="_blank">${ipfsBaseUrl+attachmentHash}</a><br>`
            });
      
            reviewsText += "<br/><br/>"
          }
        }
      }
      reviewTd.innerHTML = reviewsText;
      reviewsTbody.appendChild(reviewTr);
    });
    reviewsTable.style = "display: table; width: 100%;";
  } else {
    noReviewsDiv.innerHTML = '<strong>There are no available reviews for this request yet</strong>'
    reviewsTable.style = "display:none;"
    noReviewsDiv.style = "display:block;"
  }
}

const fillReviewRequestTable = async (request) => {
  if(request.reviewers.length > 0) {
    document.getElementById("request-table").style = "display: block; margin-top: 5%;";
    document.getElementById("request-info").style = "display: none";
    document.getElementById("requestReviewFormIndexTd").innerHTML = request.reviewFormIndex;
    document.getElementById("requestReviewersTd").innerHTML = request.reviewers.join('<br>');
    document.getElementById("requestTargetsTd").innerHTML = requestTargetsTdHtml(request);
    document.getElementById("requestIpfsHashTd").innerHTML = `<a href="https://ifps.io/ipfs/${request.formIpfsHash}" target="_blank">${request.formIpfsHash}</a>`;
    document.getElementById("requestRewardTd").innerHTML = `${request.rewardPerReview/1000000000000000000} ${getTokenSymbol(request.paymentTokenAddress)}`;
    document.getElementById("requestClosedTd").innerHTML = request.isClosed ? 'Yes' : 'No';
  } else {
    var requestInfo = document.getElementById("request-info")
    requestInfo.innerHTML = "Couldn't find a request with that name"
    requestInfo.style = "display: block; margin-top:5%;";
    document.getElementById("request-table").style = "display: none";
  }
};

const getTokenSymbol = tokenAddress => {
  return whitelistedTokenList[tokenAddress] || tokenAddress;
}

const requestTargetsTdHtml = (request) => {
  let targets = request.hypercertIDs
  let targetsHashes = request.hypercertIPFSHashes;
  let html = ''
  targets.forEach((target, index) => {
    html += `<strong>Hypercert ${index + 1} </strong><br/><a href="${HYPERCERTS_BASE_URL}${hypercertContractAddress.toLowerCase()}-${target}" target="_blank">${hypercertNames[target] ? hypercertNames[target] : 'Name unavailable'}(${target})</a><br>`
    if(targetsHashes[index]){
      html += `<strong>HypercertID ${index + 1} IPFS Hash </strong><br> <a href="https://ifps.io/ipfs/${targetsHashes[index]}" target="_blank">${targetsHashes[index]}</a><br>`
    }
    html += '<br>'
  })
  return html;
}

const fillReviewFormTable = async (reviewForm) => {
  var reviewFormTable = document.getElementById("review-form-table");
  var rfTbody = document.getElementById('rfTbody');
  rfTbody.innerHTML = '';
  reviewForm.questions.forEach( (question, index) => {
    var rFormTr = document.createElement('tr');
    var rFormQuestionTd = document.createElement('td');
    var rFormQuestionTypeTd = document.createElement('td');
    var rFormChoiceTd = document.createElement('td');
    rFormTr.appendChild(rFormQuestionTd);
    rFormTr.appendChild(rFormQuestionTypeTd);
    rFormTr.appendChild(rFormChoiceTd);
    rFormQuestionTd.innerHTML = question;
    rFormQuestionTypeTd.innerHTML = reviewForm.questionTypes[index] == 0 ? 'Text' : reviewForm.questionTypes[index] == 1 ? 'Yes/No' : 'Single Choice';
    rFormChoiceTd.innerHTML= reviewForm.choices[index].join('<br>');
    rfTbody.appendChild(rFormTr);
  });
  reviewFormTable.style = "display: block;margin-top: 5%;";
};

const validateGetRequestFields = (name) => {
  let validName = false;
  
  var nameValidationMessage = document.getElementById("get-request-name-validation");
  
  if(name) {
    nameValidationMessage.style = "display:none";
    validName = true;
  } else {
    nameValidationMessage.innerHTML = "This is a required field";
    nameValidationMessage.style = "display:block";
    validName = false;
  }
  
  return validName;
};

const populateReviewRequestNameSelect = async () => {
  if (account) {
    try {
      const contract = new web3.eth.Contract(abi, contractAddress, {
        from: account,
      });
      
      const rrNames =  await contract.methods.getReviewRequestsNames().call();
      const noResultsDiv = document.getElementById("no-results-message");
      const getRequestDiv = document.getElementById("get-request-div");
      if(rrNames.length > 0){
        noResultsDiv.style = "display:none";
        getRequestDiv.style = "display:block";
        const reviewRequestNameDropdown = document.getElementById("getRequestName");
        let optionsHTML = ''
        for (let i = 0; i < rrNames.length; i++) {
          optionsHTML += `<option value="${rrNames[i]}">${rrNames[i]}</option>`;
        }
        reviewRequestNameDropdown.innerHTML += optionsHTML;
      } else{
        noResultsDiv.innerHTML = '<strong>There are no Review Requests in the system at this time. <a href="./create_request.html">Click here</a> to create a Review Request</strong>'
        noResultsDiv.style = "display:block";
        getRequestDiv.style = "display:none";
      }
    } catch (error) {
      throw error;
    }
  }
};

var prev_onLoad = window.onload;

window.onload = async function () {
  if (typeof(prev_onLoad)=='function')
    prev_onLoad();
    
  document
  .getElementById("getRequestBtn")
  .addEventListener("click", getRequest)
};