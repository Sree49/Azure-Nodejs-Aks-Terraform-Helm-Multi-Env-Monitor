const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from my-app!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

const appInsights = require('applicationinsights');

appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .start();

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Node.js App Running');
});

app.listen(3000);