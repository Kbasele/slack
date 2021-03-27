const chatForm = document.getElementById('chat-form')
const chatMessageBox = document.querySelector(".chat-messages")
/* const socket = io(); */
const chatRoom = document.querySelector('.chatRoom')
const chatRooms = document.querySelectorAll('.chatRoom')
const divi = document.querySelector('.divi')
const userID = document.querySelector('.userId').innerHTML
// const room = document.querySelector('.userId').innerHTML
const room = document.querySelector('#channel').innerText
const userName = document.querySelector('.userName').innerHTML
const rooms = []
const ul = document.getElementById('ul')
const chatWith = document.querySelector('#chathWith')


//Set as online
socket.on('inloged', "logg")


//Join chatroom
socket.emit('joinRoom', {userName, room})

//Message from server
socket.on('message', message=>{
    
    outputMessage(message)
})


chatForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    
    //Get message text
    const msg = {
        text: e.target.elements.userInput.value,
        username: userName,
        chatRoomId: e.target.elements.channelID.value
    }; 

    console.log(msg)


    //Emit message to server 
    socket.emit('chatMessage', msg)
    
    e.target.elements.userInput.value = ''
    e.target.elements.userInput.focus

})
//Output message to DOM

const outputMessage= (message)  =>{
    
    const userID = document.querySelector('.userId').innerHTML
    
    //User.find({_id: userID})
    //.then(item => console.log(item)) 

    const div = document.createElement('div')
    div.classList.add("message")
    div.innerHTML = 
    `<div class="d-flex">
    <h3>${message.username}</h3> 
    <p>3 ${message.time}</p>
    </div>
    <p>${message.text}</p>
    <p>Date</p>`
    document.querySelector('.chat-messages').appendChild(div)
    chatMessageBox.scrollTop = chatMessageBox.scrollHeight
}