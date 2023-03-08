const { response } = require('express')
const express = require('express')

const cors = require('cors')
const app = express()
app.use(cors())

const port = 3000

const { createNewAccount, deposit, withdraw, balance, transfer, visit } = require('./db')

app.post('/create', express.json(), (req, res) => {        //postman
    createNewAccount(req.body, (msg) => {
        res.json({ 'sts': 'success', msg })
    })
})

app.put('/transfer', express.json(), (req, res) => {
    transfer(req.body, msg => {
        res.json({ 'sts': 'success', msg })
    })
})

app.put('/withdraw', express.json(), (req, res) => {
    withdraw(req.body, msg => {
        res.json({ 'sts': 'success', msg })
    })
})

app.put('/deposit', express.json(), (req, res) => {
    deposit(req.body, msg => {
        res.json({ 'sts': 'success', msg })
    })
})

app.get('/balance/:acId', (req, res) => {
    console.log(req.params)
    const acId = req.params.acId
    // balance(acId)
    balance(acId, bal => {
        res.json({ bal })
    })
})
app.get('/visit', (req, res) => {
    visit(result => {
        res.json(result);
    });
});
app.listen(port, () => {
    console.log(`Banking App app listening on port ${port}`)
})