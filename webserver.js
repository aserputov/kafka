const express = require("express");
const app = express();
const port = 7077;

class webServer {
  constructor(app) {
    this.app = app;
    this.app.use(express.static("public"));
    this.app.get("/", function (req, res) {
      res.sendFile(__dirname + "/index.html");
    });
  }

  start(port) {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
}

const server = new webServer(app);
server.start(port);
