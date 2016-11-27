'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server).of('/chat');
// const chat = io.of('/chat')

// const NEW_USER = 'new-user';
// const ROOT_DIR = __dirname + '/..'.

const DEFAULT_ROOM = 'default';
let users = [];
let rooms = [DEFAULT_ROOM];

function getUserNames(users) {

    let list = [];
    users.forEach(function(element) {
        list.push(element.name);
    });
    return list;
}

function User (socket) {
    this.socket = socket;
    this.name = null;
    this.setName = function(name) {
        this.name = name;
    };
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//
// Static server
//

// Server index.html
app.get('/', function(req, res) {

    res.sendFile('/app/web/index.html');
});

// Serve listed static files
app.get('/:file(app.js|main.css|normalize.min.css)', function(req, res) {

    res.sendFile('/app/web/' + req.params.file);
});

//
// Chat server
//
io.on('connection', function(socket) {

    // Join default room
    socket.join(DEFAULT_ROOM);
    const user = new User(socket);
    users.push(user);

    // io.emit('stats', { numClients: io.clients().length });
    io.emit('system', { users: getUserNames(users), rooms: rooms });

    socket.on('message', function(data) {
        io.emit('message', { message: user.name + '> ' + data.message });
    });

    socket.on('me', function(data) {

        user.setName(data.name);
        io.emit('system', { users: getUserNames(users), rooms: rooms });
    });

    socket.on('disconnect', function(data) {
        users.remove(user);
    });

});

io.on('disconnect', function(socket) {
    console.log('io.on.disconnect');
});

server.listen(8080);
