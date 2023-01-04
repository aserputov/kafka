const ws = new WebSocket("ws://localhost:8080");
let arrayLocal = localStorage.getItem("arrayOfObjects")
  ? localStorage.getItem("arrayOfObjects")
  : [];
var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [], // this will hold the labels for the x-axis
    datasets: [
      {
        label: "APLL", // this will be the label for the y-axis
        data: [], // this will hold the data points for the chart
        backgroundColor: "rgba(255, 99, 132, 0.2)", // optional background color for the data points
        borderColor: "rgba(255, 99, 132, 1)", // optional border color for the data points
        borderWidth: 1, // optional border width for the data points
      },
    ],
  },
  options: {
    height: 400, //sets the height of the graph
    width: 600,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true, // this will set the minimum value on the y-axis to 0
          },
        },
      ],
    },
  },
});
let label = 0;
if (arrayLocal.length > 0) {
  arrayLocal = JSON.parse(arrayLocal);
  arrayLocal.forEach((element) => {
    myChart.data.labels.push(label);
    label++;
    myChart.data.datasets[0].data.push(element);
    myChart.update();
  });
}

let globalPrice = 0;
let arrayOfObjects =
  arrayLocal.length > 0 ? localStorage.getItem("arrayOfObjects") : [];
arrayOfObjects = arrayOfObjects.length > 0 ? JSON.parse(arrayOfObjects) : [];
let arrayAsString = "";
ws.onmessage = (event) => {
  console.log(event.data);
  document.getElementById("price").innerHTML = "$" + event.data;
  globalPrice = event.data;
  label++;
  arrayOfObjects.push(event.data);
  arrayAsString = JSON.stringify(arrayOfObjects);
  localStorage.setItem("arrayOfObjects", arrayAsString);
  myChart.data.labels.push(label); // add a label for the x-axis
  myChart.data.datasets[0].data.push(event.data); // add a data point to the chart
  myChart.update();

  if (event.data > 0) {
    price.style.backgroundColor = "rgba(91, 251, 79, 0.53)";
  } else {
    price.style.backgroundColor = "rgba(255, 71, 60, 0.53)";
  }
};
let list = [];
if (localStorage.getItem("history") === null) {
  console.log("no history");
} else {
  console.log("history");
  list =
    localStorage.getItem("history").length > 0
      ? JSON.parse(localStorage.getItem("history"))
      : [];
}

let newObject = {};

if (list.length > 0) {
  list.forEach(function (element) {
    const ul = document.getElementById("list"); // Select the ul element
    const li = document.createElement("li"); // Create a new li element
    li.innerText = `You ${element.operator} ${element.name} socks: of ${element.quantity} at ${element.price}`; // Set the text content of the li element
    ul.appendChild(li);
  });
}

function sendAlert(buttonName) {
  if (buttonName === "Button 1") {
    window.alert(`You bought 1 stock at  ${globalPrice}!`);
    newObject = {
      id: 1,
      operator: "Bought",
      name: "Kafka",
      quantity: 1,
      price: globalPrice,
    };
    list.push(newObject);
    console.log(newObject);
    const ul = document.getElementById("list"); // Select the ul element
    const li = document.createElement("li"); // Create a new li element
    li.innerText = `You ${newObject.operator} ${newObject.name} socks: of ${newObject.quantity} at ${newObject.price}`; // Set the text content of the li element
    ul.appendChild(li);
    localStorage.setItem("history", JSON.stringify(list));
  } else {
    window.alert(`You sold 1 stock at ${globalPrice}!`);
  }
}
