// query selectors
const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");

const errorDiv = document.querySelector(".error-message");

const cashGivenDiv = document.querySelector(".cash-input");
const changeReturnedDiv = document.querySelector(".change-returned");

const output = document.querySelector("#output");

const nextButton = document.querySelector("#next-button");
const checkButton = document.querySelector("#check-button");

const Notes = document.querySelectorAll(".notes");

const notesArray = [2000, 500, 100, 20, 10, 5, 1];


nextButton.addEventListener('click', ()=>{
    errorHide();
    if(Number(billAmount.value)>0){

        nextButton.style.display = "none";
        cashGivenDiv.style.display = "block";
    }
    else{
        errorShow("Enter valid bill amount");
    }
} )


checkButton.addEventListener('click', ()=>{
    clearNotes();
    errorHide();
    let billAmountValue= Number(billAmount.value);
    let cashGivenValue= Number(cashGiven.value);

    if(billAmountValue>0 && cashGivenValue>0){

        if(!Number.isInteger(cashGivenValue)){
            errorShow("Enter valid amount in cash given field");
            return;
        }
        if(billAmountValue > cashGivenValue){
            errorShow("Cash is less than bill, please enter right amount");
            return;
        }
        calculateNotes(billAmountValue, cashGivenValue);
    } else{
        errorShow("Enter valid bill amount and cash given to continue");
        }
})

function calculateNotes(bill, cash){
    let returnAmount = cash-bill;
    
    if(returnAmount<1){
        errorShow("No amount should be returned");
        return;
    }
    changeReturnedDiv.style.display = "block";

    for (let i = 0; i < notesArray.length; i++) {
      returnAmount = compare(returnAmount, notesArray[i], i);
    }
    
}

function compare(remainder, noteAmount, index){

    if(remainder >= noteAmount){
        let notes = Math.floor(remainder/noteAmount);
        remainder = remainder - notes*noteAmount;
        Notes[index].innerText = `${notes}`;
    }
    return remainder
}

function clearNotes(){
    for(let notes of Notes){
        notes.innerText = "";
    }
}

function errorShow(text){
    errorDiv.style.display = "block";
    errorDiv.innerText= text;
    changeReturnedDiv.style.display = "none";
}

function errorHide(){
    errorDiv.style.display = "none";
}