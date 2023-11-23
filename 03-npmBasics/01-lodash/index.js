// lodash functions can be viewed in node_modules/lodash folder
// fucntions start with _<name>.js

const _ = require("lodash");

// difference between arrays
const a = [1, 2, 3, 4, 5, 6];
const b = [5, 6, 7, 8, 9];

const diff = _.difference(a, b);
console.log(diff);
