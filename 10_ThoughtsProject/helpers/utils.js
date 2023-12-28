module.exports = class Utils {
  static bPrintLog = true;
  static fPrintLog(message, type) {
    if (this.bPrintLog) {
      console.log("==>DEB_%s: %s", type, message);
    }
  }
};
