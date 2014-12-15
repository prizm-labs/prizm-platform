/* Or use this example tcp client written in node.js.  (Originated with 
example code from 
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */
 
var net = require('net');
var parseString = require('xml2js').parseString;
//var xml = "<root>Hello xml2js!</root>"

 
var client = new net.Socket();
client.connect(3000, '10.0.1.23', function() {
  console.log('Connected');
  client.write('Hello, server! Love, Client.');
});
 
client.on('data', function(data) {
  console.log('Received: ' + data);
  //client.destroy(); // kill client after server's response

  
});

function parseData(data){
  parseString(data, function (err, result) {
    console.dir(result);

    result.OSCPACKET.MESSAGE.forEach(function(message){
      console.log(message);
    });

});
}

client.on('end', function() {
  console.log('!!!!!END MESSAGE!!!!');
});
 
client.on('close', function() {
  console.log('Connection closed');
});