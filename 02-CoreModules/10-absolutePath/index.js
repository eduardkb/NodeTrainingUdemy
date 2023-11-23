const path = require("path");

// get absolute path
console.log(path.resolve("file.tmp"));

// form a path
const midFolder = "reports";
const fileName = "edu.tmp";

const finalPath = path.join("/", "files", midFolder, fileName);
console.log(finalPath);
