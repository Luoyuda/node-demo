/*
 * @Author: xiaohuolong
 * @Date: 2020-08-04 22:37:42
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-04 23:43:37
 * @FilePath: /node-demo/process/child.js
 */
const http = require('http')
const server = http.createServer((req, res) => {
    setTimeout(() => {
        console.log('timeout')
        // 发生错误时 触发 uncaughtException
        throw new Error('123')
    }, 1000)
    res.end(`handler by child ${process.pid}`)
})
let worker
process.on('message', (msg, tcp) => {
    if(msg === 'server'){
        worker = tcp
        worker.on('connection', socket => {
            server.emit('connection', socket)
        })
    }
})
process.on('uncaughtException', () => {
    process.send({ act: 'suicide' })
    // 关闭连接
    worker.close(() => {
        // 关闭进程
        process.exit(1)
    })
    // 5秒后推出进程
    setTimeout(() => {
        process.exit(1)
    }, 5000)
})
// // 报错，无法触发创建，无法被杀死、无法发送消息时候触发
// process.on('error', () => {
    
// })
// // 进程退出时触发
// process.on('exit', () => {

// })
// // 进程输出终止时触发
// process.on('close', () => {

// })
// // 进程调用disconnect()触发
// process.on('disconnect', () => {
    
// })