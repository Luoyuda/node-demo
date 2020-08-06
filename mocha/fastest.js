/*
 * @Author: xiaohuolong
 * @Date: 2020-08-05 21:48:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-06 10:07:20
 * @FilePath: /node-demo/mocha/fastest.js
 */
const fs = require('fs')
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite

const { copyByRead, copyBySplice, copyByStream } = require('./index.js')
const dataPath = 'data.txt'
const copyPath = 'data.copy.txt'
suite.add('stream', async function(){
    const res = await copyByStream(dataPath, 'data.copy.stream.txt')
    return res
}).add('read', async function(){
    const res = await copyByRead(dataPath, 'data.copy.read.txt')
    return res
}).add('open', async function(){
    const res = await copyBySplice(dataPath, 'data.copy.open.txt')
    return res
}).on('cycle',function(event){
    console.log(event.target.toString())
}).on('complete',function(){
    console.log(this.filter('fastest').map('name'))
}).run()