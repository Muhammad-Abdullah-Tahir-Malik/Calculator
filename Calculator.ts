#!usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


const sleep=()=>{
    return new Promise((res)=>{
        setTimeout(res,3000);
    })
}

async function welcome(){
    let title = chalkAnimation.rainbow("WELCOME YOU TO MY CALCULATOR");
    await sleep();
    title.stop();
    let calcu=chalkAnimation.rainbow(`
    _____________________
    |  _________________  |
    | | JO           0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|
    `);
    await sleep();
    calcu.stop();
//    // console.log(`

}

//await welcome();


async function main() {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "count",
        message: "How many numbers do you want to enter?",
        validate: (input) => {
          const num = parseInt(input);
          if (isNaN(num) || num < 1) {
            return "Please enter a valid positive number.";
          }
          return true;
        },
      },
    ])
    .then(async (answer) => {
      const numbers = [];
      for (let i = 0; i < parseInt(answer.count); i++) {
        const { no } = await inquirer.prompt([
          {
            type: "number",
            name: "no",
            message: `Enter number #${i + 1}:`,
            filter:(input)=>{
                return parseFloat(input);
            },
            validate: (input) => {
              //const num = parseFloat(input);
              if (isNaN(input)) {
                return "Please enter a valid number.";
              }
              return true;
            },
          },
        ]);
        //numbers.push(parseFloat(no));
        numbers.push(no);
      }

      const { operation } = await inquirer.prompt([
        {
          type: "list",
          name: "operation",
          message: "Select an operation:",
          choices: ["+", "-", "*", "÷"],
        },
      ]);

      let result = 0;

      switch (operation) {
        case "+":
          result = numbers.reduce((acc, curr) => acc + curr, 0);
          break;
        case "-":
          result = numbers.reduce((acc, curr) => acc - curr);
          break;
        case "*":
          result = numbers.reduce((acc, curr) => acc * curr, 1);
          break;
        case "÷":
          result = numbers.reduce((acc, curr) => acc / curr);
          break;
        default:
          console.log("Invalid operation selected.");
          return;
      }

      console.log(chalk.blue(` 
     _____________________
    |  _________________  |
    | |${numbers.join(operation)}
    | | ${result}               
    | |_________________ |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|`));
     // console.log(chalk.green(`Result of ${operation.toLowerCase()}: `));
    });
}

await main();


async function Again(){
    do{
       
        var again=await inquirer.prompt([
            {
                type:"input",
                name:"ReCalculate",
                message:"Do you want to perform calculatio again ? Press y for yes and n for no",
            }
        ])
        if(again.ReCalculate=='y'||again.ReCalculate=='Y'||again.ReCalculate=='yes'||again.ReCalculate=='Yes'){
          await main();
        }
        else{
          return;
        }
        
        
  }while(again.ReCalculate=='y'||again.ReCalculate=='Y'||again.ReCalculate=='yes'||again.ReCalculate=='Yes');
}
await Again();




