const http = require("http")
const livolo = require("./modules/livolo")

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer(function(request, response) {
  response.statusCode = 200
  response.setHeader("Content-Type", "text/plain")
  response.end("Housear\n")
})

server.listen(port, hostname, () => {
  livolo.start()
  console.log(`Server running at http://${hostname}:${port}/`)
})
