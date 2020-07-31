/*
 * @Author: xiaohuolong
 * @Date: 2020-07-30 23:37:04
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-31 10:02:17
 * @FilePath: /node-demo/rpc/client.js
 */ 
const net = require('net')
const client = new net.Socket({})
const LESSON_IDS = [
    '100000',
    '100001',
    '100002',
    '100003',
    '100004',
    '100005',
]

client.connect({
    port: 8000,
    hostname: 'localhost'
})

let oldBuffer = null

client.on('data', (buffer) => {
    // 拼接上一个部分当buffer
    buffer = oldBuffer ? Buffer.concat([oldBuffer, buffer]) : buffer
    let completeLength = 0
    // 当包获取完毕
    while (completeLength = checkComplete(buffer)) {
        const package = buffer.slice(0, completeLength)
        buffer = buffer.slice(completeLength)
        // 解包
        const result = decode(package)
        console.log(`包${result.seq}，返回值是${result.data}`)
    }

    oldBuffer = buffer
})


let seq = 0
/**
 * 二进制包编码函数 | seq | buffer.length | data |
 */
const encode = data => {
    const id = LESSON_IDS[data.id]
    // body 6-10 放内容
    const body = Buffer.alloc(4)
    body.writeInt32BE(id)
    // header 0-6 放信息
    const header = Buffer.alloc(6)
    header.writeInt16BE(seq)
    header.writeInt32BE(body.length, 2)

    // 包头和包体拼起来发送
    const buffer = Buffer.concat([header, body])

    console.log(`seq = ${seq} id = ${id}`)
    seq++
    return buffer
}

/**
 * 二进制包解码函数 | seq | buffer.length | data |
 */
const decode = buffer => {
    // 0-6
    const header = buffer.slice(0, 6)
    // 读 seq
    const seq = header.readInt16BE()
    // 6-n
    const body = buffer.slice(6)

    return {
        seq,
        data: body.toString()
    }
}

/**
 * 检查包是否接收完毕
 */
const checkComplete = buffer => {
    // 检查一段buffer是不是一个完整的数据包小于6就接着获取
    if (buffer.length < 6) return 0
    // body 长度存放在 2-n
    const bodyLength = buffer.readInt32BE(2)
    return 6 + bodyLength
}

for (let index = 0; index < 10; index++) {
    const id = Math.floor(Math.random() * LESSON_IDS.length)
    client.write(encode({id}))
}
