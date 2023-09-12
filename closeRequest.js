const closeRequest = async () => {
  if (account) {
    let closeRequestBtn = document.getElementById("closeRequestBtn");
    let alertBox = document.getElementById("close-request-info");

    try {
      alertBox.classList.remove("error");
      alertBox.classList.remove("success");
      alertBox.classList.add("info");
      alertBox.innerHTML = '<span>In Progress...</span> <img width="2%" src="spinner.gif"/>';

      closeRequestBtn.disabled = true;

      const { eth } = web3;
      const contract = new eth.Contract(abi, contractAddress, {
        from: account,
      });
      const provider = web3.currentProvider.isMetaMask;
      
      const _name = document.getElementById("closeRequestName").value;
      
      const validData = validateCloseRequestFields(_name);
      
      if(validData) {
        const isClosed = await isRequestClosed(_name)
        if(isClosed){
          alertBox.classList.remove("warning");
          alertBox.classList.remove("info");
          alertBox.classList.remove("success");
          alertBox.classList.add("error");
          alertBox.innerHTML = "<strong>This Review Request is already closed.</strong>"
        } else {
          const data = await contract.methods
          .closeReviewRequest(
            _name,
            )
            .encodeABI();
            
            const transaction = {
              from: account,
              to: contractAddress,
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
      }
    }
    catch (error) {
      closeRequestBtn.disabled = false;

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
    closeRequestBtn.disabled = false;
  }
};
  
const validateCloseRequestFields = (name, targetIndex, hash) => {
  let validName = false;
    
  var nameValidationMessage = document.getElementById("close-request-name-validation");
    
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

const isRequestClosed = async (name) => {
  if(account) {
    try{
      const contract = new web3.eth.Contract(abi, contractAddress, {
        from: account,
      });

      const request = await contract.methods.getRequest(name).call();
      return request.isClosed;
    } catch(error) {
      throw error;
    }
  }
};

const populateReviewRequestNameSelect = async () => {
  if (account) {
    try {
      const contract = new web3.eth.Contract(abi, contractAddress, {
        from: account,
      });
        
      const rrNames = await contract.methods.getReviewRequestsNames().call();
      const noResultsDiv = document.getElementById("no-results-message");
      const closeReviewDiv = document.getElementById("close-request-div");
      if(rrNames.length > 0){
        const reviewRequestNameDropdown = document.getElementById("closeRequestName");
        noResultsDiv.style = "display:none";
        closeReviewDiv.style = "display:block";
        let optionsHTML = ''
        for (let i = 0; i < rrNames.length; i++) {
          optionsHTML += `<option value="${rrNames[i]}">${rrNames[i]}</option>`;
        }
        reviewRequestNameDropdown.innerHTML += optionsHTML;
      } else {
        noResultsDiv.innerHTML = '<strong>There are no Review Requests in the system at this time. <a href="./create_request.html">Click here</a> to create a Review Request</strong>'
        noResultsDiv.style = "display:block";
        closeReviewDiv.style = "display:none";
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
  .getElementById("closeRequestBtn")
  .addEventListener("click", closeRequest);
};