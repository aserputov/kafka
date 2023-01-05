const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema.js");
const app = express();
const port = 7077;

class webServer {
  constructor(app) {
    this.app = app;
    this.app.use(express.static("public"));
    this.app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: true,
      })
    );
    this.app.get("/", function (req, res) {
      res.sendFile(__dirname + "/public/index.html");
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
