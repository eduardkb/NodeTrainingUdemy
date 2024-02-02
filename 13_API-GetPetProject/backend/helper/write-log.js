require("dotenv").config();
const fs = require("fs");
const path = require("path");
const rootDir = require("path").resolve("./");
const logDir = rootDir + "/log";
let delDay = "";

module.exports = function writeLog(classification, type, message) {
  const bPrintDebug = true;
  const bPrintMessages = true;
  const msg = `${classification}_${type}: ${message}`;
  if (classification === "DEB" && bPrintDebug) {
    writeMsg(msg);
  }
  if (classification !== "DEB" && bPrintMessages) {
    writeMsg(msg);
  }

  // write log to file
  writeLogToFile(msg);

  // delete files older than x days
  deleteOldFiles();
};

function writeMsg(msg) {
  console.log(`${new Date().toISOString()} ==> ${msg}`);
  //console.log("".padEnd(50, "="), `\n${msg}\n`, "".padEnd(50, "-"));
}

function writeLogToFile(msg) {
  // create directory if not existant
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // create file if not existant
  const fileName =
    "AppLog_" + new Date().toISOString().split("T")[0].split("-").join("");
  const file = `${logDir}/${fileName}.log`;

  try {
    if (fs.existsSync(file)) {
      fs.appendFile(file, `${new Date().toISOString()} ==> ${msg}\n`, (err) =>
        err ? console.log("Error writing log. ERROR:", err) : null
      );
    } else {
      fs.writeFile(file, `${new Date().toISOString()} ==> ${msg}\n`, (err) =>
        err ? console.log("Error writing log. ERROR:", err) : null
      );
    }
  } catch (error) {
    console.log("Error writing log to file:", error);
  }
}

function deleteOldFiles() {
  // get value from ENV variable
  const days = process.env.DELETE_LOGS_OLDER_THAN_X_DAYS || 30;

  // only run deletion once a day
  let today = new Date().toISOString().split("T")[0].split("-").join("");

  //for test:
  let day = new Date().getHours();
  today = today + "_" + day;

  if (!(today === delDay)) {
    writeLogToFile(
      `DEB_Log: Started old log files deletion function. |${today}|${delDay}|`
    );

    delDay = today;
    // remove files
    fs.readdir(logDir, (err, files) => {
      if (err) {
        writeLogToFile(`DEB_Log: Error while running remove files function.`);
        return 1;
      }

      var fCnt = 0;
      var fDel = [];

      for (let i = 0; i < files.length; i++) {
        const filePath = path.join(logDir, files[i]);
        const stat = fs.statSync(filePath);
        const fileAge = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60 * 24);

        if (fileAge > days) {
          fs.unlink(filePath, (err) => {
            if (err) {
              writeLogToFile(
                `DEB_Log: Error while running remove files function.`
              );
              return 1;
            }
          });
          fCnt++;
          fDel.push(files[i]);
        }
      }
      writeLogToFile(
        `Deleted ${fCnt} old log files. List: ${JSON.stringify(fDel)} `
      );
    });
  }
}
