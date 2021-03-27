const socket = io();
userName = document.querySelector('.userName').innerHTML
userID = document.querySelector('.userId').innerHTML

const user = {
    name: userName,
    id: userID
}

function greetUser(){
    console.log(`${userName} är inloggade`)
}
socket.emit('logedIn',  user)
socket.on('updateList', (users)=>{
    outPutOnlineUsers(users)
})


function outPutOnlineUsers(users){
    const ul = document.getElementById('online_user')
    "605897e5eb3d0c46c8b7cfdd"
    "605897e5eb3d0c46c8b7cfdd"
    
    ul.innerHTML = ""
    users.map(item=>{
        console.log(item._id, 'och', user.id)
        if(user.id != item._id){
            const a = document.createElement('a')
            a.classList = 'chatRoom links'
            a.href=`/create-chatRoom/${item._id} `
            a.innerHTML = `${item.name}`
            ul.appendChild(a)
        }
    })

    /* ul.innerHTML = `<a class="chatRoom" href='/create-chatRoom/${id}'>${name}</a>
                    
    ` */
}
