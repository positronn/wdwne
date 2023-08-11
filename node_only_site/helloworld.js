const http = require('http')
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('<h1>Hello world!</h1>')
})

server.listen(port, () => console.log(`server started on port ${port}; ` +
    'press ctrl-c to terminate ...'))
