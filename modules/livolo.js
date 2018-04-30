var mqtt = require("mqtt")
var rpio = require("rpio")

const TOPIC = "home/office/light"
const PIN = 16
const OFF = "1242424352424342424242424242425342524342"
const ON = "124242435242434242424242424242425243424242"

function switchLivolo(event) {
  rpio.open(PIN, rpio.OUTPUT)

  if (event === "OFF") {
    var times = 1000
    var bytes = OFF
  } else {
    var times = 150
    var bytes = ON
  }

  for (var x = 0; x < times; x++) {
    for (var y = 0; y < bytes.length; y++) {
      switch (bytes.charAt(y)) {
        case "1":
          rpio.write(PIN, rpio.HIGH)
          rpio.sleep(0.00055)
          rpio.write(PIN, rpio.LOW)
          break
        case "2":
          rpio.write(PIN, rpio.LOW)
          rpio.sleep(0.00011)
          rpio.write(PIN, rpio.HIGH)
          break
        case "3":
          rpio.write(PIN, rpio.LOW)
          rpio.sleep(0.000303)
          rpio.write(PIN, rpio.HIGH)
          break
        case "4":
          rpio.write(PIN, rpio.HIGH)
          rpio.sleep(0.00011)
          rpio.write(PIN, rpio.LOW)
          break
        case "5":
          rpio.write(PIN, rpio.HIGH)
          rpio.sleep(0.00029)
          rpio.write(PIN, rpio.LOW)
          break
      }
    }
    rpio.write(PIN, rpio.LOW)
  }
  rpio.close(PIN)
}

exports.start = function() {
  var client = mqtt.connect("mqtt://localhost")

  client.on("connect", function() {
    client.subscribe(TOPIC)
  })

  client.on("message", function(topic, message) {
    console.log("Received message on " + topic + ": " + message.toString())
    switchLivolo(message.toString())
  })
}
