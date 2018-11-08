
const app = require("./backend/app")
const http = require('http');
const server = http.createServer(app)
const socketIo = require('socket.io')
const user = require("./backend/routes/user")


server.listen(3010, () => {
    console.log("listening")
})

const io = socketIo(server)

io.on("connection", (socket) => {
    console.log("io from server")
    socket.emit("news", {hello: user.username})
    socket.on("message", (data) => {
        console.log(data)
    })
})




