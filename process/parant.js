/*
 * @Author: xiaohuolong
 * @Date: 2020-08-04 22:32:33
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-04 23:42:13
 * @FilePath: /node-demo/process/parant.js
 */
const child_process = require('child_process')
const net = require('net')

const server = net.createServer()
const workers = {}
const createWorker = () => {
    const worker = child_process.fork(`${__dirname}/child.js`)
    worker.on('message', (msg) => {
        if(msg.act === 'suicide'){
            createWorker()
        }
    })
    worker.on('exit', () => {
        console.log(`worker ${worker.pid} exited`)
        delete workers[worker.pid]
        // createWorker()
    })
    worker.send('server', server)
    workers[worker.pid] = worker
    console.log(`create worker ${worker.pid}`)
}
server.on('connection', (socket) => {
    socket.end(`handler by parent ${process.pid}`)
})
server.listen(8002, () => {
    createWorker()
    createWorker()
    createWorker()
    createWorker()
    // 关掉
    // server.close()
})
process.on('exit', () => {
    for (const pid in workers) {
        workers[pid].kill()
    }
})