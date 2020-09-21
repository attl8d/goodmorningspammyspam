const puppeteer = require('puppeteer');
const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 3001});


(async () => {
  const users = {};
  const spamScore = {};
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://academy.ivanontech.com/live');

  wss.on('connection', (e) => {
    console.log('connection', e);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(spamScore));
      }
    });
  });

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(spamScore));
    }
  });

  page.on('console', data => {
    const remoteObject = data.args()[0]._remoteObject;
    if (remoteObject.type !== 'object') {
      return;
    }

    const displayName = remoteObject.preview.properties[0].value;
    const message = remoteObject.preview.properties[1].value;


    if (!users[displayName]) {
      users[displayName] = {
        messages: [],
      }

      spamScore[displayName] = {
        score: 0
      }
    }

    if (users[displayName].messages.indexOf(message) > -1) {
      spamScore[displayName].score += 1;
    } else {
      users[displayName].messages.push(message);
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(spamScore));
      }
    });
  });
})();
