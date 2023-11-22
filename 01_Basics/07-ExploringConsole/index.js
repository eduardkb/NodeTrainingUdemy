// multiple value print
let x = 3;
let y = "my text";
let z = [8, 5];
console.log(x, y, z);

// counting loop interactions
console.count(`Looped ${x} times`);
console.count(`Looped ${x} times`);
console.count(`Looped ${x} times`);
console.count(`Looped ${x} times`);

// other way of interpolating string
const fCombPrice = 5.3499;
console.log("My num: %i. My String: %s. My float: %f", x, y, fCombPrice);

// clear console after x seconds
setTimeout(() => {
  console.clear();
}, 2000);
