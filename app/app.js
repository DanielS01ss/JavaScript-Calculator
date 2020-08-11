///adunare scadere impartire inmultire stergere 
///la deschiderea paginii rulam o functie prin care adauagam event listeneruri

///aici setam event listener pentru butoane
///avem doua tipuri de event listener 
/// unul este pentru butoane gen numere:1,2,3,4
///unul este pentru egal
/// unul este pentru . (ca sa adauge virgula)
///unul este pentru adunare scadere inmultire impartire

const firstInput = document.querySelector('.first-input');
const lastInput = document.querySelector('.last-input');
const leftButtons = document.querySelectorAll('.btn-number');
const rightButtons = document.querySelectorAll('.btn-operation');
let displayedExpression = '';
let num1 = null;
let num2 = null;
let result = null;
let operation = false;
let sign = "";
let isNum = false;
let otherSign = false;
let multiplicationAndSubstraction = false;
let itIsSign = false;
let itIsNum = false;
let wasResult = false;
let notDisplayed = false;
let minusAlert = false;
let point = false;
///aceasta functie este apelata in momentul in care butonul de egal este apasat
///ea prelucreaza expresia asa cum trebuie

function isCharNumber(c) {
    return c >= '0' && c <= '9';
}

function expressionProcessor() {
    ///acuma trebuie sa procesam expresia
    ///vom pleca de la cea mai simpla procesare
   
    ///luam primele doua numere
   
if(displayedExpression)
{
    let parsedString = [];
    let num = '';

    for (const elem of displayedExpression) {
        if (isCharNumber(elem) || elem === '.') {
            num += elem;
        }
        else if (elem === "+" || elem === "÷" || elem === "x"||elem==="-") {
         if(num)
            parsedString.push(num);
            num = '';
            parsedString.push(elem);

        }
    }


    if (num) {
        parsedString.push(num);
    }

    if (parsedString.length < 3) {
        result = parseInt(parsedString[0]);
    }


    ///dupa ce am facut array prelucram 
    for(let i = 0; i<parsedString.length ;i++)
    {
        if(parsedString[i]==="-")
        {
            parsedString[i]="+";
            parsedString[i+1] = `-${parsedString[i+1]}`;
        }
    }
    
    if(parsedString[0]==="+")
    {
        parsedString.shift();
    }

    if (parsedString.includes("x")) {
        let firstNum;
        let secondNum;
        let funcResult;
        ///prima data facem inmultirile
        for (let i = 0; i < parsedString.length; i++) {
            if (parsedString[i] === "x") {
                firstNum = parsedString[i - 1];
                secondNum = parsedString[i + 1];
                if(secondNum === "+")
                {
                    secondNum = parsedString[i+2];
                    funcResult = firstNum * secondNum;
                    parsedString.splice(i - 1, 4, funcResult);
                }
                else{
                    funcResult = firstNum * secondNum;
                    parsedString.splice(i - 1, 3, funcResult);
                }


            }

        }
        ///verificam daca mai sunt itemuri in string daca nu punem la result direct
        if (parsedString.length === 1) {
            result = parsedString[0];
        }

    }

    ///iteram stringul
    ///prima data verificam sa aiba minim 3 elemente
    ///ultimul element sa fie numar daca nu il eliminam
   

    //parsedString.pop();
    //we iterate over the string



    if (parsedString.length >= 3 && !result && (parsedString.includes("+") || parsedString.includes("-"))) {
        result = parseInt(parsedString[0]);
        ///plecam cu iteratul de la 1
        for (let i = 1; i < parsedString.length; i++) {
            ///acuma ne apucam si ce facem este sa 
            if (parsedString[i] === "+") {
                operation = true;
                sign = "+";
            }
            else if (parsedString[i] === "-") {
                operation = true;
                sign = "-";
            }
            else {
                if (sign === "+")
                    result += parseInt(parsedString[i]);
                if (sign === "-")
                    result -= parseInt(parsedString[i]);
            }
        }

    }

    ///punem pe pagina rezultatul
    lastInput.textContent = displayedExpression + "=";
    firstInput.textContent = result;
    displayedExpression = result;

    result = null;
    wasResult = true;
}
   else{
       alert("Don't you think that you should provide some numbers??");
   }
    
}

///functia asta ce face este ca adauga expresia pe ecran
function handleExpreesion(evt) {
    let display = true;

    if (!isCharNumber(evt.target.textContent) && !isNum) {
        alert("First input must be number!!");
        display = false;
    }
    else
        isNum = true;
     
    
    if(evt.target.textContent === "-" && "x÷".includes(displayedExpression[displayedExpression.length-1]))
    {
        point = true;
    }
    else if("+-÷x".includes(displayedExpression[displayedExpression.length-1]))
    {
        point = true;
    }
    
    
    ///verificam pe caz separat daca elementul curent este minus si in fata avem impartire sau inmultire
    if (evt.target.textContent === "-" && (displayedExpression[displayedExpression.length - 1] === "x" || displayedExpression[displayedExpression.length - 1] === "÷")) {
        display = false;
        displayedExpression += evt.target.textContent;
        firstInput.textContent = displayedExpression;
    }

    else if (evt.target.textContent === "+" && displayedExpression[displayedExpression.length - 1] === "+") {
        display = false;
    }

    else if (evt.target.textContent === "-" && displayedExpression[displayedExpression.length - 1] === "-") {
        display = false;
    }
    else if (evt.target.textContent === "x" && displayedExpression[displayedExpression.length - 1] === "x") {
        display = false;
    }
    else if (evt.target.textContent === "÷" && displayedExpression[displayedExpression.length - 1] === "÷") {
        display = false;
    }
    else if (evt.target.textContent === "+" && ("-x÷".includes(displayedExpression[displayedExpression.length - 1]) && !"-x÷".includes(displayedExpression[displayedExpression.length - 2]))) {
        displayedExpression = displayedExpression.slice(0, displayedExpression.length - 1);
        displayedExpression += evt.target.textContent;
        firstInput.textContent = displayedExpression;
        display = false;

    }
    else if (evt.target.textContent === "-" && ("+x÷".includes(displayedExpression[displayedExpression.length - 1]) && !"-x÷".includes(displayedExpression[displayedExpression.length - 2]))) {
        displayedExpression = displayedExpression.slice(0, displayedExpression.length - 1);
        displayedExpression += evt.target.textContent;
        firstInput.textContent = displayedExpression;
        display = false;

    }
    else if (evt.target.textContent === "x" && ("+x÷".includes(displayedExpression[displayedExpression.length - 1]) && !"-x÷".includes(displayedExpression[displayedExpression.length - 2]))) {
        displayedExpression = displayedExpression.slice(0, displayedExpression.length - 1);
        displayedExpression += evt.target.textContent;
        firstInput.textContent = displayedExpression;
        display = false;
    }
    else if (evt.target.textContent === "÷" && ("+x÷".includes(displayedExpression[displayedExpression.length - 1]) && !"-x÷".includes(displayedExpression[displayedExpression.length - 2]))) {
        displayedExpression = displayedExpression.slice(0, displayedExpression.length - 1);
        displayedExpression += evt.target.textContent;
        firstInput.textContent = displayedExpression;
        display = false;
    }
    else if ("+x÷-".includes(displayedExpression[displayedExpression.length - 1]) && displayedExpression[displayedExpression.length - 2] === "-") {
        display = false;
    }
    
    if (display) {
        displayedExpression += evt.target.textContent;
        firstInput.textContent = displayedExpression;
    }
    if(displayedExpression.length>15)
    {
        alert("Prea mare expresia!!!!!!");
        displayedExpression = '';
        result = null;
        isNum = false;
        otherSign = false;
        multiplicationAndSubstraction = false;
        itIsSign = false;
        itIsNum = false;
        wasResult = false;
        notDisplayed = false;
        minusAlert = false;
    }

}




function initialize() {
    for (const button of leftButtons) {
        if (button.textContent != '=') {
            button.addEventListener('click', handleExpreesion);
        }
        else {
            button.addEventListener('click', expressionProcessor);
           continue;
        }

    }

    /*
      AICI ESTE FUNCTIA FOLOSITA PENTRU A GOLI TOT CE E IN CALCULATOR
    */
    for (const btn of rightButtons) {
        if (btn.textContent != 'CLEAR' && btn.textContent != 'DELETE')
            btn.addEventListener('click', handleExpreesion);
        else if (btn.textContent === 'CLEAR') {
            btn.addEventListener('click', () => {
                isNum = false;
                displayedExpression = '';
                firstInput.textContent = displayedExpression;
                lastInput.textContent = "";
                result = null;
                operation = false;
                sign = "";
            });
        }
        else if (btn.textContent === 'DELETE') {
            btn.addEventListener('click', () => {

                displayedExpression = displayedExpression.toString();

                displayedExpression = displayedExpression.substring(0, displayedExpression.length - 1);
                firstInput.textContent = displayedExpression;

            });
        }

    }
    ///dupa ce am parsuit datele trebuie sa facem calculele

}


initialize();