const MQTT = require("mqtt")
const Livolo = require("./modules/livolo")
const IR = require("./modules/ir")
const IRMapping = require("./params/ir").default

const TOPICS = ["home/office/light", "home/living/tv/volume"]

let client = MQTT.connect("mqtt://localhost")
let started = false

client.on("connect", function() {
  client.subscribe(TOPICS)
})

client.on("message", function(topic, message) {
  // avoid actions on connect
  if (!started) {
    started = true
    return
  }

  const receivedMessage = message.toString()
  console.log("Received message on " + topic + ": " + receivedMessage)

  switch (topic) {
    case "home/office/light":
      Livolo.switch(receivedMessage)
      break
    case "home/living/tv/volume":
      IR.send(IRMapping.living.tv.volume[receivedMessage])
    default:
      throw "Unknown topic"
  }
})
