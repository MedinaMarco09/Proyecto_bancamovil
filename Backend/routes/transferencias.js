const { Router } = require('express');
const connect = require('../db');
const authVerify = require('../middleware/authVerify');
const QRCode = require('qrcode');
const router = Router();

router.post('/transferencias', authVerify, async (req, res) => {
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
            [remitente_id, destinatario_id, monto, descripcion.substring(0, 50)] 
        );

        res.json({ status: 200, message: 'Transferencia realizada con éxito' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, message: 'Error en el servidor' });
    }
});

router.get('/api/generate-qr', authVerify, async (req, res) => {
    const { destinatario_id, monto, descripcion } = req.query;

    try {
        const qrData = {
            destinatario_id,
            monto,
            descripcion: descripcion.substring(0, 50) 
        };

        const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
        res.json({ qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al generar el código QR' });
    }
});

module.exports = router;