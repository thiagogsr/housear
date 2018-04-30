var mqtt = require("mqtt")
var gpio = require("rpi-gpio")

const TOPIC = "home/office/light"
const PIN = 23
const OFF = "1242424352424342424242424242425342524342"
const ON = "124242435242434242424242424242425243424242"

function switchLivolo(event) {
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
          gpio.write(PIN, 1)
          setTimeout(function() {
            gpio.write(PIN, 0)
          }, 0.00055)
          break
        case "2":
          gpio.write(PIN, 0)
          setTimeout(function() {
            gpio.write(PIN, 1)
          }, 0.00011)
          break
        case "3":
          gpio.write(PIN, 0)
          setTimeout(function() {
            gpio.write(PIN, 1)
          }, 0.000303)
          break
        case "4":
          gpio.write(PIN, 1)
          setTimeout(function() {
            gpio.write(PIN, 0)
          }, 0.00011)
          break
        case "5":
          gpio.write(PIN, 1)
          setTimeout(function() {
            gpio.write(PIN, 0)
          }, 0.00029)
          break
      }
    }
    gpio.write(PIN, 0)
  }
  gpio.destroy()
}

exports.start = function() {
  var client = mqtt.connect("mqtt://localhost")
  gpio.setMode(gpio.MODE_BCM)
  gpio.setup(PIN, gpio.DIR_OUT)

  client.on("connect", function() {
    client.subscribe(TOPIC)
  })

  client.on("message", function(topic, message) {
    switchLivolo(message.toString())
  })
}
