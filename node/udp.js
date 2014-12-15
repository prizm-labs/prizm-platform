var PORT = 3333;
//var HOST = '127.0.1.1';
var HOST = '10.0.1.23';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);

});

//server.bind(PORT, HOST);
server.bind(PORT);