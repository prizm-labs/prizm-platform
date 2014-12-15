var net = Meteor.npmRequire('net');

socketCache = null; 

var server = net.createServer(function(socket) {

  socketCache = socket;

  socket.write('Echo server\r\n');
  console.log('wrote to client');
  socket.pipe(socket);
});
 
server.listen(1337);
