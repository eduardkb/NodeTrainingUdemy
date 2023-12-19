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
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      switch (action) {
        case "Create Account":
          fCreateAccount();
          break;
        case "Verify Balance":
          fGetBalance();
          break;
        case "Withdraw":
          fWithdraw();
          break;
        case "Deposit":
          fDeposit();
          break;
        case "Exit":
          console.log(chalk.bgBlue.black("Thanks for using the Accounts"));
          setTimeout(() => {
            process.exit;
          }, 3000);
          break;
      }
    })
    .catch((err) => console.log(err));
}

// CODE: CREATE ACCOUNTS OPERATION

function fCreateAccount() {
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
      if (accountName.length < 3 || accountName.length > 15) {
        console.log(
          chalk.bgRed.black(
            "Invalid account name. Must be from 3 to 15 characters."
          )
        );
        setTimeout(() => {
          fClearScreen();
          fBuildAccount();
        }, 2000);
        return;
      }

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

function fGetBalance() {
  console.log(chalk.green.bold.underline("Getting My Account Balance!"));

  inquirer
    .prompt([
      {
        name: "accntName",
        message: "Type your account name:",
      },
    ])
    .then((answer) => {
      const accntName = answer["accntName"];

      if (!fAccountExists(accntName)) {
        console.log(chalk.red.bold("This accont does not exist. Try again."));
        setTimeout(() => {
          fClearScreen();
          fGetBalance();
        }, 2000);
        return;
      }

      const jRes = getAccount(accntName);
      console.log(chalk.green("Your balance is : US$ ", jRes.balance));
      setTimeout(() => {
        fOperations();
      }, 3000);
    })
    .catch((err) => console.log(err));
}

function fWithdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Type your account name:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      // verify if account exists
      if (!fAccountExists(accountName)) {
        console.log(chalk.red.bold("This accont does not exist. Try again."));
        setTimeout(() => {
          fClearScreen();
          fWithdraw();
        }, 2000);
        return;
      }

      inquirer
        .prompt([
          {
            name: "withdrawValue",
            message: "Ammount to withdraw: ",
          },
        ])
        .then((answer) => {
          const iValue = answer["withdrawValue"];
          if (!fWithdrawAmount(accountName, iValue)) {
            setTimeout(() => {
              fClearScreen();
              fWithdraw();
            }, 2000);
            return;
          }

          console.log(
            chalk.green.bold(
              `Withdraw of US$ ${iValue} completed successfully.`
            )
          );
          setTimeout(() => {
            fClearScreen();
            fOperations();
          }, 2000);
          return;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function fDeposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Type your account name:",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      // verify if account exists
      if (!fAccountExists(accountName)) {
        console.log(chalk.red.bold("This accont does not exist. Try again."));
        setTimeout(() => {
          fClearScreen();
          fDeposit();
        }, 2000);
        return;
      }

      inquirer
        .prompt([
          {
            name: "depositValue",
            message: "Ammount to deposit: ",
          },
        ])
        .then((answer) => {
          const iValue = answer["depositValue"];
          if (!fAddAmount(accountName, iValue)) {
            setTimeout(() => {
              fClearScreen();
              fDeposit();
            }, 2000);
            return;
          }

          console.log(
            chalk.green.bold(`Deposit of US$ ${iValue} completed successfully.`)
          );
          setTimeout(() => {
            fClearScreen();
            fOperations();
          }, 2000);
          return;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

// GENERAL FUNCTIONS
function fAccountExists(accountName) {
  return fs.existsSync(`accountsDB/${accountName}.json`);
}

function fAddAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount || isNaN(parseFloat(amount))) {
    console.log(chalk.red.bold("Amount to deposit is invalid. try again."));
    return false;
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
  fs.writeFileSync(
    `accountsDB/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => console.log(err)
  );
  return true;
}

function fWithdrawAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount || isNaN(parseFloat(amount))) {
    console.log(chalk.red.bold("Amount to withdraw is invalid. try again."));
    return false;
  }

  if (parseFloat(accountData.balance) < parseFloat(amount)) {
    console.log(
      chalk.red.bold("Amount requested to withdraw is not available.")
    );
    return false;
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);
  fs.writeFileSync(
    `accountsDB/${accountName}.json`,
    JSON.stringify(accountData),
    (err) => console.log(err)
  );
  return true;
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accountsDB/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
}

function fClearScreen() {
  console.clear();
  console.log("Accounts Application.");
  console.log("=".repeat(50));
}
