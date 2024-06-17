const express = require('express');
const path = require('path');
var http = require('http');

const app = express();
app.use(express.static(path.join(__dirname, '../dist'))); 
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

var httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log("Server listening"));
