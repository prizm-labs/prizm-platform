var net = Meteor.npmRequire('net');

socketCache = [];
var server = net.createServer(function(socket) {

  socketCache.push(socket);

  socket.write('Echo server');
  //socket.write('Echo server\r\n');
  console.log('wrote to client');
  socket.pipe(socket);

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    socketCache.splice(socketCache.indexOf(socket), 1);
    console.log('socket disconnected');
    //broadcast(socket.name + " left the chat.\n");
  });
});
 
server.listen(1337);
