const multer = require("multer");
const path = require("path");
const writeLog = require("./write-log");

// setting images destination and name
const imageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    let folder = "";
    //identify if user or pets image
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("pets")) {
      folder = "pets";
    }
    callback(null, `public/images/${folder}`);
  },
  filename: function (req, file, callback) {
    const sFileName = `${Date.now()}_${String(
      Math.floor(Math.random() * 1000)
    )}_${file.originalname}`;
    writeLog("DEB", "ImgUpName", `Generated Image Name:${sFileName}`);
    callback(null, sFileName);
    //callback(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return callback(new Error("Por favor, envie apenas jpg ou png."));
    }
    callback(undefined, true);
  },
});

module.exports = { imageUpload };
