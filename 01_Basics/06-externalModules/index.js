const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
console.log(args);

// se passado argumento como 'nome=Eduard' o minimist pega esse argumento direto
const nome = args["nome"];
const profissao = args["profissao"];
console.log(`O nome dele é ${nome} e ele é ${profissao}`);
