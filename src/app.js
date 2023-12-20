import express from 'express'
import {pool} from './db.js'
import {PORT} from './config.js'

const app = express()

app.get('/',async(req,res) =>{
    const [rows]= await pool.query(`SELECT * FROM currency_logs`)
    res.json(rows)
})

app.get('/ping', async(req,res) =>{
    const [result]= await pool.query(`SELECT "hello world" as RESULT`);
    console.log(result)
    res.json(result[0])
})
app.listen(PORT)
console.log('Server on port ',PORT)