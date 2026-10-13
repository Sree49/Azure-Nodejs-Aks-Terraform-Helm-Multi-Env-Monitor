const appInsights = require('applicationinsights');

// Initialize Azure Application Insights
appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setSendLiveMetrics(true)
  .start();

const client = appInsights.defaultClient;

client.trackTrace({
  message: "AKS telemetry test"
});

client.flush();

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World from my-app!');
});

app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
