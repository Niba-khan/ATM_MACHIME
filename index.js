#! /usr/bin/env node
//______ATM MACHINE_____
import inquirer from "inquirer";
import chalk from "chalk";
//___Initialize myBalance and Pincode____
let myBalance = 20000;
let myPin = 98765;
//____print Welcome message_____
console.log(chalk.red.bold("\n \tWelcome to ATM MACHINE\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("enter your pin code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.blackBright.italic("\npin is correct, Login Sucessfully!!\n"));
    console.log(chalk.blackBright.italic(`current account balance is ${myBalance}`));
    //___Print Operations___
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("Select an operation"),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    //___Withdraw Method___
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([{
                name: "withdrawMethod",
                type: "list",
                message: chalk.green("Select withdraw method"),
                choices: ["Fast Cash", "Enter your Amount"]
            }
        ]);
        //___Fast cash Method____
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([{
                    name: "fastCash",
                    type: "list",
                    message: chalk.redBright("Select Amount"),
                    choices: [1000, 2000, 5000, 10000, 15000, 20000, 30000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.bgMagenta.bold("Insufficiant Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(chalk.blue.italic(`${fastCashAns.fastCash} withdraw Sucessfully`));
                console.log(chalk.blue.italic(`your remainig balance is: ${myBalance}`));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter your Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.red("Enter the amount to withdraw:")
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.cyanBright.bold("Insufficiant Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.black.italic(`${amountAns.amount} Withdraw Sucessfully`));
                console.log(chalk.black.italic(`your remaining balance is: ${myBalance}`));
            }
        }
    }
    //___Check your Balance ___
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.bgBlueBright.italic(`your Account Balance is: ${myBalance}`));
    }
    else {
        console.log(chalk.yellow.bold("Pin number is Incorrect! Do Again"));
    }
}
