/*
 * @Author: xiaohuolong
 * @Date: 2020-08-05 10:16:12
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-05 13:05:13
 * @FilePath: /node-demo/fs/index.js
 */
const fs = require('fs')
const data = Buffer.from('我是内容\r')
// 写入文件
// fs.writeFile(path: string | number | Buffer | URL, data: any, options: WriteFileOptions, callback: NoParamCallback): void
// 同步方式
// fs.writeFileSync(path: string | number | Buffer | URL, data: any, options?: WriteFileOptions): void
fs.writeFile('data.txt', data, (err) => {
    console.log('write ok')
})

// 文件追加内容
// fs.appendFile(file: string | number | Buffer | URL, data: any, options: WriteFileOptions, callback: NoParamCallback): void
// 同步方式
// fs.appendFileSync(file: string | number | Buffer | URL, data: any, options?: WriteFileOptions): void
fs.appendFile('data.append.txt', data, (err) => {
    console.log('append ok')
})

// 读取文件
// fs.readFile(path: string | number | Buffer | URL, options: { encoding?: null; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void
// 同步方式读取
// fs.readFileSync(path: string | number | Buffer | URL, options?: { encoding?: null; flag?: string; }): Buffer
fs.readFile('data.txt', (err, data) => {
    console.log(data.toString())
})

setTimeout(() => {
    // 复制文件
    // fs.copyFile(src: PathLike, dest: PathLike, callback: NoParamCallback): void
    // 同步方式读取
    // fs.copyFileSync(src: PathLike, dest: PathLike, flags?: number): void
    fs.copyFile('data.txt', 'data.copy.txt', err => {
        console.log('copy ok')

        // 删除文件
        // fs.unlink(path: PathLike, callback: NoParamCallback): void
        // 同步方式
        // fs.unlinkSync(path: PathLike): void
        fs.unlink('data.copy.txt', err => {
            console.log('unlink data.copy.txt ok')
        })
    })
    
})

// 高级文件操作
// 打开文件
// flags 有平台差异，需查询官方文档
// fs.open(path: PathLike, flags: string | number, mode: string | number, callback: (err: NodeJS.ErrnoException, fd: number) => void): void
// 同步方式
// fs.openSync(path: PathLike, flags: string | number, mode?: string | number): number
fs.open('data.static.txt', 'r+', (err, fd) => {
    console.log(fd)
    /*
        fs.read(
            fd: number, 文件描述符，需要先使用 open 打开，使用fs.open打开成功后返回的文件描述符
            buffer: NodeJS.ArrayBufferView, 一个 Buffer 对象，v8引擎分配的一段内存，要将内容读取到的 Buffer
            offset: number, 整数，向 Buffer 缓存区写入的初始位置，以字节为单位
            length: number, 整数，读取文件的长度
            position: number, 整数，读取文件初始位置；文件大小以字节为单位
            callback: (err: NodeJS.ErrnoException, bytesRead: number, buffer: NodeJS.ArrayBufferView) => void
            回调函数，有三个参数 err（错误），bytesRead（实际读取的字节数），buffer（被写入的缓存区对象），读取执行完成后执行
        ): void
        同步读取
        fs.readSync(
            fd: number, 
            buffer: NodeJS.ArrayBufferView, 
            offset: number, 
            length: number, 
            position: number
        ): number
    */ 
    const buf = Buffer.alloc(6) 
    fs.readSync(fd, buf, 0, 6, 6)
    console.log(buf.toString())
    fs.read(fd, buf, 0, 6, 0, (err, bytes, buffer) => {
        console.log(bytes)
        console.log(buffer.toString())
        console.log(buf.toString())
    })
    /* 
        fs.write(
            fd: number, 文件描述符，使用fs.open 打开成功后返回的
            buffer: NodeJS.ArrayBufferView, 存储将要写入文件数据的 Buffer
            offset: number, 整数，从 Buffer 缓存区读取数据的初始位置，以字节为单位
            length: number, 整数，读取 Buffer 数据的字节数
            position: number, 整数，写入文件初始位置
            callback: (err: NodeJS.ErrnoException, written: number, buffer: NodeJS.ArrayBufferView) => void
            写入操作执行完成后回调函数，有三个参数 err（错误），bytesWritten（实际写入的字节数），buffer（被读取的缓存区对象），写入完成后执行。
        ): void
        同步写入
        fs.writeSync(fd: number, buffer: NodeJS.ArrayBufferView, offset?: number, length?: number, position?: number): number
    */
    fs.write(fd, Buffer.from('0123456789'), 1, 9, 0, (err, bytes, buffer) => {
        console.log(err)
        console.log(bytes)
        console.log(buffer.toString())
    })
    // 文件关闭
    // fs.close(fd: number, callback: NoParamCallback): void
    fs.close(fd, (err) => {
        console.log('close')
    })
})

// 创建文件夹
// fs.mkdir(path: PathLike, options: string | number | MakeDirectoryOptions, callback: NoParamCallback): void
// fs.mkdirSync(path: PathLike, options?: string | number | MakeDirectoryOptions): void
fs.mkdir('./data', (err) => {
    console.log('mkdir data ok')
    // 删除文件夹
    // fs.rmdir(path: PathLike, callback: NoParamCallback): void
    // fs.rmdirSync(path: PathLike, options?: RmDirOptions): void
    fs.rmdir('./data', (err) => {
        console.log('rmdir data ok')
    })
})

// 读取目录内容
// fs.readdir(path: PathLike, options: { encoding: BufferEncoding; withFileTypes?: false; } | "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex", callback: (err: NodeJS.ErrnoException, files: string[]) => void): void
// fs.readdirSync(path: PathLike, options?: { encoding: BufferEncoding; withFileTypes?: false; } | "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex"): string[]
fs.readdir('./', (err, files) => {
    console.log(files)
})

// 创建一个可读流
// fs.createReadStream(path: PathLike, options?: string | { flags?: string; encoding?: string; fd?: number; mode?: number; autoClose?: boolean; emitClose?: boolean; start?: number; end?: number; highWaterMark?: number; }): ReadStream
const readStream = fs.createReadStream('data.static.txt')
// 创建一个可写流
// fs.createWriteStream(path: PathLike, options?: string | { flags?: string; encoding?: string; fd?: number; mode?: number; autoClose?: boolean; start?: number; highWaterMark?: number; }): WriteStream
const writeStream = fs.createWriteStream('data.static.copy.txt') //
// 通过pipe实现数据的流转
readStream.pipe(writeStream)
// 监听数据完成的情况
readStream.on('end',function () {
    console.log('拷贝完成');
})

// 复制文件，用读取写入方式
const copyByRead = (src, dest) => {
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
copyBySplice('data.large.txt', 'data.large.splice.copy.txt').then(() => {
    console.log('copy by splice')
})
copyByRead('data.large.txt', 'data.large.read.copy.txt').then(() => {
    console.log('copy by read')
})
copyByStream('data.large.txt', 'data.large.stream.copy.txt').then(() => {
    console.log('copy by stream')
})