/*
 * @Author: xiaohuolong
 * @Date: 2020-08-04 10:26:15
 * @LastEditors: xiaohuolong
 * @LastEditTime: 2020-08-04 15:23:17
 * @FilePath: /node-demo/fund/index.js
 */
class Fund {
    constructor(){
        this.netWorth = 1
        this.amplitude = 0
        this.history = []
    }
    getAmplitude(){
        let count = +((Math.random() * 5) * 0.01).toFixed(2)
        return count
    }
    up(amplitude){
        this.amplitude = (amplitude || this.getAmplitude())
        this.history.push(this.amplitude)
        this.netWorth *= (1 + this.amplitude)
        this.netWorth = +this.netWorth.toFixed(2)
    }
    down(amplitude){
        this.amplitude = - (amplitude || this.getAmplitude())
        this.history.push(this.amplitude)
        this.netWorth *= (1 + this.amplitude)
        this.netWorth = +this.netWorth.toFixed(2)
    }
    update(amplitude){
        const flag = amplitude ? amplitude > 0 ? 'up' : 'down' : Math.random() * 2 > 1 ? 'down' : 'up'
        this[flag](Math.abs(amplitude))
        return this.netWorth
    }
}

class Handler {
    constructor(fund){
        this.money = 10000
        this.realMoney = 10000
        this.fundRealMoney = 0
        this.fundOutMoney = 0
        this.fundInMoney = 0
        this.fundMoney = 0
        this.fund = fund
        this.fundAmplitude = 0
        this.fundNetWorth = 0
        this.fundShare = 0
        this.fundRate = 0
        this.fundIncome = 0
        this.buyHistory = []
    }
    getFundRate(){
        this.fundAmplitude = +((this.fund.netWorth - this.fundNetWorth) / this.fund.netWorth).toFixed(2)
        return this.fundAmplitude
    }
    getFundIncome(){
        this.fundIncome = +((this.fund.netWorth - this.fundNetWorth)).toFixed(2) * this.fundShare
        return this.fundIncome
    }
    condition(){
        const fund = this.fund
        if(fund.amplitude < 0){
            this.buy()
        }else{
            // this.sell()
        }
        this.getFundRate()
        this.getFundIncome()
    }
    buy(){
        const fund = this.fund
        if(this.realMoney == 0) return console.log('你没钱加仓啦')
        let buyRate = 0.05
        let amplitude = Math.abs(fund.amplitude)
        if(amplitude > 0.03){
            buyRate = 0.15 
        }else if(amplitude > 0.02){
            buyRate = 0.1 
        }
        let money = this.money * buyRate
        if (this.realMoney < money){
            money = this.realMoney
        }
        this.realMoney -= money
        let share = +(money / fund.netWorth).toFixed(2)
        this.fundShare += share
        this.fundMoney += money
        this.fundInMoney += money
        this.fundRealMoney = +(this.fundShare * fund.netWorth).toFixed(2)
        this.fundNetWorth = +(this.fundMoney / this.fundShare).toFixed(2)
        this.buyHistory.push({
            type: 'buy',
            netWorth: this.fund.netWorth,
            share: share,
            money: money
        })
    }
    sell(){
        let rate = 0
        if(this.fundAmplitude > 0.05){
            rate = 0.05
        }else if(this.fundAmplitude > 0.10){
            rate = 0.10
        }else if(this.fundAmplitude > 0){
            rate = 0.3
        }else{
            rate = 0
        }
        if(!rate) return
        let share = this.fundShare * rate
        let money = this.fund.netWorth * share
        this.fundShare -= share
        this.realMoney += money
        this.fundMoney -= this.fundNetWorth * share
        this.fundRealMoney = +(this.fundShare * this.fund.netWorth).toFixed(2)
        this.fundOutMoney += (this.fund.netWorth - this.fundNetWorth) * share
        this.fundNetWorth = +(this.fundMoney / this.fundShare).toFixed(2)
        this.buyHistory.push({
            type: 'sell',
            netWorth: this.fund.netWorth,
            share: share,
            money: money
        })
    }
}

const fund = new Fund()
const handler = new Handler(fund)
handler.buy()
// const rates = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06]
const rates = [ 0.05, 0.01, -0.04, -0, -0.01, 0.02 ]

rates.map(rate => {
    fund.update(rate)
    handler.condition()
})
// for (let index = 0; index < 20; index++) {
//     fund.update()
//     handler.condition()
// }
console.log(fund)
console.log(handler)
const rate = fund.history.reduce((p, i) => p + i)
console.log(`基金涨了：${rate}`)
console.log(`落袋收益：${handler.fundOutMoney}`)
console.log(`场内收益：${handler.fundIncome}`)
