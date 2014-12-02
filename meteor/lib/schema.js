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


DeviceModelSchema = new SimpleSchema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  model: {
    type: String
  },
  os: {
    type: String,
    optional: true
  },
  // TODO hardware
  hardwareVersion: {
    type: String
  },
  // TODO software
  softwareVersion: {
    type: String
  }
});
// TYPE
// tablet, smartphone, touchscreen, smartscreen

// OS
// ios, android, osx, windows, linux


// Describes device requirement for GameSession
DeviceDependencySchema = new SimpleSchema({
  quantity: {
    type: Number,
    min: 1
  },
  type: {
    type: [String]
  },
  os: {
    type: [String]
  }
});


// Device
// i.e. smartphone, tablet, Leap Motion, MYO, Occulus, 
DeviceSchema = new SimpleSchema({
  user_id: { // who is using this device?
    type: String,
    optional: true
  },
  name: {
    type: String
  },
  model: {
    type: DeviceModelSchema
  }
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

// GameSession Configuration
// template for GameSession
GameConfigurationSchema = new SimpleSchema({
  title: {
    type: String,
    max: 30
  },
  description: {
    type: String,
    max: 140
  },
  playersRequired: {
    type: Number,
    min: 1
  },
  piece_ids: {
    type: [String],
    optional: true
  },
  pieceGroup_ids: {
    type: [String],
    optional: true
  },
  devicesRequired: {
    type: [DeviceDependencySchema]
  }
});

// Track a user's chosen game configurations and usage
GameConfigurationAssociationSchema = new SimpleSchema({
  user_id: {
    type: String
  },
  configuration_id: {
    type: String
  },
  lastPlayedAt: {
    type: Date
  },
  playCount: {
    type: Number
  }
});

// GameSession 
GameSessionSchema = new SimpleSchema({
  // attributes copied from configuration template
  title: {
    type: String,
    max: 30
  },
  description: {
    type: String,
    max: 140
  },
  playersRequired: {
    type: Number,
    min: 1
  },
  devicesRequired: {
    type: [DeviceDependencySchema]
  },
  // instance attributes
  hostUser_id: {
    type: String
  },
  invitedUser_ids: {
    type: [String]
  },
  connectedUser_ids: {
    type: [String]
  },
  devicesReady: {
    type: Boolean
  },
  playersReady: {
    type: Boolean
  }
});

// Tracks devices used in GameSession
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
  loadingProgress: { // for computer devices that need to preload assets
    optional: true,
    type: Number,
    min: 0,
    max: 100
  }
});