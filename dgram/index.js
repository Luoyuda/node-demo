/*
 * @Author: xiaohuolong
 * @Date: 2020-07-30 21:59:46
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-30 22:38:19
 * @FilePath: /node-demo/dgram/index.js
 */ 
const dgram = require('dgram')

// 创建UDP套接字
// dgram.createSocket(type: SocketType, callback?: (msg: Buffer, rinfo: RemoteInfo) => void): Socket
const server = dgram.createSocket('udp4')
// 接收到消息后触发
server.on('message', (msg) => {
    console.log(`server - ${msg.toString()}`)
})
// 监听后触发
server.on('listening', () => {
    console.log(`server - listening on 8000`)
})
// 关闭时触发
server.on('close', () => {
    console.log(`server - closing`)
})
// 异常发生时触发
server.on('close', () => {
    console.log(`server - error`)
})

server.bind(8000)

const client = dgram.createSocket('udp4')
client.on('message', (msg) => {
    console.log(`client - ${msg.toString()}`)
})
const clientMsg = Buffer.from('我来自客户端')
const serverMsg = Buffer.from('我来自服务端')

// client.bind(port?: number, address?: string, callback?: () => void): void
client.bind(8001)

client.send(clientMsg, 0, clientMsg.length, 8000, 'localhost')
// 发送数据
// server.send(msg: string | any[] | Uint8Array, port: number, address?: string, callback?: (error: Error, bytes: number) => void): void
server.send(serverMsg, 0, serverMsg.length, 8001, 'localhost')
// 关闭
server.close()