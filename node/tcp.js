var net = require('net');
 
var server = net.createServer(function(socket) {
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});
 
server.listen(1337);

//iptables -I INPUT -p tcp --dport 1337 --syn -j ACCEPT

//http://juretta.com/log/2007/08/08/list_open_ports_on_your_machine_mac_os_x_/
//sudo lsof -i -P | grep -i "listen"