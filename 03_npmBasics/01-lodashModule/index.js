// lodash functions can be viewed in node_modules/lodash folder
// fucntions start with _<name>.js

const _ = require("lodash");

// difference between arrays
const a = [1, 2, 3, 4, 5, 6];
const b = [5, 6, 7, 8, 9];

const diff = _.difference(a, b);
console.log(diff);

// create test data
const arrTest = _.times(10, (i) => {
  return `Item_${i}`;
});
console.log(arrTest);

// remove duplicates
const aTest2 = [3, 6, 8, 5, 6, 9, 3];
const aRes = _.uniq(aTest2);
console.log(aRes);

// sort object array
const aTest3 = [
  { user: "fred", age: 48 },
  { user: "barney", age: 36 },
  { user: "fred", age: 42 },
  { user: "barney", age: 34 },
];
const aRes2 = _.sortBy(aTest3, (o) => {
  return o.user;
});
console.log("Ordered with function:", aRes2);
const aRes3 = _.sortBy(aTest3, ["user", "age"]);
console.log("Ordered with array:", aRes3);
