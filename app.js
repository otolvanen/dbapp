const express = require('express');
const app = express();
const path = require('path');
const bodyParser  = require('body-parser');
const db = require("./db");
app.use(express.static(path.join(__dirname, 'scriptsforui')));
app.use(bodyParser.json());

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname+'/ui.html'));
});

app.get("/get", (req, res) =>{

    db.query("SELECT * FROM henkilot", function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

app.get("/get/:id", (req, res) =>{
    const nimi = req.params.id;
    console.log(nimi);
    db.query("SELECT * FROM henkilot Where nimi = ?", [nimi], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});

app.post("/post", (req, res) =>{
    var ress;
    db.query('INSERT INTO henkilot SET ?', [{nimi : req.body.nimi, puhelin : req.body.puhelin}], (err, results, fields) => {
        if(err) throw err;
        console.log('Last insert ID:', results.insertId);
        ress = "lisätty indeksiin: " + results.insertId + ", nimi: " + req.body.nimi;
        console.log({res1 : ress});
        return res.send({res1 : ress});
        
    });
    
});

app.put("/put", (req, res) => {
    const puh = req.body.puhelin;
    const id = req.body.id;

    db.query('UPDATE henkilot SET puhelin = ? Where ID = ?',[puh, id],(err, result) => {
        if (err) throw err;
        console.log(`Changed ${result.changedRows} row(s)`);
        ress = "päivitetty: " + result.changedRows + ", num: " + puh;
        return res.send({res1 : ress});
        });
        
  });

app.delete("/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    db.query('DELETE FROM henkilot WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        console.log(`Deleted ${result.affectedRows} row(s)`);
        ress = "poistettu: " + result.affectedRows + ", id: " + id;
        return res.send({res1 : ress});
        }
        );
        
});


app.listen(3000, () => console.log("kunnellaan 3000"));