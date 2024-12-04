require('dotenv').config();
const express = require('express');
const app = express();
const users = require('./routes/usuarios');
const auth = require('./routes/auth');
const PORT = process.env.PORT || 3000;

// console.log(process.env.PORT); // 3000
// console.log(process.env.DATABASE_URL); // mysql://user:password@localhost:3306/dbname
// console.log(process.env.SECRET_KEY); // mysecretkey
//Instalar esto con npm install router, body-parser, bcrypt


app.use(express.json());
app.use(users);
app.use(auth);

app.listen(PORT, () => {
    console.log(`Escuchando por el puerto ${PORT}`); 
    //console.log("Escuchando por el puerto " + PORT); 
});