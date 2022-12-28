const express = require("express");
const kafka = require("kafka-node");
//

const app = express();
const port = 3000;

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(client);

let price = 7;

createData();

async function createData() {
  let random = Math.random();
  if (Math.random() > 0.5) {
    random = -random;
  } else {
    random = random;
  }

  price = price + random;
  const message = `${price.toFixed(2)}`;
  const payloads = [{ topic: "events", messages: message }];
  producer.send(payloads, (err, data) => {
    console.log(data);
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return createData();
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
