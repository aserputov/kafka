const express = require("express");
const kafka = require("kafka-node");
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(client);
const app = express();
const port = 3000;
let price = 7;

class Producer {
  constructor() {
    this.app = app;
    this.producer = producer;
    this.price = price;
  }

  async createData() {
    let random = Math.random();

    if (Math.random() > 0.5) {
      random = -random;
    } else {
      random = random;
    }
    price = price + random;

    if (price < 1) {
      price = 15;
    }
    const message = `${price.toFixed(2)}`;
    const payloads = [{ topic: "events", messages: message }];

    this.producer.send(payloads, (err, data) => {
      console.log(data);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.createData();
  }

  start() {
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

const prod = new Producer(app, producer, price);
prod.createData();
prod.start();
