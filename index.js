const fs = require('fs');
const { sendToDatadog } = require('./src');
const core = require('@actions/core');

const run = async () => {
  const datadogLocation = core.getInput('datadog_url_location');
  const fileName = core.getInput('filename');
  const datadogApiKey = process.env.DATADOG_TOKEN;

  const contents = JSON.parse(fs.readFileSync(fileName));

  const toSend = {
    ...contents,
  };

  sendToDatadog(JSON.stringify(toSend), datadogLocation, datadogApiKey);
};

run();
