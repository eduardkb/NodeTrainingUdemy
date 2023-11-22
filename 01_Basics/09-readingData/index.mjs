// using native module Readline
// const readline = require("readline").createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// readline.question("What is your favorite language? ", (language) => {
//   console.log(`My favorite language is: ${language}`);
//   readline.close();
// });

// using external module inquirer
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      name: "p1",
      message: "What is the first grade? ",
    },
    {
      name: "p2",
      message: "What is the second grade? ",
    },
  ])
  .then((answers) => {
    console.log(answers);
    let iAvg = (parseInt(answers.p1) + parseInt(answers.p2)) / 2;
    console.log(`Average of Values: ${iAvg}`);
  })
  .catch((err) => console.log(err));
