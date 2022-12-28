const fs = require("fs");
// generate html file to reload for every new message

const htmlTemplate = `
<html>
  <head>
    <title>Kafka Messages</title>
  </head>
  <body>
    <h1>Kafka Messages</h1>
    <ul id="messages">
      <!-- Placeholder for Kafka messages -->
    </ul>
  </body>
</html>
`;

fs.writeFile("index.html", htmlTemplate, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("HTML file created successfully");
  }
});
