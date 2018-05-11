const mqtt = require("mqtt")
const livolo = require("./modules/livolo")

const topics = ["home/office/light"]
const client = mqtt.connect("mqtt://localhost")

let started = false

client.on("connect", function() {
  client.subscribe(topics)
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
      livolo.switch(receivedMessage)
      break
    default:
      throw "Unknown topic"
  }
})
