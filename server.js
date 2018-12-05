
const app = require("./backend/app")
const http = require('http');
const server = http.createServer(app)
const socketIo = require('socket.io')
const user = require("./backend/routes/user")


server.listen(3010, () => {
    console.log("Listening")
})

const io = socketIo(server)

io.on("connection", (socket) => {
    console.log("io from server")
    socket.emit("news", {hello: user.username})
    socket.on("newConnection", (data) => {
        console.log(data["data"] + " connected")
    });

    socket.on("golfer-drafted", (data) => {
        socket.emit("from-server", data)
    })

})




