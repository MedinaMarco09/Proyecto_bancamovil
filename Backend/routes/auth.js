const { Router } = require('express');
const connect = require('../db');
const bcrypt = require('bcrypt');
const router = Router();
const jwt = require('jsonwebtoken');
const authVerify = require('../middleware/authVerify');

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
        
        const query = `SELECT * FROM users WHERE email = "${email}"`; // guarda en una variable
        const [row] = await db.execute(query);//Pide regresar los datos en un array
        
        if(row.length === 1 ) {//Si hay un array lo sigue
            const hashPassword = row[0].password;//obtiene los datos del hash puesto en la base de datos
            if(await bcrypt.compare(password, hashPassword)) {//Compara la contraseña enviada por el usuario (password) con la contraseña encriptada (hashPassword).
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

router.get('/user', authVerify, async (req, res) => {
    const email = req.email_usuario; // Este valor se obtiene del middleware authVerify

    let db;
    try {
        db = await connect();
        const query = 'SELECT nombre, email, saldo FROM users WHERE email = ?';
        const [row] = await db.execute(query, [email]);

        if (row.length > 0) {
            res.json({
                status: 200,
                user: row[0], // Retornamos los datos del usuario
            });
        } else {
            res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: 'Error en el servidor' });
    }
});

router.post('/movimientos', async (req, res) => {
    const { usuario_id, tipo_movimiento, cantidad } = req.body;
    const db = await connect();

    try {
        const query = tipo_movimiento === 'DEPOSITO' 
            ? 'UPDATE users SET saldo = saldo + ? WHERE id = ?'
            : 'UPDATE users SET saldo = saldo - ? WHERE id = ?';

        await db.execute(query, [cantidad, usuario_id]);
        await db.execute(
            'INSERT INTO movimientos (usuario_id, tipo_movimiento, cantidad) VALUES (?, ?, ?)',
            [usuario_id, tipo_movimiento, cantidad]
        );

        res.json({ status: 200, message: 'Movimiento registrado con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: 'Error en el servidor' });
    }
});

router.post('/transferencias', async (req, res) => {
    const { remitente_id, destinatario_id, monto, descripcion } = req.body;
    const db = await connect();

    try {
        const [rows] = await db.execute('SELECT saldo FROM users WHERE id = ?', [remitente_id]);
        if (rows.length === 0 || rows[0].saldo < monto) {
            return res.status(400).json({ status: 400, message: 'Saldo insuficiente o remitente no encontrado' });
        }

        await db.execute('UPDATE users SET saldo = saldo - ? WHERE id = ?', [monto, remitente_id]);
        await db.execute('UPDATE users SET saldo = saldo + ? WHERE id = ?', [monto, destinatario_id]);
        await db.execute(
            'INSERT INTO transferencias (remitente_id, destinatario_id, monto, descripcion) VALUES (?, ?, ?, ?)',
            [remitente_id, destinatario_id, monto, descripcion]
        );

        res.json({ status: 200, message: 'Transferencia realizada con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: 'Error en el servidor' });
    }
});


module.exports = router;