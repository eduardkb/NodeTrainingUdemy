const fs = require('fs')  // file system module
fs.readFile('01_arquivo.txt', 'utf8', (err, data) =>{
    err 
        ? console.log(`Problem reading file: ${err} Error Code: ${err.errno}`) 
        : console.log(`Dados lidos: ${data}`)

    // if(err){
    //     console.log(err)
    // }
    // else{
    //     console.log(data)
    // }
})