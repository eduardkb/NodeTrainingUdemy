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
    let dStamp = dDate.toUTCString();
    const sWrite = `|${dStamp}| --> ${name}\n`;
    fs.appendFile("arquivo.log", sWrite, (err, data) => {
      res.writeHead(302, {
        Location: "/",
      });
      console.log(
        `DEB_LOG: File written at:${dDate.toLocaleDateString()} ${dDate.toTimeString()}`
      );
      return res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
