const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

// # EXAMPLE 1 - Only using external library
// se passado argumento como '--nome=Eduard' o minimist pega esse argumento direto
// console.log(args);
// const nome = args["nome"];
// const profissao = args["profissao"];
// console.log(`O nome dele é ${nome} e ele é ${profissao}`);

// # EXAMPLE 2 - Using external and local module
const soma = require("./moduleSoma").soma;

const a = parseInt(args["a"]);
const b = parseInt(args["b"]);

isNaN(a) || isNaN(b) ? console.log("Error. Arguments not found.") : soma(a, b);
