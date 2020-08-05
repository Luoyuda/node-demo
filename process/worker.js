/*
 * @Author: xiaohuolong
 * @Date: 2020-08-01 11:28:29
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-04 22:20:12
 * @FilePath: /node-demo/process/worker.js
 */
const http = require('http')
const port = Math.round(8000 + Math.random() * 10)
http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World')
}).listen(port, (err) => {
    console.log(`http://localhost:${port}`)
})
console.log(`http://localhost:${port}`)
process.on('message', (msg) => {
    console.log(`child ${msg}`)
})

process.send(123)