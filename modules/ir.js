const SerialPort = require("serialport")

const port = new SerialPort("/dev/ttyS0", {
  baudRate: 9600
})

exports.send = function(signals) {
  ;[0xa1, 0xf1].concat(signals).forEach(signal => {
    port.write(signal)
  })
}
