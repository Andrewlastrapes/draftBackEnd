const app = require("./backend/app")
const http = require('http');
const server = http.createServer(app)
var io = require('socket.io')(server);

io.on("connection", function(socket) {
    socket.emit("news", {hello: "world"})
})


server.listen(3010, () => {
    console.log("listening")
})