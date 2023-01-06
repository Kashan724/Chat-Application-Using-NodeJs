// Node Server for handling socket.io connections
const io = require('socket.io')(8000)

const users = {};

// AS soon as there is connection ,run the arrow function
// events
io.on('connection',socket =>{
    socket.on('new-user-joined',name =>{
        console.log("Name",name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name)
    })
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    })

})