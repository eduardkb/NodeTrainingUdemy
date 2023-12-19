import chalk from "chalk";

//changing text color
console.log(chalk.blue("Hello") + " Chalk" + chalk.red("!"));
console.log(chalk.green("Congrats. You passed."));
console.log(chalk.green.bold("Congrats. You passed. Now in Bold"));
console.log(chalk.blue("Attention. Study more."));
console.log(chalk.black.bgRed("Red BG with black text."));

// define themes
const error = chalk.bold.red;
const warning = chalk.hex("#FFA500"); // Orange color

console.log(error("Error!"));
console.log(warning("Warning!"));
