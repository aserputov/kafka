const kafka = require("kafka-node");
const WebSocket = require("ws");
const port = 8080;

class Server {
  constructor(wss, consumer) {
    this.wss = wss;
    this.consumer = consumer;

    this.wss.on("connection", (ws) => {
      console.log("Client connected");
      this.consumer.on("message", (message) => {
        ws.send(message.value);
      });
    });
  }

  start(port) {
    console.log("WebSocket server starting at " + port);
  }
}

const wss = new WebSocket.Server({ port: port });
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(client, [{ topic: "events" }], {
  autoCommit: true,
});

const server = new Server(wss, consumer);
server.start(port);
