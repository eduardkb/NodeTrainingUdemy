const fs = require("fs");

// append to file
fs.appendFile("arquivo.log", "String to write.", (err) => {
  if (err) throw err;
  console.log("File Updated!");
});

// rename file name
fs.rename("arquivo.log", "NewArquivo.log", function (err) {
  if (err) throw err;
  console.log("File Renamed!");
});

// delete file after timeout
console.log("Wait 2 seconds before delete");
setTimeout(() => {
  fs.unlink("NewArquivo.log", (err) => {
    if (err) throw err;
    console.log("File Removed!");
  });
}, 2000);
