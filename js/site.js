//Controller funtion
function userInput(){
    let loanAmount = document.getElementById('loanAmount').value //Get loan amount value from user
    let termMonths = document.getElementById('termMonths').value //Get  months value from user
    let interestRate = document.getElementById('interestRate').value //get interest rate from user

    //Lines 8-10 parse information gathered to be numbers
    loanAmount = parseFloat(loanAmount)
    termMonths = parseInt(termMonths)
    interestRate = parseInt(interestRate)

    let acutalInterestRate = interestRate / 100 //Turn the prcentage of interestRate into a decimal value

    let data = calculate(loanAmount, termMonths, acutalInterestRate) //Call calculate function
    let paidOff = payOff(data, loanAmount, termMonths, acutalInterestRate) //call payOff function

    view(paidOff, data, loanAmount) //call view function
}

//Logic function
function calculate(loanAmount, termMonths, acutalInterestRate){
    let info = []; //Empty array
    let interestOnPayment = (loanAmount * (acutalInterestRate)) / 12 //Interest on total payment
    let monthlyPayments =  ((loanAmount) * (acutalInterestRate / 12))   / (1 - Math.pow(1 + (acutalInterestRate / 12), -termMonths))  //What you are paying each month                
    let totalPayment = monthlyPayments * termMonths; //totalPayment represents how much you owe which is calculated from monthlyPayment * total months
    let totalInterest = totalPayment - loanAmount //totalInterest comes from the totalPayment - loanAmount
    let principalOnPayment = monthlyPayments - interestOnPayment; //principalPayment is difference between monthlyPayment and interestOnPayment
    info.push(monthlyPayments, principalOnPayment, interestOnPayment, totalInterest, totalPayment) //I push all the information that was calculated inside of this function into the array declared previously
    return info;
}

//Second logic function
function payOff(data, loanAmount, termMonths, actualInterestRate){
 
    let paidOff = []; //Initialize empty array thatll store the infromation calcuilated here

    //Lines 36-39 access the infromation from the data array
    let monthlyPayments = data[0] 
    let principalOnPayment = data[1]
    let interestOnPayment = data[2]
    let totalPayment = data[4]

    let count = 0;

    
    while(totalPayment > 0){ //While totalPayment is larger than 0 the following will be executed
        totalPayment = totalPayment - monthlyPayments //totalpayment is found by subtreacting totalPayment from monthlyPayments
        interestOnPayment = totalPayment * (actualInterestRate / 12) //InterestOnPayment is found from multiplying the totalPayment by the actualinterestRate / 12 months
        principalOnPayment = monthlyPayments - interestOnPayment //princpialOnPayment comes from monthlyPayments - interestonPayment 
        if(totalPayment + 1 < monthlyPayments){ //If totalPayment + 1 is less than monthlyPayment value than principalOnPayment becomes totalOnPayment and totalPayment becomes 0 as well as there interestOnPayment
            principalOnPayment = monthlyPayments
            totalPayment = 0;
            interestOnPayment = 0;
        }
        count++;
        paidOff.push(count, monthlyPayments, principalOnPayment, interestOnPayment, '-', totalPayment) //Here I push the new numbers I have from the while loop to the array declared in the beginning of the function
    }
    return  paidOff;
}


//Viewer function
function view(paidOff, data, loanAmount){
    let usd =  Intl.NumberFormat("en-US", {style:"currency", currency:"USD"}) //Intl.Number format is able to style and format numbers based on the information given to it, here i am specifying the style is currency and is USD

    //Lines 66-69 gets the html elements
    let dollarAmountPrincipalEl = document.getElementById('dollarAmountPrincipal')
    let dollarAmountInterestEl = document.getElementById('dollarAmountInterest')
    let totalDollarAmountEl = document.getElementById('totalDollarAmount')
    let youOweEl = document.getElementById('youOwe')

    //Lines 72-74 Access information needed from the data array which comes from the calculate function
    let monthlyPayments = data[0]
    let totalPayment = data[4]
    let totalInterest = data[3]

    //Lines 77-80 provides values to HTML elements, the numbers are formed using the usd.format() which I made at the top of the function
    dollarAmountPrincipalEl.innerHTML = usd.format(loanAmount)
    dollarAmountInterestEl.innerHTML = usd.format(totalInterest)
    totalDollarAmountEl.innerHTML = usd.format(totalPayment) 
    youOweEl.innerHTML = usd.format(monthlyPayments)

    //Lines 83-86 remove all of the invisible classes from the HTML element so I can see the numbers that I provided the html elements
    dollarAmountPrincipalEl.classList.remove('invisible')
    dollarAmountInterestEl.classList.remove('invisible')
    totalDollarAmountEl.classList.remove('invisible')
    youOweEl.classList.remove('invisible')


    let tableBody = document.getElementById('results') //Access the tableBody
    let templateRow = document.getElementById('fbTemplate') //Access the template which holds the <td<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr></td>, which is essntially cells holding the infromation 
    tableBody.innerHTML=''; //reset the table to be empty when the function is called so there is no stacking.

    for(let i = 0; i < paidOff.length; i+=6){
        let tableRow = document.importNode(templateRow.content, true) //This will import the contents of the fbTemplate as a document fragment, I am able to make a copy of it and put it inside of results tbody. The template itself is never changed it just makes copies of itself. true means it will get everything inside of the template. 
        let rowCols = tableRow.querySelectorAll('td')//Can put all of the td's from the fbTemplate in an array to determine how many columns need to be in the table

         rowCols[0].textContent = (paidOff[i]) //Assign this row to hold months value

         rowCols[1].textContent = usd.format(paidOff[i + 1]) //Using USD format assign this row to hold the monthly payment

         rowCols[2].textContent = usd.format(paidOff[i + 2]) //Using USD format assign this row to hold the principal you are paying down 

         rowCols[3].textContent = usd.format(paidOff[i + 3]) //Using USD format assign this row to hold interest your are paying 

         rowCols[4].textContent = usd.format(paidOff[i + 5]) //Using USD format assign this row to hold remaining balance as motnhs go on. 

        tableBody.appendChild(tableRow) //append the tableRow to tableBody.
    
    }
}