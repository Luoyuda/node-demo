/*
 * @Author: xiaohuolong
 * @Date: 2020-07-27 23:32:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-03 22:43:56
 * @FilePath: /node-demo/http/index.js
 */ 
const http = require('http')
const fs = require('fs')
// http.createServer(requestListener?: RequestListener): Server
const buffer = fs.readFileSync('./data.txt')
const str = buffer.toString()
// 创建一个服务
const server = http.createServer((req, res) => {
    let path = req.url
    // console.log(req.url)
    // console.log(req.method)
    // console.log(req.httpVersion)
    // console.log(req.headers)
    // console.log(`http://localhost:8001${path}`)
    // res.writeHead(200, { 'Content-Type': 'application/json'})
    res.setHeader('Content-Type', 'application/json')
    // fs.readFile('./data.txt', (err, data) =>{
    //     if(err) return err
        res.end(str)
    // })
})
server.on('connect', (req) => {
    // 当客户端发起 COMMIT 请求时触发此事件
    console.log('connect')
})
server.on('connection', (req) => {
    // 连接建立时触发
    console.log('connection')
})
server.on('request', (req) => {
    // 请求发送到服务器时触发
    console.log('request')
})
server.on('close', (req) => {
    //调用 server.close() 时触发
    console.log('close')
})
server.on('checkContinue', (req) => {
    // 客户端发送较大数据时，先发送带有 Expect: 100-continue 的请求到服务端，触发此事件
    console.log('checkContinue')
})
server.on('upgrade', (req) => {
    // 当服务端接收到客户端要求升级连接协议请求时
    console.log('upgrade')
})
server.on('clientError', (req) => {
    // 连接客户端发生error事件时
    console.log('clientError')
})
// http 客户端
const req = http.request({
    hostname: '127.0.0.1',
    port: 8001,
    path: '/123321',
    method: 'GET',
}, (res) => {
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
    res.setEncoding('utf8')
    res.on('data', (chunk) => {
        console.log(chunk)
    })
})
// http 客户端事件
req.on('response', (req) => {
    // 客户端在请求发出后得到服务端响应时触发
    console.log('req-response')
})
req.on('socket', (req) => {
    // 当底层连接池建立的连接分配给当前请求对象时触发
    console.log('req-socket')
})
req.on('connect', (req) => {
    // 客户端发起 COMMIT 请求后，如果服务端响应了 200时触发此事件
    console.log('req-connect')
})
req.on('upgrade', (req) => {
    // 客户端发起 upgrade 请求后，如果服务端响应了 101 switching Protocols 状态时触发
    console.log('req-upgrade')
})
req.on('continue', (req) => {
    // 客户端发送带有 Expect: 100-continue后，得到服务端响应了 100 Continue 状态时触发
    console.log('req-continue')
})
req.end()
// server.listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): this
// 服务监听在某个域名下的某个端口
server.listen(8001, () => {
    console.log(`http://localhost:8001/`)
})