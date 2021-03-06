const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const io = require("socket.io")(http);

// TODO:
// - when a clicks generate, make a new instance in db for session
// - store session data in db when get it from websockets.
// - when user make a request to session canvas, get data from db and draw it. 


app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", function (req, res) {
  // res.render("canv.ejs");
  return res.render("home");
});


app.get("/:id", function (req, res) {
  // console.log(req.params.id);
  return res.render("canv");
});



io.on('connection', function (socket) {
  socket.on("room", function (room) {
    // console.log("room:", room);
    socket.join(room);
  });

  socket.on('stop', function ({ x, y, room }) {
    // console.log('X:' + x + " Y:" + y);
    io.to(room).emit('recive-stop', { x, y });
  });

  socket.on("draw", function ({ x, y, room }) {
    // console.log('X:' + x + " Y:" + y);
    io.to(room).emit("draw", { x, y });
  });

});


// io.on('connection', function (socket) {
//   socket.on('stop', function ({ x, y }) {
//     console.log('X:' + x + " Y:" + y);
//     io.emit('recive-stop', { x, y });
//   });
//   socket.on("draw", function ({ x, y }) {
//     // console.log('X:' + x + " Y:" + y);
//     io.emit("draw", { x, y });
//   });
// });


const PORT = process.env.PORT || 3000
http.listen(PORT, function () {
  console.log(`listening on: ${PORT}`);
});
