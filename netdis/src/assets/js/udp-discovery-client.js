// Require node js dgram module.
var dgram = require('dgram');

// Create a udp socket client object.
var instrumentDiscoveryClient = dgram.createSocket("udp4");
instrumentDiscoveryClient.bind(4602, '0.0.0.0', function() {
    instrumentDiscoveryClient.setBroadcast(true);
});

function broadcastInstrumentDiscovery(message) {
    console.log('Sending message: ' + message);
    instrumentDiscoveryClient.send(Buffer.from(message), 0, message.length, 4602, "0.0.0.0", 
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Message sent");
        }
    });
}