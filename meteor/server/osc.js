var osc = Meteor.npmRequire('node-osc');
var host = '10.0.1.23';
var multicast = '224.0.0.251';
//var host = '0.0.0.0';
var port = 3333;

var oscServer = new osc.Server(port, host, multicast);
oscServer.on("message", function (msg, rinfo) {
    console.log("Message:");
    console.log(msg);
});

oscServer.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});


function parseMessage(msg) {

  var data = {
    "messageType": msg[0],
    "timestamp": msg[1],
    "summary": msg[2],
    "points": []
  };

  for (var i=3;i<msg.length;i++) {
    points.push(parsePoint(msg[i]));
  }

  return data;
}

function parsePoint(msg) {

  return {
    id: msg[3], x: msg[4], y: msg[5]
  };
}

// check for unique points

// create point objects for new points

// update position for exisiting points

// destroy object for missing point