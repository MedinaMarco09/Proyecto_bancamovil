const { Router } = require('express');
const connect = require('../db');
const bcrypt = require('bcrypt');
const cors = require('cors'); 
const router = Router();
const authVerify = require('../middleware/authVerify');

router.use(cors());
router.get("/", (req, res) => {
    res.json("Bienvenido a la banca movil");
});

// Obtener todos los usuarios
// router.get('/users', async (req, res) => {
//     let db = null;
//     try {
//         db = await connect();
//         const query = 'SELECT * FROM users';
//         const [row] = await db.execute(query);
//         console.log(row);
//         res.json({
//             'status': 200,
//             'users': row
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });

router.post('/register', async (req, res) => {
    let db;
    try {
        const { email, nombre, password } = req.body;
        const saltRound = 10;
        db = await connect();
        const hashPassword = await bcrypt.hash(password, saltRound);
        const query = `INSERT INTO users(nombre, email, password) VALUES(?, ?, ?)`;
        await db.execute(query, [nombre, email, hashPassword]);
        res.json({ status: 200, message: 'Usuario registrado con éxito' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: 'Error en el servidor' });
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
            res.json({ status: 200, user: row[0] });
        } else {
            res.status(404).json({ status: 404, message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: 'Error en el servidor' });
    }
});

router.get('/users/:email', async (req, res) => {
    const email = req.params.email;
    let db;
    try {
        db = await connect();
        console.log(email);
        const query = 'SELECT * FROM users WHERE email = ?';
        const [row] = await db.execute(query, [email]);
        console.log(row);
        res.json({
            'status': 200,
            'users': row
        });
    } catch (err) {
        console.log(err);
    }
});

router.delete('/users/:email', authVerify, async (req, res) => {
    const email = req.params.email;
    console.log(req.email_usuario);
    let db;
    try {
        db = await connect();
        const query = 'DELETE FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        if (rows.affectedRows === 0) {
            res.status(404).json({
                'users': [],
                'msg': 'Email no encontrado',
            });
        } else {
            res.status(200).json({
                'users': [],
                'msg': 'Usuario eliminado con éxito'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, msg: 'Error en el servidor' });
    }
});

router.put('/users/:email', async (req, res) => {
    const email = req.params.email;
    const { nombre } = req.body;

    try {
        db = await connect();
        const query = 'UPDATE users SET nombre = ? WHERE email = ?';
        const [rows] = await db.execute(query, [nombre, email]);
        if (rows.affectedRows === 0) {
            res.json({
                'users': [],
                'status': 404,
                'msg': 'Email no encontrado',
            });
        } else {
            res.json({
                'status': 200,
                'users': []
            });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;