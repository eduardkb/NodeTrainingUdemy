const url = require("url");

const addr = "https://www.myekbsite.com/catalog?product=lamp";
const parseUrl = new url.URL(addr);

// getting values from the URL
console.log(parseUrl.host);
console.log(parseUrl.pathname);
console.log(parseUrl.search);
console.log(parseUrl.searchParams);
console.log(parseUrl.searchParams.get("product"));
