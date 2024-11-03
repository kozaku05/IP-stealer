const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") req.url += "index.html";
    fs.readFile(`./public-pages${req.url}`, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>404 not found</h1>");
      } else {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  }
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
      console.log(body);
    });
  }
});
const port = 80;
server.listen(port, () => {
  console.log("Server runnning at port:" + port);
});
