/*
 * @Author: xiaohuolong
 * @Date: 2020-08-04 21:30:51
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-04 22:32:08
 * @FilePath: /node-demo/process/master.js
 */
const child_process = require('child_process')
const os = require('os')
const cpus = os.cpus()
cpus.map(cpu => {
    child_process.fork('./worker.js')
})
// 创建子进程的四种方式
// 启动一个子进程执行命令
// child_process.spawn(command: string, options?: SpawnOptionsWithoutStdio): ChildProcessWithoutNullStreams
child_process.spawn('node', ['worker.js'])

// 启动一个子进程执行命令，并且附带回调函数
// child_process.exec(command: string, callback?: (error: ExecException, stdout: string, stderr: string) => void): ChildProcess
child_process.exec('node worker.js', (err, stdout, stderr) => {
    console.log(stdout)
})

// 启动一个子进程执行可执行文件
// child_process.execFile(file: string): ChildProcess
child_process.execFile('worker', (err, stdout, stderr) => {
    console.log(stdout)
})

// 启动一个子进程执行命令，直接指定某个文件模块即可
// child_process.fork(modulePath: string, args?: readonly string[], options?: ForkOptions): ChildProcess
child_process.fork('./worker.js')
// 进程通信
const cp = child_process.fork('./worker.js')
cp.on('message', (msg) => {
    console.log(`parent get ${msg}`)
})
cp.send(321)