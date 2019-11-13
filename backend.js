// launch command: node backend

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));


io.on('connection', function(socket){
  io.emit('chat message',"has connected");
  console.log('another connections');


  socket.on('join',function(username){
  io.emit('chat message', username + " is drawing...");

  // socket.on('disconnect', function(){
  //   console.log('disconnected');
  //   io.emit('chat message',"has disconnected");
  // });
  });

  socket.on('discon',function(username){
  io.emit('chat message', username + " has stopped drawing...");
  });

  socket.on('draw', function(current_x, current_y, previous_x, previous_y, color, radius){
    io.emit('canvas_draw', current_x, current_y, previous_x, previous_y, color, radius);
  });


});

// io.on('connection', function(socket){
//   socket.emit()
// });


http.listen(5000, function(){
  console.log('listening on *:5000');
});
