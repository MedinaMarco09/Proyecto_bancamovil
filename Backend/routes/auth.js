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
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: 'Email y contraseña son obligatorios'
            });
        }
        db = await connect();
        
        const query = `SELECT * FROM users WHERE email = "${email}"`; 
        const [row] = await db.execute(query);
        if(row.length === 1 ) {
            const hashPassword = row[0].password;
            if(await bcrypt.compare(password, hashPassword)) {
                const token = jwt.sign({email: email}, 'secret', {
                    expiresIn: '1h'
                });
                res.json({
                    'status': 200,
                    'token': token
                });
            } else {
                res.json({
                    'status': 400,
                    message: 'Contraseña incorrecta',
                    'token': null
                });
            }
        }
    } catch(err) {
        console.log(err);
    }
});

router.get('/user', authVerify, async (req, res) => {
    const email = req.email_usuario; 

    let db;
    try {
        db = await connect();
        const query = 'SELECT nombre, email, saldo FROM users WHERE email = ?';
        const [row] = await db.execute(query, [email]);

        if (row.length > 0) {
            res.json({
                status: 200,
                user: row[0], 
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
    const { remitente_id, destinatario_id, monto } = req.body;
    const db = await connect();
    console.log(remitente_id);
    try {
        
        const [rows] = await db.execute('SELECT saldo FROM users WHERE id = ?', [remitente_id]);
        console.log(rows.length === 0, parseFloat(rows[0].saldo) < parseFloat(monto));
        if (rows.length === 0 || parseFloat(rows[0].saldo) < parseFloat(monto)) {
            return res.status(400).json({ status: 400, message: 'Saldo insuficiente o remitente no encontrado' });
        }

        await db.execute('UPDATE users SET saldo = saldo - ? WHERE id = ?', [monto, remitente_id]);
        await db.execute('UPDATE users SET saldo = saldo + ? WHERE id = ?', [monto, destinatario_id]);
        // await db.execute(
        //     'INSERT INTO transferencias (remitente_id, destinatario_id, monto, descripcion) VALUES (?, ?, ?, ?)',
        //     [remitente_id, destinatario_id, monto, "s"]
        // );

        res.json({ status: 200, message: 'Transferencia realizada con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: 'Error en el servidor' });
    }
});


module.exports = router;