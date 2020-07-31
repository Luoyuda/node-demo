/*
 * @Author: xiaohuolong
 * @Date: 2020-07-30 23:36:57
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-07-31 10:02:41
 * @FilePath: /node-demo/rpc/server.js
 */ 
const net = require('net')
/**
 * 编码 | seq | buffer.length | data |
 */
const encode = (data, seq) => {
    const body = Buffer.from(data)
    const header = Buffer.alloc(6)
    header.writeInt16BE(seq)
    header.writeInt32BE(body.length, 2)

    const buffer = Buffer.concat([header, body])
    return buffer
}

/**
 * 解码 | seq | buffer.length | data |
 */
const decode = buffer => {
    const header = buffer.slice(0, 6)
    const seq = header.readInt16BE()
    const body = buffer.slice(6).readInt32BE()
    return {
        seq,
        data: body
    }
}

/**
 * 检查包是否接收完成 
 */
const checkComplete = buffer => {
    if (buffer.length < 6) {
        return 0
    }
    const bodyLength = buffer.readInt32BE(2)
    return 6 + bodyLength
}

const LESSON_DATA = {
    100000: "01",
    100001: "02",
    100002: "03",
    100003: "04",
    100004: "05",
    100005: "06",
}

const server = net.createServer((socket) => {
    let oldBuffer = null
    socket.on('data', function (buffer) {
        buffer = oldBuffer ? Buffer.concat([oldBuffer, buffer]) : buffer
        let packageLength = 0

        while (packageLength = checkComplete(buffer)) {
            const package = buffer.slice(0, packageLength)
            buffer = buffer.slice(packageLength)
            const result = decode(package)
            socket.write(
                encode(LESSON_DATA[result.data], result.seq)
            )
        }

        oldBuffer = buffer
    })
})

server.listen(8000)