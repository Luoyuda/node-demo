/*
 * @Author: xiaohuolong
 * @Date: 2020-08-05 21:46:56
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-05 23:02:30
 * @FilePath: /node-demo/mocha/index.js
 */
const fs = require('fs')
// 复制文件，用读取写入方式
const copyByRead = (src, dest) => {
    if(!src || !dest) return null
    src = src.toString()
    dest = dest.toString()
    if(!fs.existsSync(src)) return null
    return new Promise((resolve, reject) => {
        fs.readFile(src, (err, buffer) => {
            if(err) return reject(err)
            fs.writeFile(dest, buffer, (err) => {
                if(err) return reject(err)
                resolve()
            })
        })
    })
}

const copyBySplice = (src, dest, size = 16 * 1024) => {
    if(!src || !dest) return null
    src = src.toString()
    dest = dest.toString()
    if(!fs.existsSync(src)) return null
    return new Promise((resolve, reject) => {
        fs.open(src, 'r', (err, readFd) => {
            fs.open(dest, 'w', (err, writeFd) => {
                let buf = Buffer.alloc(size)
                let readPos = 0
                let writePos = 0
                const write = () => {
                    fs.read(readFd, buf, 0, size, readPos, (err, bytes) => {
                        readPos += bytes
                        fs.write(writeFd, buf, 0, bytes, writePos, (err, writeBytes) => {
                            if(!writeBytes){
                                fs.fsync(writeFd, err => {
                                    fs.close(writeFd, err => !err && resolve());
                                });
                            }else{
                                writePos += writeBytes
                                write()
                            }
                        })
                        if(!bytes) return fs.close(readFd, () => console.log('读取结束，关闭源文件'))
                    })
                }
                write()
            })
        })
    })
}

// 复制文件，用流读取写入
const copyByStream = (src, dest) => {
    if(!src || !dest) return null
    src = src.toString()
    dest = dest.toString()
    if(!fs.existsSync(src)) return null
    return new Promise((resolve, reject) => {
        // 创建一个可读流
        // fs.createReadStream(path: PathLike, options?: string | { flags?: string; encoding?: string; fd?: number; mode?: number; autoClose?: boolean; emitClose?: boolean; start?: number; end?: number; highWaterMark?: number; }): ReadStream
        const readStream = fs.createReadStream(src)
        // 创建一个可写流
        // fs.createWriteStream(path: PathLike, options?: string | { flags?: string; encoding?: string; fd?: number; mode?: number; autoClose?: boolean; start?: number; highWaterMark?: number; }): WriteStream
        const writeStream = fs.createWriteStream(dest) //
        // 通过pipe实现数据的流转
        readStream.pipe(writeStream)
        // 监听数据完成的情况
        readStream.on('end', resolve)
    })
}

exports.copyByStream = copyByStream
exports.copyByRead = copyByRead
exports.copyBySplice = copyBySplice