/*
 * @Author: xiaohuolong
 * @Date: 2020-08-03 22:58:08
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-04 23:58:44
 * @FilePath: /node-demo/cluster/index.js
 */
const cluster = require('cluster')
const os = require('os');

if (cluster.isMaster){
    // 复制进程后触发
    cluster.on('fork', (worker) => {
        console.log(`create worker ${worker.process.pid}`)
    })
    // 复制一个工作进程后，工作进程主动发送online给主进程，接收后触发
    cluster.on('online', (worker) => {
        console.log(`online worker ${worker.process.pid}`)
    })
    // 工作进程调用listen()后，发送 listening 消息后触发
    cluster.on('listening', (worker) => {
        console.log(`listening worker ${worker.process.pid}`)
    })
    // 主进程和工作进程 断开连接后触发
    cluster.on('disconnect', (worker) => {
        console.log(`disconnect worker ${worker.process.pid}`)
    })
    for(let i = 0; i < os.cpus().length / 2; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork();
    })
}else {
    require('./app.js')
}