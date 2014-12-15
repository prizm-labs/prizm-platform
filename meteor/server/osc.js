var osc = Meteor.npmRequire('node-osc');

var oscServer = new osc.Server(3333, '0.0.0.0');
oscServer.on("message", function (msg, rinfo) {
    console.log("Message:");
    console.log(msg);
});

function parseMessage(msg) {

  var data = {
    "messageType": msg[0],
    "timestamp": msg[1]
    "summary": msg[2],
    "points": []
  };

  for (var i=3,i<msg.length;i++) {
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