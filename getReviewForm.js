const getReviewForm = async () => {
  if (account) {
    let alertBox = document.getElementById("get-review-form-info-container");
    let getReviewFormBtn = document.getElementById("getReviewFormBtn");

    try {
      alertBox.classList.add("info");
      alertBox.innerHTML = '<span>In Progress...</span> <img width="2%" src="spinner.gif"/>';

      getReviewFormBtn.disabled = true;

      const reviewFormName = document.getElementById("get-review-form-name").value;
      
      const validData = validateGetReviewFormFields(reviewFormName);
      
      if(validData) {
        const contract = new web3.eth.Contract(abi, contractAddress, {
          from: account,
        });
        
        try {
          const reviewForm = await contract.methods.getReviewForm(reviewFormName).call();
          var reviewFormTable = document.getElementById("get-review-form-table");
          var rfTbody = document.getElementById('rfTbody');
          rfTbody.innerHTML = '';
          document.getElementById("get-review-form-info").style = "display: none";
          reviewFormTable.style = "display: block";
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
        } catch {
          var reviewFormInfo = document.getElementById("get-review-form-info")
          reviewFormInfo.innerHTML = "Couldn't find a Review Form with that index"
          reviewFormInfo.style = "display: block";
          document.getElementById("get-review-form-table").style = "display: none";
        }
      }
      
    } catch (error) {
      getReviewFormBtn.disabled = false;

      alertBox.classList.remove("info");
      alertBox.innerHTML = "";

      throw error;
    }
    getReviewFormBtn.disabled = false;

    alertBox.classList.remove("info");
    alertBox.innerHTML = "";
  }
};

const validateGetReviewFormFields = (formIndex) => {
  let validFormIndex = false;
  
  var formIndexValidationMessage = document.getElementById("get-review-form-name-validation");
  
  if(formIndex) {
    formIndexValidationMessage.style = "display:none";
    validFormIndex = true;
  } else {
    formIndexValidationMessage.innerHTML = "This is a required field";
    formIndexValidationMessage.style = "display:block";
    validFormIndex = false;
  }
  
  return validFormIndex;
};

const populateReviewFormNameSelect = async () => {
  if (account) {
    try {
      const contract = new web3.eth.Contract(abi, contractAddress, {
        from: account,
      });
      const rfTotal =  await contract.methods.reviewFormsTotal().call();
      const noResultsDiv = document.getElementById("no-results-message");
      const getReviewFormDiv = document.getElementById("get-review-form-div");
      if(rfTotal > 0){
        const formIndexDropdown = document.getElementById("get-review-form-name");
        getReviewFormDiv.style = "display:block";
        noResultsDiv.style = "display:none";
        let optionsHTML = ''
        for (let i = 0; i < rfTotal; i++) {
          optionsHTML += `<option value="${i}">${i}</option>`;
        }
        formIndexDropdown.innerHTML += optionsHTML;
      } else {
        noResultsDiv.innerHTML = '<strong>There are no Review Forms in the system at this time. <a href="./create_review_form.html">Click here</a> to create a Review Form</strong>'
        noResultsDiv.style = "display:block";
        getReviewFormDiv.style = "display:none";
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
    .getElementById("getReviewFormBtn")
    .addEventListener("click", getReviewForm);
};