const { Router } = require('express');
const connect = require('../db');
const QRCode = require('qrcode');
const authVerify = require('../middleware/authVerify');
const router = Router();

router.get('/generate-qr', authVerify, async (req, res) => {
    const { monto, descripcion } = req.query;
    const remitente_id = req.user.id; 

    let db;
    try {
        db = await connect();

        const [remitenteRows] = await db.execute('SELECT saldo FROM users WHERE id = ?', [remitente_id]);
        if (remitenteRows.length === 0 || remitenteRows[0].saldo < monto) {
            return res.status(400).json({ status: 400, message: 'Saldo insuficiente o remitente no encontrado' });
        }


        await db.execute('UPDATE users SET saldo = saldo - ? WHERE id = ?', [monto, remitente_id]);

        const qrData = {
            remitente_id,
            monto,
            descripcion: descripcion.substring(0, 50)
        };


        const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
        res.json({ qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al generar el código QR' });
    } finally {
        if (db) {
            db.end().catch(err => console.error('Error al cerrar la conexión:', err));
        }
    }
});

module.exports = router;