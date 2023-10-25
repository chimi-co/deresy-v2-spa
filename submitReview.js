const submitReview = async () => {
  if (account) {
    let submitBtn = document.getElementById("submitReviewBtn");
    let alertBox = document.getElementById("submit-review-info");

    try {
      alertBox.classList.remove("error");
      alertBox.classList.remove("success");
      alertBox.classList.add("info");
      alertBox.innerHTML = '<span>In Progress...</span> <img width="2%" src="spinner.gif"/>';

      submitBtn.disabled = true;

      const { eth } = web3;
      const contract = new eth.Contract(abi, contractAddress, {
        from: account,
      });
      const easContract = new eth.Contract(easAbi, easContractAddress, {
        from: account,
      });
      const provider = web3.currentProvider.isMetaMask;
      
      const _name = document.getElementById("submit-review-name").value;
      const hypercertID = document.getElementById("submit-review-target-index").value;
      const answersValues = [];
      const answers = document.getElementsByClassName('submit-review-answers');
      for(let answer of answers) {
        if (answer.type == "radio") {
          if(answer.checked) {
            answersValues.push(answer.value);
          }
        } else {
          answersValues.push(answer.value);
        }
      };

      const validData = validateSubmitReviewFields(_name, hypercertID);
      let pdfIpfsHash = document.getElementById("submit-review-pdf-ipfs-hash").value;
      if(validData) {
        const reviewsSchemaID = await contract.methods.reviewsSchemaID().call();
        const abi = [
          { type: 'string', name: 'requestName' },
          { type: 'uint256', name: 'hypercertID' },
          { type: 'string[]', name: 'answers' },
          { type: 'string', name: 'pdfIpfsHash' },
          { type: 'string[]', name: 'attachmentsIpfsHashes' },
        ];
        
        const encodedData = web3.eth.abi.encodeParameters(abi, [_name, hypercertID, answersValues, pdfIpfsHash, []]); //TODO: add attachmentsIpfsHashes

        const data = await easContract.methods
        .attest(
          {
            schema: reviewsSchemaID,
            data: {
              recipient: "0x0000000000000000000000000000000000000000",
              expirationTime:0n,
              revocable: false,
              refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
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
      submitBtn.disabled = false;

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
    submitBtn.disabled = false;
  }
};
  
  const validateSubmitReviewFields = (name, targetIndex) => {
    let validName = false;
    let validTargetIndex = false;
    let validAnswers = false;
    
    var nameValidationMessage = document.getElementById("submit-review-name-validation");
    var targetIndexValidationMessage = document.getElementById("submit-review-target-index-validation");
    
    if(name) {
      nameValidationMessage.style = "display:none";
      validName = true;
    } else {
      nameValidationMessage.innerHTML = "This is a required field";
      nameValidationMessage.style = "display:block";
      validName = false;
    }
    
    if(targetIndex) {
      targetIndexValidationMessage.style = "display:none";
      validTargetIndex = true;
    } else {
      targetIndexValidationMessage.innerHTML = "This is a required field";
      targetIndexValidationMessage.style = "display:block";
      validTargetIndex = false;
    }

    answers = document.getElementsByClassName('submit-review-answers');
    for(let answer of answers) {
      var validationMessage = answer.type == "radio" ?  answer.parentNode.parentNode.parentNode.querySelector('.validation-error') : answer.parentNode.parentNode.querySelector('.validation-error');
      if(answer.value){
        validationMessage.style = "display:none";
        validAnswers = true;
      } else {
        validationMessage.innerHTML = "This is a required field";
        validationMessage.style = "display:block";
        validAnswers = false;
      }
    };
    
    return validName && validTargetIndex && validAnswers;
  };

  async function getRequestQuestions() {
    if (account) {
      let getFormBtn = document.getElementById('getRequestQuestionsBtn');
      let alertBox = document.getElementById("submit-review-info");
      try {
        alertBox.classList.add("info");
        alertBox.innerHTML = '<span>In Progress...</span> <img width="2%" src="spinner.gif"/>';

        getFormBtn.disabled = true;

        const reviewName = document.getElementById("submit-review-name").value;
        
        const validData = validateGetRequestQuestions(reviewName);
        
        if(validData) {
          const contract = new web3.eth.Contract(abi, contractAddress, {
            from: account,
          });
          const reviewRequest = await contract.methods.getRequest(reviewName).call();
          let questionsHTML = "";
          if(reviewRequest.isClosed) {
            questionsHTML = "<strong>This request is closed and does no longer accept reviews.</strong>";
            document.getElementById("submit-review-questions-wrapper").innerHTML = questionsHTML;
          } else if(reviewRequest.reviewers.filter((reviewer) => reviewer.toLowerCase().includes(account.toLowerCase())) < 1){
            questionsHTML = `<strong>Your address (${account}) is not authorized to submit a review for this request</strong>`;
            document.getElementById("submit-review-questions-wrapper").innerHTML = questionsHTML;
          } else {
            const requestTargets = reviewRequest.hypercertIDs;
            const requestTargetsNames = []

            const optimismWeb3 = new Web3("https://optimism-mainnet.infura.io/v3/93cf3e10ca0044cdad4ac63eecdc04fc");
            for(const hypercertID of requestTargets) {
              const hypercertContract = new optimismWeb3.eth.Contract(hypercertAbi, hypercertContractAddress, {
                from: account,
              });
              let hypercertUri = await hypercertContract.methods.uri(hypercertID).call();
              if(hypercertUri){
                const sanitizedUri = hypercertUri.startsWith('ipfs://') ? hypercertUri.replace('ipfs://', '') : hypercertUri
                const hypercertData = await (await fetch(`https://ipfs.io/ipfs/${sanitizedUri}`)).json();    
                requestTargetsNames.push(hypercertData.name)
              } else {
                requestTargetsNames.push(null)
              }
            }
            const requestTargetsIpfsHashes = reviewRequest.hypercertIPFSHashes;
            const reviewFormIndex = reviewRequest.reviewFormIndex;
            const reviewForm = await contract.methods.getReviewForm(reviewFormIndex).call();
            const questions = reviewForm.questions;
            const questionTypes = reviewForm.questionTypes;
            const choices = reviewForm.choices;
            
            questionsHTML = `<label>Hypercert ID</label><div class="pure-g"><div class="pure-u-20-24"><select id="submit-review-target-index" class="pure-input-1"><option hidden selected value="">Select a Hypercert ID for your review</option><select/></div><div class="pure-u-20-24"><small id="submit-review-target-index-validation" class="validation-error"></small></div></div><div id="target-hash-div" style="display:none"><label>Target IPFS Hash</label><div id="target-ipfs-hash"></div></div>`
            
            questionTypes.forEach( (questionType,index) => {
              if(questionType == 0) {
                questionsHTML += createTextQuestion(questions[index]);
              } else if (questionType == 1) {
                questionsHTML += createCheckboxQuestion(questions[index], index);
              } else if(questionType == 2){
                questionsHTML += createSingleChoiceQuestion(questions[index], choices[index], index);
              }
            });

            questionsHTML += '<label>PDF IPFS Hash (optional)</label><div class="pure-g"><div class="pure-u-20-24"><input type="text" id="submit-review-pdf-ipfs-hash" class="pure-input-1" /></div></div><br/>'

            document.getElementById("submit-review-questions-wrapper").innerHTML = questionsHTML;
            const targetIndexSelect = document.getElementById('submit-review-target-index');
            for (let i = 0; i < requestTargets.length; i++) {
              targetIndexSelect.innerHTML += `<option value="${requestTargets[i]}">${requestTargetsNames[i] ? requestTargetsNames[i] : 'Name unavailable'} (ID: ${requestTargets[i]})</option>`;
            };

            document.getElementById('submit-review-target-index').addEventListener('change', function() {
              let targetIPFSHash = requestTargetsIpfsHashes[this.value]
              if(targetIPFSHash) {
                document.getElementById("target-ipfs-hash").innerHTML = `<a href="https://ifps.io/ipfs/${targetIPFSHash}" target="_blank">${targetIPFSHash}</a>`
                document.getElementById("target-hash-div").style="display:block"
              } else {
                document.getElementById("target-ipfs-hash").innerHTML = ""
                document.getElementById("target-hash-div").style="display:none"
              }
            });

            document.getElementById("submitReviewBtn").style = "display:block";
          }
          document.getElementById("submit-review-questions-wrapper").style = "display:block";
          const textAreas = document.getElementsByClassName("textarea-markdown");
          for (let textArea of textAreas) {
            new SimpleMDE({ element: textArea, forceSync: true });
          }
        }
      } catch (error) {
        alertBox.classList.remove("info");
        alertBox.innerHTML = "";  
        getFormBtn.disabled = false;

        console.log(error);

        throw error;
      }
      alertBox.classList.remove("info");
      alertBox.innerHTML = "";
      getFormBtn.disabled = false;
    }
  };
  
  const validateGetRequestQuestions = (name) => {
    let validName = false;
    
    var nameValidationMessage = document.getElementById("submit-review-name-validation");
    
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
  
  function createTextQuestion(question) {
    let questionHTML = `<label>${question}</label><div class="pure-g"><div class="pure-u-20-24"><textarea class="submit-review-answers pure-input-1 textarea-markdown" type="text" placeholder="Enter your answer" rows="4" cols="90"></textarea></div><div class="pure-u-20-24"><small class="validation-error"></small></div></div><br/>`;  
    return questionHTML;
  };
  
  function createCheckboxQuestion(question, index) {
    let questionHTML = `<label>${question}</label><div class="pure-g"><div class="pure-u-10-24"><label for="radio-1-${index}" class="pure-checkbox""><input type="radio" class="submit-review-answers" name="checkbox-answers-${index}" id="radio-1-${index}" value="Yes" style="width:20px !important" checked />Yes</label></div><div class="pure-u-10-24"><label for="radio-2-${index}" class="pure-checkbox"><input type="radio" name="checkbox-answers-${index}" class="submit-review-answers" id="radio-2-${index}" value="No" style="width:20px !important"/>No</label></div><div class="pure-u-20-24"><small class="validation-error"></small></div></div><br/>`;
    return questionHTML;
  };

  function createSingleChoiceQuestion(question, choices, index) {
    let questionHTML = `<label>${question}</label><div class="pure-g">`;
    for (let i = 0; i < choices.length; i++) {
      questionHTML += `<div class="pure-u-8-24"><label for="radio-${i}-${index}" class="pure-checkbox""><input type="radio" class="submit-review-answers" name="checkbox-answers-${index}" id="radio-${i}-${index}" value="${choices[i]}" style="width:20px !important" checked />${choices[i]}</label></div>`;
    }
    questionHTML += '<div class="pure-u-20-24"><small class="validation-error"></small></div></div><br/>'
    return questionHTML;
  }

  const populateReviewRequestNameSelect = async () => {
    if (account) {
      try {
        const contract = new web3.eth.Contract(abi, contractAddress, {
          from: account,
        });
        
        const rrNames = await contract.methods.getReviewRequestsNames().call();
        const noResultsDiv = document.getElementById("no-results-message");
        const submitReviewDiv = document.getElementById("submit-review-div");
        if(rrNames.length > 0){
          const reviewRequestNameDropdown = document.getElementById("submit-review-name");
          noResultsDiv.style = "display:none";
          submitReviewDiv.style = "display:block";
          let optionsHTML = ''
          for (let i = 0; i < rrNames.length; i++) {
            optionsHTML += `<option value="${rrNames[i]}">${rrNames[i]}</option>`;
          }
          reviewRequestNameDropdown.innerHTML += optionsHTML;
        } else{
          noResultsDiv.innerHTML = '<strong>There are no Review Requests in the system at this time. <a href="./create_request.html">Click here</a> to create a Review Request</strong>'
          noResultsDiv.style = "display:block";
          submitReviewDiv.style = "display:none";
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const resetSubmitQuestions = () => {
    document.getElementById("submit-review-questions-wrapper").style = "display:none"
    document.getElementById("submitReviewBtn").style = "display:none";
  };

  var prev_onLoad = window.onload;

  window.onload = async function () {
    if (typeof(prev_onLoad)=='function')
      prev_onLoad();
      
    document
    .getElementById("submitReviewBtn")
    .addEventListener("click", submitReview);
    
    document.getElementById("getRequestQuestionsBtn").addEventListener("click", getRequestQuestions);
    document.getElementById("submit-review-name").addEventListener("onchange", resetSubmitQuestions);
  };