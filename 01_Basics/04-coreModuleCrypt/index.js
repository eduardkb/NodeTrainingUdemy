// Core modules = modules built in on node
// crypto module
const crypto = require("node:crypto"); // "node:" forces import of built-in module

const algorithm = "aes-256-cbc";
const message = "My Secret text. Written by EKB.";
var password = "MyV&ry5&cr3tP@55w.rd";

if (password.length < 8) {
  throw Error("ERROR: Password must have at leas 8 characters");
}

//expanding passowrd to at least 32 chars
password = password.repeat(4);

// generate hex values for crypt and decrypt
const initVector = Buffer.from(password.substring(4, 20), "utf8");
const Securitykey = Buffer.from(password.substring(0, 32), "utf8");
// console.log("DEB iv: ", initVector);
// console.log("DEB key: ", Securitykey);

// generate 16 bytes of random data
// var initVector = crypto.randomBytes(16);

// secret key generate 32 bytes of random data
//const Securitykey = crypto.randomBytes(32);

console.log("**********************");
console.log("* Encrypt");
console.log("**********************");
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");
encryptedData += cipher.final("hex");
console.log("Encrypted message: " + encryptedData);

console.log("**********************");
console.log("* Decrypt");
console.log("**********************");
//initVector = crypto.randomBytes(16);
//console.log("DEB ivCrypt:", initVector);

const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
decryptedData += decipher.final("utf8");
console.log("Decrypted message: " + decryptedData);
