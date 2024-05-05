#!/usr/bin/env node
import inquirer from "inquirer";
let myBalance = 100000;
let myPin = 1234;
let accessGranted = false;
let continueProgram = true;
while (!accessGranted) {
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            message: "ENTER YOUR PIN",
            type: "number"
        }
    ]);
    if (pinAnswer.pin === myPin) {
        //console.log("Correct Pin Code !!!")
        accessGranted = true;
        console.log("WELCOME DEAR Khalid Wali Qureshi");
        //  accessGranted = true;
    }
    else {
        console.log("Incorrect Pin. Please try again.");
    }
}
// =============================================================================
while (continueProgram) {
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "please select correct option",
            type: "list",
            choices: ["Check Balance", "Deposit", "Fast Cash", "Withdraw", "Transfer", "Quit"]
        }
    ]);
    //console.log(operationAns);
    // ============ Check Balance   ================================================
    if (operationAns.operation === "Check Balance") {
        console.log(`Your Balance is: $${myBalance}`);
    }
    // ===========  DEPOSIT ========================================================
    else if (operationAns.operation === "Deposit") {
        let depositTypeAns = await inquirer.prompt([
            {
                name: "depositType",
                message: "Select deposit type",
                type: "list",
                choices: ["Cash", "Cheque"]
            }
        ]);
        if (depositTypeAns.depositType === "Cash") {
            let depositAmountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "Enter the amount to deposit:",
                    type: "number"
                }
            ]);
            let depositAmount = depositAmountAns.amount;
            if (depositAmount > 0) {
                myBalance += depositAmount;
                console.log(`Successfully deposited $${depositAmount}. Your updated balance is: $${myBalance}`);
            }
            else {
                console.log("Invalid amount. Please enter a positive value.");
            }
        }
        else {
            let chequeDetails = await inquirer.prompt([
                {
                    name: "chequeNumber",
                    message: "Enter the cheque number:",
                    type: "input"
                },
                {
                    name: "iban",
                    message: "Enter your IBAN:",
                    type: "input"
                },
                {
                    name: "amount",
                    message: "Enter the amount to deposit:",
                    type: "number"
                }
            ]);
            // Process cheque deposit with cheque number, IBAN, and amount
            console.log(`Depositing cheque number ${chequeDetails.chequeNumber} into account with IBAN ${chequeDetails.iban}.`);
            let depositAmount = chequeDetails.amount;
            if (depositAmount > 0) {
                myBalance += depositAmount;
                console.log(`Successfully deposited $${depositAmount}. Your updated balance is: $${myBalance}`);
            }
            else {
                console.log("Invalid amount. Please enter a positive value.");
            }
        }
    }
    //==============================================================================
    else if (operationAns.operation === "Fast Cash") {
        let fastCashAmountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Select a fast cash amount",
                type: "list",
                choices: ["$1000", "$2000", "$5000", "$10000"]
            }
        ]);
        let fastCashAmount = parseInt(fastCashAmountAns.amount.slice(1)); // Remove the "$" sign
        if (fastCashAmount <= myBalance) {
            myBalance -= fastCashAmount;
            console.log(`Successfully withdrew $${fastCashAmount}. Your remaining balance is: $${myBalance}`);
        }
        else {
            console.log(`Insufficient balance for fast cash withdrawal of $${fastCashAmount}.`);
        }
    }
    // =============== With Draw    ================================================
    else if (operationAns.operation === "Withdraw") {
        let withdrawAmountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter the amount to withdraw",
                type: "number"
            }
        ]);
        let withdrawAmount = withdrawAmountAns.amount;
        if (withdrawAmount <= myBalance) {
            myBalance -= withdrawAmount;
            console.log(`Successfully withdrew $${withdrawAmount}. Your remaining balance is: $${myBalance}`);
        }
        else {
            console.log(`Insufficient balance for withdrawal of $${withdrawAmount}.`);
        }
    }
    // =============================================================================
    else if (operationAns.operation === "Transfer") {
        let transferAmountAns = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter the amount to transfer",
                type: "number"
            }
        ]);
        let transferAmount = transferAmountAns.amount;
        if (transferAmount <= myBalance) {
            let recipientAns = await inquirer.prompt([
                {
                    name: "recipient",
                    message: "Enter recipient's account number",
                    type: "input"
                }
            ]);
            console.log(`Transferred $${transferAmount} to account number ${recipientAns.recipient}.`);
            myBalance -= transferAmount;
        }
        else {
            console.log("Insufficient balance for the transfer.");
        }
        console.log(`Your remaining balance is: $${myBalance}`);
    }
    else if (operationAns.operation === "Quit") {
        console.log("Exiting program.");
        break;
    }
    let continueAnswer = await inquirer.prompt([
        {
            name: "continue",
            message: "Do you want to continue?",
            type: "confirm"
        }
    ]);
    continueProgram = continueAnswer.continue;
}
//=============================================================================
