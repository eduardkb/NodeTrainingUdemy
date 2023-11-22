const fs = require("fs");

// Syncronous examaple
console.log("=======================================");
console.log("== SYNCHRONOUS ==");

console.log("Start of app.");
fs.writeFileSync("syncFile.tmp", "Hello. File Contents.");
console.log("File written synchronously");
console.log("End of app");

// Asynchronous example
console.log("=======================================");
console.log("== ASYNCHRONOUS ==");

console.log("Start of async app.");
fs.writeFile("asyncFile.tmp", "Hello. Async File Contents.", (err) => {
  setTimeout(() => {
    console.log("File created asynchronously");
  }, 1000);
});
console.log("End of async app");
