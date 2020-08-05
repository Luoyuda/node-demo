/*
 * @Author: xiaohuolong
 * @Date: 2020-08-03 22:59:13
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-04 23:52:21
 * @FilePath: /node-demo/cluster/app.js
 */
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    // const buffer = fs.readFileSync('./data.txt')
    setTimeout(() => {
        console.log('timeout')
        // 发生错误时 触发 uncaughtException
        throw new Error('123')
    }, 1000)
    res.end('buffer')
}).listen(8019, (err) => {
    console.log('Server listening')
})