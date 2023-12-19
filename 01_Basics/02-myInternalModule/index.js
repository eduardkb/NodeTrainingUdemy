const myModule = require('./myModule')

const minhaSoma = myModule.fMySum

minhaSoma(2, 3);
minhaSoma(5,10);

// or directly from module
myModule.fMySum(4,9);