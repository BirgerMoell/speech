const express = require('express')
const app = express()
const port = 8080

const http = require('http');
const https = require('https');
const fs = require('fs');
var privateKey = fs.readFileSync('/etc/letsencrypt/live/ai.homelearning.se/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/ai.homelearning.se/fullchain.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };

app.use(express.static('website'))
app.use('/', express.static('public'))

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, () => console.log(`Fulfillment local server listening on http://localhost:${port}`))