// OBS! Jag har valt att använda mig av live server-extension för att chatten ska uppdateras live utan att hela sidan laddas om.
// Se till att du har "live server"-extension för att kunna köra programmet, annars fungerar det inte.
// Öppna sedan chatten genom att högerklicka på index.html och öppna i live servern. Öppnar du flera fönster får du fler personer som är aktiva i chatten samtidigt


const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

// frågar användaren vad den vill bli kallad i chatten genom att skicka en prompt med en input-ruta
const name = prompt('Vad heter du?')
appendMessage('Du anslöt till chatten') // Skickar ett meddelande i din chatt att du anslutit
socket.emit('new-user', name)

// gör att ditt/andras användarnamn + meddelande syns i chatten
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

// berättar vilka personer som anslöt till chatten
socket.on('user-connected', name => {
  appendMessage(`${name} anslöt till chatten`)
})

// berättar om någon lämnat chatten och vem denne var
socket.on('user-disconnected', name => {
  appendMessage(`${name} lämnade chatten`)
})

// När du trycker på skicka-knappen kommer både du och andra att se ditt meddelande. För dig står det "Du: xxx" för andra står det "*ditt namn*: xxx"
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`Du: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}