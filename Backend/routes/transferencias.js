const { Router } = require('express');
const connect = require('../db');
const authVerify = require('../middleware/authVerify');
const QRCode = require('qrcode');
const router = Router();

router.post('/transferencias', authVerify, async (req, res) => {
    const { destinatario_id, monto } = req.body;
    const remitente_email = req.email_usuario;
    let db;

    try {
        db = await connect();
        await db.beginTransaction(); // Iniciar transacción

        // Obtener saldo del remitente
        const [remitente] = await db.execute(
            'SELECT id, saldo FROM users WHERE email = ?',
            [remitente_email]
        );

        if (remitente[0].saldo < monto) {
            await db.rollback();
            return res.status(400).json({
                status: 400,
                message: 'Saldo insuficiente'
            });
        }

        // Actualizar saldo del remitente
        await db.execute(
            'UPDATE users SET saldo = saldo - ? WHERE email = ?',
            [monto, remitente_email]
        );

        // Actualizar saldo del destinatario
        await db.execute(
            'UPDATE users SET saldo = saldo + ? WHERE id = ?',
            [monto, destinatario_id]
        );

        // Registrar la transferencia
        await db.execute(
            'INSERT INTO transferencias (remitente_id, destinatario_id, monto) VALUES (?, ?, ?)',
            [remitente[0].id, destinatario_id, monto]
        );

        await db.commit(); // Confirmar transacción
        res.json({ status: 200, message: 'Transferencia exitosa' });

    } catch (err) {
        if (db) await db.rollback();
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

// En el backend (transferencias.js)
router.post('/transferencias/generate-qr', authVerify, async (req, res) => {
    try {
        const { monto, descripcion, userId } = req.body;
        
        // Verificar datos recibidos
        console.log('Datos recibidos:', { monto, descripcion, userId });
        
        // Generar y enviar respuesta
        res.json({
            status: 200,
            qrCode: true,
            message: 'QR generado exitosamente'
        });
    } catch (error) {
        console.error('Error en generate-qr:', error);
        res.status(500).json({
            status: 500,
            message: 'Error al generar QR'
        });
    }
});

module.exports = router;