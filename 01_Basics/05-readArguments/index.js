// prints application paths and arguments passed
console.log(process.argv);

// if passing "name=Eduard -v 1.2" as argument
const args = process.argv.slice(2); // gets all arguments
console.log("The arguments:", args);

const sName = args[0].split("=")[1]; // splits the first argument (0) to get only name
console.log("The Name:", sName);
