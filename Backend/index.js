require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const app = express();
const users = require('./routes/usuarios');
const auth = require('./routes/auth');
const transferencias = require('./routes/transferencias');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(cors()); 

app.use(express.json());
app.use(users);
app.use(auth);
app.use(transferencias);


app.listen(PORT, () => {
    console.log(`Escuchando por el puerto ${PORT}`);
});