process.env.APPLICATION_INSIGHTS_ENABLE_DEBUG_LOGS = "true";
process.env.APPLICATION_INSIGHTS_DISABLE_WARNING_LOGS = "false";
const appInsights = require("applicationinsights");



// Log connection string presence
console.log(
  "APPLICATIONINSIGHTS_CONNECTION_STRING:",
  process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
);

if (!process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
  console.error("Application Insights connection string not found!");
} else {
  console.log("Starting Application Insights...");
}

// Initialise Application Insights
appInsights
  .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectRequests(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectConsole(true, true)
  .setSendLiveMetrics(true)
  .setInternalLogging(true, true)
  .start();

console.log("Application Insights started");

const client = appInsights.defaultClient;

// Send startup telemetry
client.trackTrace({
  message: "AKS telemetry test trace"
});

client.trackEvent({
  name: "AKS Startup Event"
});

client.trackMetric({
  name: "StartupMetric",
  value: 1
});

client.flush();

console.log("Startup telemetry sent");

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  client.trackTrace({
    message: "Home page accessed"
  });

  res.send("Hello World from my-app!");
});

app.get("/health", (req, res) => {
  client.trackTrace({
    message: "Health endpoint accessed"
  });

  res.status(200).send("Healthy");
});

app.get("/test-ai", (req, res) => {
  client.trackTrace({
    message: "Manual trace test"
  });

  client.trackEvent({
    name: "Manual Test Event"
  });

  client.trackMetric({
    name: "ManualTestMetric",
    value: 100
  });

  client.flush();

  res.send("Telemetry sent to Application Insights");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
``