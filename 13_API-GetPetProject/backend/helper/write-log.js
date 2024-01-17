module.exports = function writeLog(classification, type, message) {
  const bPrintDebug = true;
  const bPrintMessages = true;
  const msg = `==> ${new Date().toISOString()} - ${classification}_${type}: ${message}`;
  if (classification === "DEB" && bPrintDebug) {
    writeMsg(msg);
  }
  if (classification != "DEB" && bPrintMessages) {
    writeMsg(msg);
  }
};

function writeMsg(msg) {
  console.log("".padEnd(50, "="), `\n${msg}\n`, "".padEnd(50, "-"));
}
