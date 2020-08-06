/*
 * @Author: xiaohuolong
 * @Date: 2020-08-05 21:48:10
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-05 23:32:19
 * @FilePath: /node-demo/mocha/index.test.js
 */
const assert = require('assert')
const fs = require('fs')

const { copyByRead, copyBySplice, copyByStream } = require('./index.js')
const dataPath = 'data.txt'
const copyPath = 'data.copy.txt'
describe('测试复制方法', () => {
    describe('使用fs.readFile和fs.writeFile实现', () => {
        it('输入文件不存在，输出文件不存在时', () => {
            assert.equal(copyByRead(), null)
            assert.equal(copyByRead('123'), null)
            assert.equal(copyByRead(null,'123'), null)
            assert.equal(copyByRead(null, null), null)
            assert.equal(copyByRead([123], {a:1}), null)
            assert.equal(copyByRead([123], null), null)
            assert.equal(copyByRead(null, [123]), null)
            assert.equal(copyByRead({a:1}, null), null)
            assert.equal(copyByRead(null, {a:1}), null)
            assert.equal(copyByRead({a:1}, {a:1}), null)
            assert.equal(copyByRead(1, null), null)
            assert.equal(copyByRead(1, 1), null)
            assert.equal(copyByRead(NaN, NaN), null)
            assert.equal(copyByRead('dsa', 'dsa'), null)
            assert.equal(copyByRead(true, false), null)
            // copyByRead('123', '123')
        });
        it('复制data.txt文件到data.copy.txt', (done) => {
            copyByRead(dataPath, copyPath).then(err => {
                const dataTxt = fs.readFileSync(dataPath)
                const dataCopyTxt = fs.readFileSync(copyPath)
                assert.equal(dataTxt.toString(), dataCopyTxt.toString())
                done()
            })
        });
    })
    describe('使用fs.open和fs.read实现', () => {
        it('输入文件不存在，输出文件不存在时', () => {
            assert.equal(copyBySplice(), null)
            assert.equal(copyBySplice('123'), null)
            assert.equal(copyBySplice(null,'123'), null)
            assert.equal(copyBySplice(null, null), null)
            assert.equal(copyBySplice([123], {a:1}), null)
            assert.equal(copyBySplice([123], null), null)
            assert.equal(copyBySplice(null, [123]), null)
            assert.equal(copyBySplice({a:1}, null), null)
            assert.equal(copyBySplice(null, {a:1}), null)
            assert.equal(copyBySplice({a:1}, {a:1}), null)
            assert.equal(copyBySplice(1, null), null)
            assert.equal(copyBySplice(1, 1), null)
            assert.equal(copyBySplice(NaN, NaN), null)
            assert.equal(copyBySplice('dsa', 'dsa'), null)
            assert.equal(copyBySplice(true, false), null)
        });
        it('复制data.txt文件到data.copy.txt', (done) => {
            copyBySplice(dataPath, copyPath).then(err => {
                const dataTxt = fs.readFileSync(dataPath)
                const dataCopyTxt = fs.readFileSync(copyPath)
                assert.equal(dataTxt.toString(), dataCopyTxt.toString())
                done()
            })
        });
    })
    describe('使用fs.createReadStream和fs.createWriteStream实现', () => {
        it('输入文件不存在，输出文件不存在时', () => {
            assert.equal(copyByStream(), null)
            assert.equal(copyByStream('123'), null)
            assert.equal(copyByStream(null,'123'), null)
            assert.equal(copyByStream(null, null), null)
            assert.equal(copyByStream([123], {a:1}), null)
            assert.equal(copyByStream([123], null), null)
            assert.equal(copyByStream(null, [123]), null)
            assert.equal(copyByStream({a:1}, null), null)
            assert.equal(copyByStream(null, {a:1}), null)
            assert.equal(copyByStream({a:1}, {a:1}), null)
            assert.equal(copyByStream(1, null), null)
            assert.equal(copyByStream(1, 1), null)
            assert.equal(copyByStream(NaN, NaN), null)
            assert.equal(copyByStream('dsa', 'dsa'), null)
            assert.equal(copyByStream(true, false), null)
        });
        it('复制data.txt文件到data.copy.txt', (done) => {
            copyByStream(dataPath, copyPath).then(err => {
                const dataTxt = fs.readFileSync(dataPath)
                const dataCopyTxt = fs.readFileSync(copyPath)
                assert.equal(dataTxt.toString(), dataCopyTxt.toString())
                done()
            })
        });
    })
    afterEach(function() {
        if(fs.existsSync(copyPath)) fs.unlinkSync(copyPath)
    });
})