var osc = Meteor.npmRequire('node-osc');
//var host = '10.0.1.23';
var multicast = '224.0.0.251';
var host = '0.0.0.0';
var port = 3333;

//var oscServer = new osc.Server(port, host, multicast);
var oscServer = new osc.Server(port);

oscServer.on("message", function (msg, rinfo) {
    console.log("Message:");
    console.log(msg);

    if (socketCache) soccketCache.write(parseMessage(msg));
});

oscServer.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

calibration = {
  offset: { x: [0.012,0.988], y: [0.012,0.988] },
  size: { x:1920, y:1080 }
}

calibration.delta = {
  x: calibration.offset.x[1]-calibration.offset.x[0],
  y: calibration.offset.y[1]-calibration.offset.y[0]
}

// calibration.unit = {
//   x: calibration.delta.x/calibration.size.x,
//   y: calibration.delta.y/calibration.size.y
// }


var message = [ "#bundle",
  "2.3283064365386963e-10",
  [ "/tuio/2Dcur", "alive", 74, 75, 76, 77 ],
  [ "/tuio/2Dxcur",
    "set",
    74,
    0.67572021484375,
    0.7177734375,
    -0.031654443591833115,
    -0.23966935276985168,
    35.82236862182617 ],
  [ "/tuio/2Dcur",
    "set",
    75,
    0.657318115234375,
    0.533935546875,
    -0.01356618944555521,
    -0.04522063210606575,
    6.995784759521484 ],
  [ "/tuio/2Dcur", "set", 76, 0.427734375, 0.818450927734375, 0, 0, 0 ],
  [ "/tuio/2Dcur",
    "set",
    77,
    0.5948486328125,
    0.45684814453125,
    0,
    0,
    0 ],
  [ "/tuio/2Dcur", "fseq", 6928 ] ]

console.log(parseMessage(message));

function parseSummary(msg) {
  // return only ID's of points
  msg.splice(0,2);
  return msg;
}

function parseMessage(msg) {

  var summary = parseSummary(msg[2]);
  var points = [];

  for (var i=0;i<summary.length;i++) {
    points.push(parsePoint(msg[i+3]));
  }

  return {
    //"messageType": msg[0],
    "timestamp": msg[1],
    "fseq": msg[msg.length-1][2],
    "summary": summary,
    "points": points
  };
}

function formatX(raw) {
  // overlay, left-right is 0,1
  // screen, left-right, 0, 1920

  if (raw>=calibration.offset.x[0] && raw<=calibration.offset.x[1]) {

    return (raw-calibration.offset.x[0])/calibration.delta.x*calibration.size.x;

  } else {
    return null;
  }
}

function formatY(raw) {
  // overlay, top-bottom is 0,1
  // screen, top-bottom is 1080,0

  if (raw>=calibration.offset.y[0] && raw<=calibration.offset.y[1]) {

    return ( 1-((raw-calibration.offset.y[0])/calibration.delta.y) )*calibration.size.y;

  } else {
    return null;
  }
}

function parsePoint(msg) {

  //var xRaw = msg[3], yRaw = msg[4];

  return {
    id: msg[2], 
    x: round(formatX(msg[3]),2), y:round(formatY(msg[4]),2)
  };
}

// http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp  = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}
// check for unique points

// create point objects for new points

// update position for exisiting points

// destroy object for missing point