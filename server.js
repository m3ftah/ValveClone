var http = require('http')
var port = process.env.PORT || 1337;
var mosca = require('mosca');
var express = require('express');
var app = express();
var server = require('http').Server(app);
app.use(express.static('dist'));
server.listen(port, function() {
      console.log('Express server started');
    });


var ascoltatore = {
  //using ascoltatore
  type: 'mongo',        
  url: 'mongodb://smartfarm:smartfarm@ds028679.mlab.com:28679/dzsmartfarm',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port : 1883,
  //backend: ascoltatore,
};

var moscaServer = new mosca.Server(moscaSettings);
moscaServer.attachHttpServer(server);



moscaServer.on('ready', setup);
moscaServer.on("error", function (err) {
    console.log(err);
});

moscaServer.on('clientConnected', function (client) {
    console.log('Client Connected \t:= ', client.id);
});

moscaServer.on('published', function (packet, client) {
    console.log("Published :=", packet);
});

moscaServer.on('subscribed', function (topic, client) {
    console.log("Subscribed :=", client.packet);
});

moscaServer.on('unsubscribed', function (topic, client) {
    console.log('unsubscribed := ', topic);
});

moscaServer.on('clientDisconnecting', function (client) {
    console.log('clientDisconnecting := ', client.id);
});

moscaServer.on('clientDisconnected', function (client) {
    console.log('Client Disconnected     := ', client.id);
});

// fired when the mqtt moscaServer is ready
function setup() {
  console.log('Mosca server is up and running')
}

