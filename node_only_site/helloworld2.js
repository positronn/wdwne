const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 3000


function serveStaticFile(res, path, contenType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if(err) {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {'Content-Type': contenType})
        res.end(data)
    })
}


const server = http.createServer((req, res) => {
    // noralize url by removing querystring, optional
    // trailing slash, and making it lowercase
    const path = req.url.replace(/\/?(?:\?.*)?$/, '')
        .toLocaleLowerCase()
    console.log(`request method: ${req.method} to url: ${req.url}`)
    switch(path) {
        case '' || '/home':
            serveStaticFile(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html')
            break
        case '/img/logo.png':
            serveStaticFile(res, '/public/img/logo.png', 'image/png')
            break
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404)
            break
    }
})

server.listen(port, () => console.log(`server started on port ${port}; ` +
    'press ctrl-c to terminate ...'))
