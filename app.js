const express = require('express')
const db = require('./db')
var cors = require("cors");
const app = express()
const port = 50001
const bodyParser = require("body-parser");
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });


// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
 

app.use(cors())
app.options('*', cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
// Get route with name districts that returns  city districts sent with state_id
app.get('/hello', (req, res) => {
  res.send('Hello World! to  ');
});
app.get('/ozgur', (req, res) => {
    res.send('Hello Ozgur! World ');
  });

// GET
app.get('/countries', async (req, res) => {

    console.log("GET /countries");
    try {
       await db.pool.query("select * from countries", (err, rows) => {
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
            res.send(rows);
            
        });
      
        
    } catch (err) {
        res.status(400).send(new Error('description'));
    }
});
app.get('/states', async (req, res) => {

    console.log("GET /countries");
    try {
        const result = await db.pool.query("select * from states where country_id = ?", [req.query.countryid], (err, rows) => {
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
            res.send(rows);
            
        });
    } catch (err) {
        res.status(400).send(new Error('description'));
    }
});

app.get('/cities', async (req, res) => {

    console.log("GET /cities");
    try {
        const result = await db.pool.query("select * from cities where state_id = ?", [req.query.state], (err, rows) => {
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
            res.send(rows);
            
        });
    } catch (err) {
        res.status(400).send(new Error('description'));
    }
});

app.get('/countrycities', async (req, res) => {

    console.log("GET /countrycities");
    try {
        const result = await db.pool.query("select * from cities where country_id = ?", (err, rows) => {
            if(err) throw err;
            console.log('The data from users table are: \n', rows);
            res.send(rows);
            
        });
    } catch (err) {
        res.status(400).send(new Error('description'));
    }
});

  
  
  
 
app.listen(port, () => console.log(`Listening on port ${port}`));
