/*
 * @Author: xiaohuolong
 * @Date: 2020-07-31 11:22:02
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-31 11:35:19
 * @FilePath: /node-demo/cors/server.js
 */ 
const http = require('http')
const fs = require('fs')
// http.createServer(requestListener?: RequestListener): Server
// 创建一个服务
const server = http.createServer((req, res) => {
    let path = req.url
    console.log(req.url)
    console.log(req.method)
    console.log(req.httpVersion)
    console.log(req.headers)
    console.log(`http://localhost:8000${path}`)
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");  
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    // res.setHeader("X-Powered-By",' 3.2.1')  
    // res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.end(JSON.stringify({path}))
})

server.listen(8000, () => {
    console.log(`http://localhost:8000/`)
})
const server1 = http.createServer((req, res) => {
    fs.createReadStream('./index.html').pipe(res);
})

server1.listen(8001, () => {
    console.log(`http://localhost:8001/`)
})