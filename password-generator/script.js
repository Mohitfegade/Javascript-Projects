const inputSlider =document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

let password ="";
let passwordLength =10;
let cheakcount =0; 
handleSlider();

//set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    //shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

//generate random integer
function getRandomInteger(min, max){
    return Math.floor(Math.random()* (max - min)) + min;
}
//generate random number
function generateRandomNumber(){
    return getRandomInteger(0,9);
}
//generate random lowercase
function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
//generate random uppercase
function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
//generate random symbol
function generateSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols.charAt(getRandomInteger(0,symbols.length));
}

console.log(1);
//calculate strength
function calculateStrength(){
    let hasUpper = uppercaseCheck.checked;  
    let hasLower = lowercaseCheck.checked;
    let hasNumber = numbersCheck.checked;
    let hasSymbol = symbolsCheck.checked;
    if(hasUpper && hasLower && hasNumber && hasSymbol){
        setIndicator("#00ff00");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol)){
        setIndicator("#ffcc00");
    }
    else{
        setIndicator("#ff0000");
    }
}

//copy password to clipboard
async function copyPassword(){
    try{  
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied!";
    }
    catch(e){
        copyMsg.innerText = "Failed!";
    }
    copyMsg.classList.remove("hidden");
    setTimeout(() => {
        copyMsg.classList.add("hidden");
    }, 2000);
}

//shuffle password
function shufflePassword(Array){
    //Fisher Yates Method
    for(let i= Array.length -1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [Array[i], Array[j]] = [Array[j], Array[i]];
    }
    return Array.join('');

}
console.log(2);
function handleCheakBoxChange(){
    cheakcount = 0;
  allCheckBox.forEach(cheakbox => {
    if(cheakbox.checked)
        cheakcount++;
  });

  //special condition
  if(passwordLength < cheakcount){
    passwordLength = cheakcount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheakBoxChange);
});

inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();     
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyPassword();
    }
});

generateBtn.addEventListener('click',()=>{
    //none of the checkbox are selected
    if(cheakcount ==0) return;

    //
    if(passwordLength < cheakcount){
        passwordLength = cheakcount;
        handleSlider();
    }

    //remove old password
    password ="";
    //putting stuff mentioned by checkbox
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];
    
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }   
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    //compulsory addition
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    //remaining addition
    for(let i=0; i< passwordLength - funcArr.length; i++){
        let randIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
console.log(3);
//shuffling the password
password = shufflePassword(Array.from(password));
//show in UI
passwordDisplay.value = password;
//calculate strength
calculateStrength();

});



