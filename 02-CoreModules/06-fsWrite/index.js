const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const name = urlInfo.query.name;

  if (!name) {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    dDate = new Date();
    let dStamp = dDate.toISOString();
    const sWrite = `|${dStamp}| --> ${name}\n`;
    fs.appendFile("arquivo.log", sWrite, (err, data) => {
      res.writeHead(302, {
        Location: "/",
      });
      console.log("Date format 1:", dDate.toLocaleDateString());
      console.log("Date format 2:", dDate.toLocaleString());
      console.log("Date format 3:", dDate.toLocaleTimeString());
      console.log("Date format 4:", dDate.toTimeString());
      console.log("Date format 5:", dDate.getTime());
      console.log("Date format 6:", dDate.toISOString());
      console.log("Date format 7:", dDate.toString());
      console.log("Date format 8:", dDate.toUTCString());
      //console.log("Date format 9:", dDate.UTC());
      console.log("Date format 1:", dDate.valueOf());

      return res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
