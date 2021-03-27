const express = require('express')
const expressEjsLayout = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express()
const http = require('http').Server(app);
const passport = require('passport')
const io = require('socket.io')(http);
const formatMessage = require('./utils/messages')
const bot = "bot"
const Users = require('./models/user')
const url = require('url')
const ChatRoomMessage = require('./models/chatRoomMessage.js')
const ChatRoom = require('./models/chatRoom.js')
const User = require('./models/user')


//Kör det som är i passport konfig
require('./config/passport')(passport)

//Socket
io.on('connection', socket => {
    //Set online
    socket.on('logedIn', user=>{
            console.log(user.id)
        User.updateOne(
            {_id: user.id}, 
            {$set: {
                is_online: true
            }}
        ).then((users)=> {
            User.find({is_online: true})
            .then((onUs)=>{
                io.emit('updateList', onUs)
            })
        })
        socket.on('disconnect', ()=>{
            User.updateOne(
                {_id: user.id}, 
                {$set: {
                    is_online: false
                }}
            ).then((users)=> console.log("loggat ut"))
        })
    })
    
    socket.on('joinRoom', ({userName, room})=>{
        console.log(userName, room)

        socket.join(room)

        //welcome current user
        socket.emit('message', formatMessage(bot, `Welcome ${userName} to room ${room}`))
        
        //Skickar till alla förutom klienten att klienten joinat
        socket.broadcast
            .to(room)
            .emit(formatMessage(bot, `${userName} has joined the chat`))
            //körs när klient lämnar
            console.log(room)
            socket.on('disconnect', ()=>{
                console.log("lämnat chaatt")
            })
    })
    
    
    //Lyssna for chatMessage
    socket.on('chatMessage', async (msg)=>{

        const newChatMessage = new ChatRoomMessage({
            text: msg.text, 
            username: msg.username,
            chatRoomId: msg.chatRoomId
        })

        await newChatMessage.save()

        ChatRoom.updateOne(
            {_id: msg.chatRoomId}, 
            {$push: {
                messages: [newChatMessage._id]
            }}
        )
        .then(() => {
            io.in(msg.chatRoomId)
                .emit('message', formatMessage(msg.username, msg.text))   
        });

    })
    
});

const mongoose = require('mongoose');

//Kunna jobba med olika filer
const path = require('path')
const port = 3000

const createUser = require('./routes/createUser')
const login = require('./routes/login');
const logout = require('./routes/logout');
const dashboard = require('./routes/dashboard');
const createChannel = require('./routes/createChannel');
const channel = require('./routes/channel');
const chatRoom = require('./routes/chatRoom');
const createChatRoom = require('./routes/create-chatRoom');
const profile = require('./routes/profile');
const channelInvite = require('./routes/channelInvite');
const notes = require('./routes/notes');

/* const { join } = require('path');
 */

require('dotenv').config()
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to db'))
  .catch(err => console.log(err));

app.set('view engine', 'ejs')
app.use(expressEjsLayout)

app.use(express.json())

//Så att man kan ta emot posts data
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))


app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

const logoutUser = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Now logged out');
    res.redirect('/login');
  }

//Flash
app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})


app.use(passport.initialize())
app.use(passport.session())

app.use('/login', login)
app.use('/logout', logout)
app.use('/create/user', createUser)
app.use('/dashboard', dashboard)
app.use('/createChannel', createChannel)
app.use('/channel/', channel)
app.use('/chat/', chatRoom)
app.use('/create-chatRoom/', createChatRoom)
app.use('/profile/', profile)
app.use('/channelInvite/', channelInvite)
app.use('/notes', notes)
app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
    res.redirect('/login')
})

http.listen(port, ()=>{
    console.log(`körs på port: ${port}`)
})