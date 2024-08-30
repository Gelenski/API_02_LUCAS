const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");

const functions = require("./inc/functions");
const mysql_config = require("./inc/mysql_config");

const API_AVAILABILITY = true;
const API_VERSION = "1.0.0";

const app = express();

app.listen(3000, () => {
  console.log("[SERVER]: Running on port 3000.");
});

app.use((req, res, next) => {
  if (API_AVAILABILITY) {
    next();
  } else {
    res.json(
      functions.response(
        "Atenção",
        "API está em manutenção. Sinto muito.",
        0,
        null
      )
    );
  }
});

const connection = mysql.createConnection(mysql_config);

app.use(cors());

app.get("/", (req, res) => {
  res.json(functions.response("Sucesso", "API está rodando.", 0, null));
});

app.get("/tasks", (req, res) => [
  connection.query("SELECT * FROM tasks", (err, rows) => {}),
]);

app.get('/tasks/:id',(req,res)=>{
  const id = req.params.id;
  connection.query('SELECT * FROM tasks WHERE id=?'[id],(req,res)=>{
    if(!err){
      if(rows.length>0){
        res.json(functions.response('Sucesso', 'Sucesso na pesquisa',rows.length,rows))
      } else{
        res.json(functions.response('Atenção', 'Não foi possível encontrar a task solicitada',0,null))
      }
    }
    else{
      res.json(functions.response('error',err.message,0,null))
    }
  })
})

app.put('/tasks/:id/status/:status',)

// * Middleware
app.use((req, res) => {
  res.json(functions.response("Atenção", "Rota não encontrada.", 0, null));
});
