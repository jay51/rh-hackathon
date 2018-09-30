const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  
  socket.on("typing", function(data){
    console.log("typeing event");
    socket.broadcast.emit("typing");
  });
  
});

http.listen(process.env.PORT, process.env.ID, function(){
  console.log("listening on *:3000");
});