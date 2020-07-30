/*
 * @Author: xiaohuolong
 * @Date: 2020-07-29 23:17:32
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-29 23:55:18
 * @FilePath: /node-demo/net/index.js
 */ 
const net = require('net')

// 服务端
const server = net.createServer(function(socket){
    // data 一端调用write()方法发送数据时，另一端会通过 监听 data 事件接收到
    socket.on('data', function(data){
        console.log(`from client data ${data.toString()}`)
        socket.write(`server`)
    })
    socket.write('welcome')
})

// 服务端主动关闭后触发
server.on('close', function(){
    console.log('connect close')
})

// 客户端连接到服务器是触发
server.on('connection', function(data){
    console.log(`connection`)
})

// 服务器发生异常时触发
server.on('error', function(data){
    console.log(`connection`)
})

// listening 事件 调用 server.listen()后触发
server.listen(8000, function(){
    console.log('server listening on port 8000')
})
server.on('listening', function(){
    console.log('server listening on port 8000')
})

// 客户端
const client = net.connect({ port: 8000 }, function(){
    console.log('client connected')
    console.log('from client')
})

// data 一端调用 write()方法发送数据时，另一端会通过监听 data 事件接收到
client.on('data', function(data){
    console.log(data.toString())
    // client.end()
})
// 客户端连接成功后触发
client.on('connect', function(){
    client.write('123')
    client.write('123')
    client.write('123')
    client.write('123')
})

// 调用write时触发
client.on('drain', function(){
    console.log('drain')
})

// 一定时间后连接不再活跃时触发
client.on('timeout', function(){
    console.log('timeout')
})

// 异常时触发
client.on('error', function(){
    console.log('client error')
})

// 任何一端结束时触发
client.on('end', function(){
    console.log('client closed')
})

