'use strict';

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Server index.html
app.get('/', function(req, res) {

    res.sendFile(__dirname + '/web/index.html');
});

// Serve listed static files
app.get('/:file(app.js|main.css|normalize.min.css)', function(req, res) {

    res.sendFile(__dirname + '/web/' + req.params.file);
});


io.on('connection', function(socket) {
    socket.emit('announcements', { message: 'A new user has joined!' });
});

var numClients = 0;

io.on('connection', function(socket) {
    numClients++;
    io.emit('stats', { numClients: numClients });

    console.log('Connected clients:', numClients);

    socket.on('disconnect', function() {
        numClients--;
        io.emit('stats', { numClients: numClients });

        console.log('Connected clients:', numClients);
    });
});


server.listen(8080);
