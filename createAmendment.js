const createAmendment = async () => {
  const requestName = document.getElementById("amendment-review-name").value;
  const hypercertID = document.getElementById("amendment-hypercert-id").value;
  const amendmentText = document.getElementById("amendment-text").value;
  let createAmendmentBtn = document.getElementById("createAmendmentBtn");
  let alertBox = document.getElementById("create-amendment-info");
  try{
    if(amendmentText.length < 1){
      document.getElementById("create-amendment-validation").style = "display:block";
      document.getElementById("create-amendment-validation").innerHTML = "Please enter an amendment";
      return;
    } else {
      alertBox.classList.remove("error");
      alertBox.classList.remove("success");
      alertBox.classList.add("info");
      alertBox.innerHTML = '<span>In Progress...</span> <img width="2%" src="spinner.gif"/>';
      createAmendmentBtn.disabled = true;
      const { eth } = web3;
      document.getElementById("create-amendment-validation").style = "display:none";
      const contract = new eth.Contract(abi, contractAddress, {
        from: account,
      });
      const easContract = new eth.Contract(easAbi, easContractAddress, {
        from: account,
      });
      const amendmentsSchemaID = await contract.methods.amendmentsSchemaID().call();
      const request = await contract.methods.getRequest(requestName).call();
      const accountReviews = request.reviews.filter(review => review.reviewer.toLowerCase() == account.toLowerCase());
      const amendmentRefUID = accountReviews.find(review => review.hypercertID == hypercertID).attestationID;
      const attachmentValues = [];
      const attachmentInputs = document.querySelectorAll('input[name="attachments[]"]');

      for(let input of attachmentInputs) {
          attachmentValues.push(input.value);
      }
      const amendmentAbi = [
        { type: 'string', name: 'requestName' },
        { type: 'uint256', name: 'hypercertID' },
        { type: 'string', name: 'amendment' },
        { type: 'string[]', name: 'attachmentsIpfsHashes' },
      ];
      
      const encodedData = web3.eth.abi.encodeParameters(amendmentAbi, [requestName, hypercertID, amendmentText, attachmentValues]);
  
      const data = await easContract.methods
      .attest(
        {
          schema: amendmentsSchemaID,
          data: {
            recipient: "0x0000000000000000000000000000000000000000",
            expirationTime:0n,
            revocable: false,
            refUID: amendmentRefUID,
            data: encodedData,
            value: 0
          }
        }
        )
        .encodeABI();
  
        const transaction = {
          from: account,
          to: easContractAddress,
          data,
        };
        
        await web3.eth
        .sendTransaction(transaction)
        .on("receipt", function (receipt) {
          alertBox.classList.remove("error");
          alertBox.classList.remove("info");
          alertBox.classList.add("success");
          alertBox.innerHTML = "Successful!";
        })
        .on("error", console.error);
    }
  } catch (error) {
    createAmendmentBtn.disabled = false;
    alertBox.classList.remove("warning");
    alertBox.classList.remove("info");
    alertBox.classList.remove("success");
    alertBox.classList.add("error");
    alertBox.innerHTML = "Error...";
    if (error.code === 4001) {
      alertBox.innerHTML = "User rejected transaction...";
    }
    throw error;
  }
  createAmendmentBtn.disabled = false;
};

const populateReviewRequestNameSelect = async () => {
  if (account) {
    try {
      const contract = new web3.eth.Contract(abi, contractAddress, {
        from: account,
      });
      const rrNames = await contract.methods.getReviewRequestsNames().call();
      const noResultsDiv = document.getElementById("no-results-message");
      const createAmendmentDiv = document.getElementById("create-amendment-div");
      if(rrNames.length > 0){
        const reviewRequestNameDropdown = document.getElementById("amendment-review-name");
        noResultsDiv.style = "display:none";
        createAmendmentDiv.style = "display:block";
        let optionsHTML = ''
        for (let i = 0; i < rrNames.length; i++) {
          optionsHTML += `<option value="${rrNames[i]}">${rrNames[i]}</option>`;
        }
        reviewRequestNameDropdown.innerHTML += optionsHTML;
      } else{
        noResultsDiv.innerHTML = '<strong>There are no Review Requests in the system at this time. <a href="./create_request.html">Click here</a> to create a Review Request</strong>'
        noResultsDiv.style = "display:block";
        createAmendmentDiv.style = "display:none";
      }
    } catch (error) {
      throw error;
    }
  }
};

const populateReviewsSelect = async () => {
  if (account) {
    const optimismWeb3 = new Web3("https://optimism-mainnet.infura.io/v3/93cf3e10ca0044cdad4ac63eecdc04fc");
    const hypercertContract = new optimismWeb3.eth.Contract(hypercertAbi, hypercertContractAddress, {
      from: account,
    });
    const _name = document.getElementById("amendment-review-name").value;
    try {
      const contract = new web3.eth.Contract(abi, contractAddress, {
        from: account,
      });
      const request = await contract.methods.getRequest(_name).call();
      const reviewsSelectDiv = document.getElementById("reviews-select");
      const noResultsDiv = document.getElementById("no-results-message");
      const accountReviews = request.reviews.filter(review => review.reviewer.toLowerCase() == account.toLowerCase());
      if(accountReviews.length > 0){
        const amendmentReviewsDropdown = document.getElementById("amendment-hypercert-id");
        amendmentReviewsDropdown.innerHTML='<option selected disabled value="">Select the review hypercert ID</option>';
        noResultsDiv.style = "display:none";
        reviewsSelectDiv.style = "display:block";
        let optionsHTML = ''
        for (let i = 0; i < accountReviews.length; i++) {
          let hypercertName;
          let hypercertUri = await hypercertContract.methods.uri(accountReviews[i].hypercertID).call();
          if(hypercertUri){
            const sanitizedUri =hypercertUri.startsWith('ipfs://') ? hypercertUri.replace('ipfs://', '') : hypercertUri
            const hypercertData = await (await fetch(`https://ipfs.io/ipfs/${sanitizedUri}`)).json();
            if(hypercertData && hypercertData.name){
              hypercertName = hypercertData.name;
            } else {
              hypercertName = 'Name Unavailable'
            }
          } else {
            hypercertName = 'Name Unavailable'
          }
          optionsHTML += `<option value="${accountReviews[i].hypercertID}">${hypercertName} (ID: ${accountReviews[i].hypercertID})</option>`;
        }
        amendmentReviewsDropdown.innerHTML += optionsHTML;
      } else{
        noResultsDiv.innerHTML = '<strong>There are no Reviews from your address for this Review Requests in the system at this time. <a href="./submit_review.html">Click here</a> to sumbit a Review</strong>'
        noResultsDiv.style = "display:block; margin-top: 25px; ";
        reviewsSelectDiv.style = "display:none";
      }
    } catch (error) {
      throw error;
    }
  }
};

const selectedReview = async () => {
  const sendAmendmentWrapper = document.getElementById("send-amendment-wrapper");
  const sendAmendmentBtn = document.getElementById("send-amendment-btn");
  sendAmendmentWrapper.innerHTML = '<label>Amendment</label><textarea id="amendment-text"></textarea><div class="pure-u-20-24"><small id="create-amendment-validation" class="validation-error" style:"display:none;"></small></div>'
  sendAmendmentWrapper.innerHTML += '<button class="pure-button button-success" style="display:flex;margin-top: 15px" id="addAttachmentBtn" type="button">Add Attachment</button>'
  sendAmendmentWrapper.innerHTML += '<div id="attachmentsContainer"></div><br/>'
  const amendmentTextArea = document.getElementById("amendment-text");
  new SimpleMDE({ element: amendmentTextArea, forceSync: true });
  sendAmendmentWrapper.style = "display:block";
  sendAmendmentBtn.style = "display:block";
};

const resetReviews = async () => {
  const reviewsSelectDiv = document.getElementById("reviews-select");
  const sendAmendmentWrapper = document.getElementById("send-amendment-wrapper");
  const sendAmendmentBtn = document.getElementById("send-amendment-btn");
  sendAmendmentWrapper.innerHTML = '';
  reviewsSelectDiv.style = "display:none";
  sendAmendmentWrapper.style = "display:none";
  sendAmendmentBtn.style = "display:none";
};

var prev_onLoad = window.onload;

window.onload = async function () {
  if (typeof(prev_onLoad)=='function')
    prev_onLoad();

  document
  .getElementById("createAmendmentBtn")
  .addEventListener("click", createAmendment);

  document.getElementById("getRequestReviewsBtn").addEventListener("click", populateReviewsSelect);
  document.getElementById("amendment-review-name").addEventListener("onchange", resetReviews);
  document.getElementById("amendment-hypercert-id").addEventListener("onchange", selectedReview);
};

document.addEventListener('click', function(event) {
  if (event.target.id === 'addAttachmentBtn') {
    let attachmentsContainer = document.getElementById("attachmentsContainer");
    let totalAttachments = attachmentsContainer.getElementsByClassName("attachment-div").length;

    if (totalAttachments < 3) {
      let div = document.createElement('div');
      div.classList.add('pure-g', 'attachment-div');

      div.innerHTML = `
        <div class="pure-u-20-24">
          <input class="pure-input-1" type="text" placeholder="Enter attachment hash" name="attachments[]">
        </div>
        <div class="pure-u-1-6">
          <button class="button-error pure-button deleteAttachmentBtn" type="button">X</button>
        </div>
        <div class="pure-u-20-24">
          <small class="validation-error"></small>
        </div>
      `;

      attachmentsContainer.appendChild(div);

      div.querySelector(".deleteAttachmentBtn").addEventListener('click', function() {
        attachmentsContainer.removeChild(div);
      });
    } else {
      alert("You can only add up to 3 attachments.");
    }
  }
});
