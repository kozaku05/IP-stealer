const http = require("http");
const fs = require("fs");
const { json } = require("stream/consumers");
const { error } = require("console");
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
    req.on("end", () => {
      fs.readFile("ip.json", "utf-8", (err, data) => {
        let jsonData = [];
        let newData = JSON.parse(body);
        if (!err && data) {
          jsonData = JSON.parse(data);
        }
        jsonData.push(newData);
        jsonData = JSON.stringify(jsonData, null);
        fs.writeFile("ip.json", jsonData, "utf8", (err) => {
          if (err) console.log(err);
        });
      });
    });
  }
  if (req.method === "GET" && req.url === "/data") {
    fs.readFile("ip.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Error reading file" }));
        return;
      }
      if (data) {
        res.statusCode = 200;
        res.end(data);
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Not Found" }));
      }
    });
  }
});
const port = 80;
server.listen(port, () => {
  console.log("Server runnning at port:" + port);
});
