const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var port = 3000;

// Routes
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/chat.html')
});

// Calls and connections
http.listen(port, ()=>{
    console.log(`Servidor corriendo en puerto ${port}`)
})

io.on('connection', (socket)=>{
    // On connected user
    console.log('A user connected');

    // Send message to every users
    socket.on('chat message', (msg)=>{
        io.emit('chat message', {
            user: msg.user,
            msg: msg.msg
        });
    })

    // On disconnected user
    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    })
})