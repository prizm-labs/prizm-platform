var Schemas = {};

// GameViewObject
// specific sync object tightly coupled to a single physical entity in the game world
// i.e. cards, dice
GameViewObjectSchema = new SimpleSchema({
  session_id: {
    type: String
  },
  piece_id: {
    type: String
  },
  profile: { // inherited from game piece record
    type: Object,
    blackbox: true
  },
  values: { // manipulated in real-time
    type: Object,
    blackbox: true,
    optional: true
  },
  user_id: { // which user is manipulating it
    type: String,
    optional: true
  },
  sensor_id: { // which sensor is manipulating it
    type: String,
    optional: true
  }
});

// GameStateObject
// generic sync object for data between devices
// i.e. 
GameStateObjectSchema = new SimpleSchema({
  session_id: {
    type: String
  },
  values: { // manipulated in real-time
    type: Object,
    blackbox: true,
    optional: true
  }
});


DeviceStateObjectSchema = new SimpleSchema({
  session_id: {
    type: String
  },
  device_id: {
    type: String
  },
  isReady: {
    type: Boolean
  },
  loadingProgress: {
    type: Number,
    min: 0,
    max: 100
  }
});


// Device
// i.e. smartphone, tablet, Leap Motion, MYO
DeviceSchema = new SimpleSchema({
  user_id: { // who is using this device?
    type: String
  },
  name: {
    type: String
  },
  model: {
    type: DeviceModelSchema
  },
});

DeviceModelSchema = new SimpleSchema({
  // TODO hardware
  // TODO software
});

// Sensor
// expose a device-specific input for read-only subscription by another device
// i.e. tablet subscribes to the accelerometer input of a smartphone
SensorSchema = new SimpleSchema({
  device_id: {
    type: String
  },
  active: {
    type: Boolean
  },
  type: {
    type: String
  },
  values: { // manipulated in real-time
    type: Object,
    blackbox: true,
    optional: true
  }
});

//TODO sensor types



// GameSession 
GameSessionSchema = new SimpleSchema({
  user_ids: {
    type: [String]
  },
  title: {
    type: String,
    max: 30
  },
  description: {
    type: String,
    max: 140
  },
  piece_ids: {
    type: [String]
  }
});