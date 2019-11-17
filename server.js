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
    console.log('A user connected');
    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    })
    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg);
    })
})