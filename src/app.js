import express from 'express'
import bodyParser from 'body-parser'
import {pool} from './db.js'
import {PORT} from './config.js'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',async(req,res) =>{
    const [rows]= await pool.query(`SELECT * FROM currency_logs`)
    res.json(rows)
})

app.get('/last10', async(req,res) =>{
    const [result]= await pool.query(`SELECT * FROM currency_logs ORDER BY id DESC LIMIT 10;`);
    res.json(result)
})

app.post('/post_log', (req, res) => {
    const data = req.body;
    const sql = 'INSERT INTO currency_logs (curr_from,curr_to,quantity,result) VALUES (?,?,?,?)';
    const values = [data.curr_from, data.curr_to, data.quantity,data.result];
  
    pool.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar en la base de datos:', err);
        res.status(500).json({ error: 'Error al insertar en la base de datos' });
        return;
      }
  
      console.log('Registro exitoso en la base de datos');
      res.status(200).json({ message: 'Registro exitoso en la base de datos' });
    });
});


app.listen(PORT)
console.log('Server on port ',PORT)