const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 3000;

const server = http.createServer((req, res) => {
  const oQuery = url.parse(req.url, true);
  const sFileName = oQuery.pathname.substring(1);

  console.log(oQuery);

  if (oQuery.pathname === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "content-type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else {
    if (sFileName.includes("html")) {
      if (fs.existsSync(sFileName)) {
        fs.readFile(sFileName, (err, data) => {
          res.writeHead(200, { "content-type": "text/html" });
          res.write(data);
          return res.end();
        });
      } else {
        fs.readFile("404.html", (err, data) => {
          res.writeHead(404, { "content-type": "text/html" });
          res.write(data);
          return res.end();
        });
      }
    } else {
      fs.readFile("404.html", (err, data) => {
        res.writeHead(404, { "content-type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
