const kafka = require("kafka-node");
const WebSocket = require("ws");

class Server {
  constructor(wss, consumer) {
    this.wss = wss;
    this.consumer = consumer;

    this.wss.on("connection", (ws) => {
      this.consumer.on("message", (message) => {
        ws.send(message.value);
      });
    });
  }

  start(port) {}
}

const wss = new WebSocket.Server({ port: 8080 });
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(client, [{ topic: "events" }], {
  autoCommit: true,
});

const server = new Server(wss, consumer);
