// OBS! Jag har valt att använda mig av live server-extension för att chatten ska uppdateras live utan att hela sidan laddas om.
// Se till att du har "live server"-extension för att kunna köra programmet, annars fungerar det inte.
// Öppna sedan chatten genom att högerklicka på index.html och öppna i live servern. Öppnar du flera fönster får du fler personer som är aktiva i chatten samtidigt

const io = require('socket.io')(3000)

const users = {}
// för att kunna visa att personer ansluts, skickar meddelande och lämnar chatten
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})