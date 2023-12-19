const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
  console.log("Executado Durante evento");
});

console.log("antes");
eventEmitter.emit("start");
console.log("depois");
