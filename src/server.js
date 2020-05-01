const http = require('http'),
  fs = require('fs'),
  path = require('path'),
  url = require('url')

const server = http
  .createServer(function (req, res) {
    const pathname = url.parse(req.url).pathname
    var filepath = path.join(path.resolve(), './index.html')
    if (pathname === '/') {
      return fs.createReadStream(filepath).pipe(res)
    } else if (pathname.endsWith('.js')) {
      res.writeHead(200, { 'Content-Type': 'application/javascript' })
      const filepath = path.join(process.cwd(), pathname.slice(1))
      fs.readFile(filepath, 'utf8', (err, doc) => {
        const ret = require('@babel/core').transform(doc, {
          plugins: [
            [
              '@babel/plugin-transform-react-jsx',
              {
                pragma: 'h',
                pragmaFrag: 'Fragment',
              },
            ],
          ],
        })
        res.end(ret.code)
      })
    } else {
      res.end('404')
    }
  })
  .listen(8888)

console.log('Server running at http://127.0.0.1:8888/')

module.exports = server
