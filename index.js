
const express = require("express");
const ConectDb = require("./db/conection")
const app = express();

const http = require('http')
const cors = require('cors')
const { Server }  = require("socket.io");
require("dotenv").config()

const MessagesModel = require("./models/message")
const UsersModel = require("./models/users")

const router = require("./routes/Users");
const { json } = require("express");
app.use( json() )
router.use(express.json())
app.use('/chat', router)


router.use(cors({
    origin:"*",
    credentials: true

}))

const server = http.createServer(app)
//http://127.0.0.1:5173/signup
const io = new Server(server , {
    cors:{
        origin:"*",
        methods:["POST", "GET"]
    }
})


ConectDb()

io.on('connection', socket => {
 
    // console.log(socket.id)


    // async function getLastMessages(room){

    //     let roomMessages = await MessagesModel.aggregate([
    //         {$match: {to:room}},
    //         {$group: {_id: '$date' , messagesByDate: {$push: '$$ROOT'}}}
    //     ])
    
    //     return roomMessages
    // }

    socket.on('new_user' , async () => {

        const members = await UsersModel.find();
        io.emit('new_user',  members )

    })


    socket.on("join_room",  async (room) => {
     
        socket.join(room)

        let messages = await MessagesModel.find();

        let filteredMessages = messages.filter( msg => msg.to == room )

        // let messages  = await getLastMessages(room)
        socket.emit("mess",  filteredMessages )
        // io.to(room).emit("mess", messages )
       
    })


    socket.on("send_messages" , async (content, from , date , time , to) => {
     
        let contentMessage = {
            content,
            from,
            date,
            time,
            to
        }


      let newMess =   await MessagesModel(contentMessage).save()  

      console.log(newMess)

        let messages = await MessagesModel.find();  
        // console.log(to)

        let filteredMessages = messages.filter( msg => msg.to == to )

        io.in(to).emit("mess" , filteredMessages )
 

    })


    // socket.emit("receive-messages" ,  )
})


server.listen(3001, () => console.log("it is running"))