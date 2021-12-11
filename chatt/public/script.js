const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


const name = prompt('Vad heter du?')
appendMessage('Du anslöt till chatten')
socket.emit('new-user', name)


socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})


socket.on('user-connected', name => {
  appendMessage(`${name} anslöt till chatten`)
})


socket.on('user-disconnected', name => {
  appendMessage(`${name} lämnade chatten`)
})


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