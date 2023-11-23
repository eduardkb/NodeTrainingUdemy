// modulos externos
import inquirer from "inquirer";
import chalk from "chalk";

// modulos internos
import fs from "fs";

fOperations();

// APPLICATION MENU

function fOperations() {
  fClearScreen();
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
          "Create Account",
          "Verify Balance",
          "Withdraw",
          "Deposit",
          "End",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      if (action === "Create Account") {
        fGetAccountInfo();
      }
    })
    .catch((err) => console.log(err));
}

// CODE: CREATE ACCOUNTS OPERATION

function fGetAccountInfo() {
  fClearScreen();
  console.log(
    chalk.green.bold.underline("Congratulations for choosing our bank!")
  );
  console.log(chalk.blue("Define your account options:"));
  fBuildAccount();
}

function fBuildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Type your account name:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      // verify if name entered and between 3 and 15 chars

      // create database directory if it doesn't exist
      if (!fs.existsSync("accountsDB")) {
        fs.mkdir("accountsDB", (err) => console.log(err));
      }
      // verify if account (file name) already exists
      if (fs.existsSync(`accountsDB/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("This account already exists. Select another one.")
        );
        setTimeout(() => {
          fClearScreen();
          fBuildAccount();
        }, 2000);

        return;
      }
      // create account file
      fs.writeFileSync(
        `accountsDB/${accountName}.json`,
        '{"balance":0}',
        (err) => console.log(err)
      );
      console.log(
        chalk.green.bold("Congratulations! Your account has been created.")
      );
      setTimeout(() => {
        fOperations();
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    });
}

// General Functions
function fClearScreen() {
  console.clear();
  console.log("Accounts Application.");
  console.log("=".repeat(50));
}
