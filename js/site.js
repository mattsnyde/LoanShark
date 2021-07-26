//Controller funtion
function userInput(){
    let loanAmount = document.getElementById('loanAmount').value
    let termMonths = document.getElementById('termMonths').value
    let interestRate = document.getElementById('interestRate').value

    loanAmount = parseFloat(loanAmount)
    termMonths = parseInt(termMonths)
    interestRate = parseInt(interestRate)

    let acutalInterestRate = interestRate / 100

      

   let data = calculate(loanAmount, termMonths, acutalInterestRate)
    console.log(   payOff(data, loanAmount, termMonths, acutalInterestRate))
   view(data, loanAmount)
}

//Logic function
function calculate(loanAmount, termMonths, acutalInterestRate){
    let info = [];
    let monthlyPayments = (loanAmount*(acutalInterestRate/12)*Math.pow(1 + (acutalInterestRate/12), termMonths)) / ( Math.pow(1 + (acutalInterestRate / 12), termMonths) - 1)
    let totalPayment = monthlyPayments * termMonths;
    let totalInterest = totalPayment - loanAmount
    let interestOnPayment = (acutalInterestRate / termMonths) * loanAmount;
    let principalOnPayment = monthlyPayments - interestOnPayment;
    info.push(monthlyPayments, principalOnPayment, interestOnPayment, totalPayment, totalInterest)
    return info;
}

function payOff(data, loanAmount, termMonths, actualInterestRate){
    // let termMonths = termMonths;
    // let actualInterestRate = actualInterestRate
    let principal = loanAmount
    let monthlyPayments = data[0]
    let principalOnPayment = data[1]
    let interestOnPayment = data[2]
    let totalPayment = data[3]
    let totalInterest = data[4]

    // while(totalPayment > 0){
    while(totalPayment > 0){
        totalPayment = totalPayment - monthlyPayments
        interestOnPayment = (actualInterestRate / termMonths) * totalPayment
        princpialOnPayment = monthlyPayments - interestOnPayment
         if(totalPayment > monthlyPayments){
            totalPayment = 0;
        }
    }
        // console.log(calculate(newRemainingBalance, termMonths, actualInterestRate))
    // }
    let statement = `Your remaniningBalance is ${totalPayment}, your interest on the peyment is ${interestOnPayment}, the principal on your payment is ${principalOnPayment}`
    return  statement;
}



//Viewer function
function view(data, loanAmount){
    // dollarAmountPrincipal dollarAmountInterest totalDollarAmount

    let monthlyPayments = data[0]
    let totalPayment = data[3]
    let totalInterest = data[4]
    let interestOnPayment = data[2]
    let principalOnPayment = data[1]


    let dollarAmountPrincipalEl = document.getElementById('dollarAmountPrincipal')
    let dollarAmountInterestEl = document.getElementById('dollarAmountInterest')
    let totalDollarAmountEl = document.getElementById('totalDollarAmount')
    let youOweEl = document.getElementById('youOwe')

    dollarAmountPrincipalEl.innerHTML = loanAmount
    dollarAmountInterestEl.innerHTML = totalInterest
    totalDollarAmountEl.innerHTML = totalPayment
    youOweEl.innerHTML = monthlyPayments

    dollarAmountPrincipalEl.classList.remove('invisible')
    dollarAmountInterestEl.classList.remove('invisible')
    totalDollarAmountEl.classList.remove('invisible')
    youOweEl.classList.remove('invisible')

    let tableBody = document.getElementById('results')
    let templateRow = document.getElementById('fbTemplate')
    tableBody.innerHTML = '';
    // for(let i = 0; i < data.length + 1; i+=6){
        let tableRow = document.importNode(templateRow.content, true) //This will import the contents of the fbTemplate as a document fragment, I am able to make a copy of it and put it inside of results tbody. The template itself is never changed it just makes copies of itself. true means it will get everything inside of the template. 
        let rowCols = tableRow.querySelectorAll('td')//Can put all of the td's from the fbTemplate in an array to determine how many columns need to be in the table

        // for(let i = 0; i < data.length; i++){
            rowCols[0].textContent = 1
            rowCols[1].textContent = data[0]
            rowCols[2].textContent = data[1]
            rowCols[3].textContent = data[2]
            rowCols[4].textContent = data[3]
            rowCols[5].textContent = data[4]    
        // }


        //add all of the rows to the table
        tableBody.appendChild(tableRow)         
    // }
}