//=====================
// FILE OR DIRECTORY STATS

const fs = require("fs");

fs.stat("file.tmp", (err, stats) => {
  // works also with directory showing directory stats
  if (err) {
    console.log(err);
    return;
  }
  console.log(stats.isFile());
  console.log(stats.isDirectory());
  console.log(stats.isSymbolicLink());
  console.log(stats.ctime);
  console.log(stats.size);
});

//=====================
// PATH MODULE
console.log("=".repeat(50));
const path = require("path");
const customPath = "reports/ekbuhal/report1.pdf";

console.log(path.dirname(customPath));
console.log(path.basename(customPath));
console.log(path.extname(customPath));
