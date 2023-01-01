const express = require("express");
const kafka = require("kafka-node");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });
// const fs = require("fs");
// const ejs = require("ejs");

const app = express();
// const port = 3001;

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(client, [{ topic: "events" }], {
  autoCommit: true,
});

app.set("view engine", "ejs");

const messages = [];
wss.on("connection", (ws) => {
  consumer.on("message", (message) => {
    ws.send(message.value);
  });
});
// consumer.on("message", (message) => {
//   messages.push(message.value);
//   console.log(messages);
// });

app.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
