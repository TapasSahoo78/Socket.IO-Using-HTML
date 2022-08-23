var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);
var path = require('path');

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

// var clients = 0;
// var roomno = 1;

//Whenever Someone connects this gets executed
// io.on('connection', function (socket) {
//console.log(socket.id); //All users id
//clients++;
//console.log('A User Connected');
//io.sockets.emit('broadcast', { description: clients + 'Clients Connected!' });

// socket.emit('newClientsconnect', { description: 'Hey Welcome' });
// socket.broadcast.emit('newClientsconnect', { description: clients + 'Clients Connected!' });


//Send a message after a timeout of 4seconds
// setTimeout(() => {
//     socket.send('Sent a message 4sec after connection!');
//     socket.emit('serverEvent', { description: 'A custom event named test Event!' });
// }, 4000);

// socket.on('clientEvent', function (cdata) {
//     console.log(cdata);
// });

//Increase roomno 2 clients are present in a room
//Puts every 2 connections into 1 room together


//Whenever Someone disconnects this piece of code executed
//socket.on('disconnect', function () {
//clients--;
//console.log('A User disconnected');
//io.sockets.emit('broadcast', { description: clients + 'Clients Connected!' });

//socket.broadcast.emit('newClientsconnect', { description: clients + 'Clients Connected!' });

// });
//});

var name;

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('joining msg', (username) => {
        name = username;
        io.emit('chat message', `---${name} joined the chat---`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('chat message', `---${name} left the chat---`);

    });
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);         //sending message to all except the sender
    });
});



server.listen(4000, function () {
    console.log('Listening on http://localhost:4000/');
})


// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });