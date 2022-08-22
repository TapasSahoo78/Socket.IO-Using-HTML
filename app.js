const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var clients = 0;

//Whenever Someone connects this gets executed
io.on('connection', function (socket) {
    //console.log(socket.id); //All users id
    clients++;
    //console.log('A User Connected');
    //io.sockets.emit('broadcast', { description: clients + 'Clients Connected!' });

    socket.emit('newClientsconnect', { description: 'Hey Welcome' })
    socket.broadcast.emit('newClientsconnect', { description: clients + 'Clients Connected!' })


    //Send a message after a timeout of 4seconds
    // setTimeout(() => {
    //     socket.send('Sent a message 4sec after connection!');
    //     socket.emit('serverEvent', { description: 'A custom event named test Event!' });
    // }, 4000);

    // socket.on('clientEvent', function (cdata) {
    //     console.log(cdata);
    // });

    //Whenever Someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        clients--;
        //console.log('A User disconnected');
        //io.sockets.emit('broadcast', { description: clients + 'Clients Connected!' });

        socket.broadcast.emit('newClientsconnect', { description: clients + 'Clients Connected!' })

    });
});


http.listen(4000, function () {
    console.log('Listening on http://localhost:4000/');
})



// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });