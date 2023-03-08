const { createPool } = require('mysql')

const pool = createPool({

    host: "localhost",
    user: "root",
    password: "nagasai6611",
    port: "3306"
})

pool.query(`select * from sai.sai`, (err, result, fields) => {
    if (err) {
        console.log(`❌ Error In Connectivity`)
        return
    }
    console.log(`\n ✅ Connected Successfully`)
})

const createNewAccount = ({ acId, acNm, balance }, onCreate = undefined) => {
    var sql = "INSERT INTO sai.account(acId, acNm, balance) VALUES('" + acId + "','" + acNm + "','" + balance + "')";
    pool.query(sql, function (err, res) {
        if (err) console.log(`\n ❌ Problem In Creating the Customer`)
        else {
            console.log(`\n ✅ New Customer Created Successfully`)
            if (onCreate) onCreate(`✅ New Customer Created Successfully`)
        }
    })
}
const withdraw = ({ acId, amount }, onWithdraw = undefined) => {
    var sql = "select balance from sai.account where acId = '" + acId + "'";
    pool.query(sql, (err, res) => {
        if (err) {
            console.log(`\n ❌ Problem In Withdrawing`)
        } else {
            const balance = parseInt(res[0].balance)

            const newBalance = balance - parseInt(amount)
            var sql = "update sai.account set balance = '" + newBalance + "' where acId = '" + acId + "'";
            pool.query(sql, (err, res) => {
                if (err) console.log(`\n ❌ Problem In Withdrawing`)
                else {
                    console.log(`\n ✅ Amount ${amount} Withdrawal Successfully`)
                    if (onWithdraw) onWithdraw(`✅ Amount ${amount} Withdraw Successfully`)
                }
            })
        }
    })
}
const deposit = ({ acId, amount }, onDeposit = undefined) => {
    var sql = "select balance from sai.account where acId = '" + acId + "'";
    pool.query(sql, (err, res) => {
        if (err) {
            console.log(`\n ❌ Problem In Deposit`)
        }
        else {
            const balance = parseFloat(res[0].balance)
            const newBalance = balance + parseFloat(amount)
            var sql = "update sai.account set balance = '" + newBalance + "' where acId = '" + acId + "'";
            pool.query(sql, (err, res) => {
                if (err) console.log(`\n ❌ Problem In Depositing`)
                else {
                    console.log(`\n ✅ Amount ${amount} Deposited Successfully`)

                    if (onDeposit) onDeposit(`✅ Amount ${amount} Deposited Successfully`)
                }
            })
        }
    })
}
const transfer = ({ srcId, destId, amount }, onTransfer = undefined) => {
    withdraw({ acId: srcId, amount }, msgWd => {
        deposit({ acId: destId, amount }, msgDp => {
            if (onTransfer) onTransfer(`✅ Amount ${amount} Transferred Successfully`)
        })
    })
}
const balance = (acId, onBalance = undefined) => {
    console.log(acId)
    var sql = "select balance from sai.account where acId = '" + acId + "'";
    pool.query(sql, (err, res) => {
        if (err) {
            console.log(`\n ❌ Problem In Fetching the balance`)
            console.log(err)
        } else {
            const balance = parseInt(res[0].balance)
            console.log(`\n 💰 Your Account Balance Is : ${balance}`)
            if (onBalance) onBalance(balance)
        }
    })
}
const visit = (onVisit = undefined) => {
    var sql = "SELECT * FROM sai.account";
    pool.query(sql, function (err, result, fields) {
        if (err) {
            console.log(`\n ❌ Problem In Fetching the account`)
        } else {
            console.log(result);
            console.log(`\n ✅ Successfully shown`)
            if (onVisit) onVisit(result)
        }
    })
}
module.exports = {
    createNewAccount, deposit, withdraw, transfer, balance, visit
}
