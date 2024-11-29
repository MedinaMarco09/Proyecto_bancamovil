const { Router } = require('express');
const connect = require('../db');
const bcrypt = require('bcrypt');
const router = Router();
const jwt = require('jsonwebtoken');

router.post('/auth/login', async (req, res) => {
    let db;
    try {
        const {email, password} = req.body;
        if (!email || !password) {//Ingreso de datos del usuario
            return res.status(400).json({
                status: 400,
                message: 'Email y contraseña son obligatorios'
            });
        }
        db = await connect();// Espera los datos para conectar
        
        const query = `SELECT * FROM usuarios WHERE email = "${email}"`; // guarda en una variable
        const [row] = await db.execute(query);//Pide regresar los datos en un array
        
        if(row.length === 1 ) {//Si hay un array lo sigue
            const hashPassword = row[0].password;//obtiene los datos del hash puesto en la base de datos
            if(await bcrypt.compare(password, hashPassword)) {//compara las contraseñas
                const token = jwt.sign({email: email}, 'secret', {//Si todo sale bien se genera un toke de una hora
                    expiresIn: '1h'
                });
                res.json({
                    'status': 200,
                    'token': token
                });
            } else {
                res.json({
                    'status': 400,
                    message: 'Contraseña incorrecta',//salta un mensaje con la contraseña incorrecta.
                    'token': null
                });
            }
        }
    } catch(err) {//Sino aparecera error
        console.log(err);
    }
});

module.exports = router;