import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';

const BASE_URL = "http://192.168.1.159:3000"; 

export default function TransferScreen() {
    const [destinatarioId, setDestinatarioId] = useState('');
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [qrCode, setQrCode] = useState('');

    const generarQr = async () => {
        const token = await AsyncStorage.getItem("token");
        try {
            const response = await axios.get(
                `${BASE_URL}/api/generate-qr`,
                {
                    params: { destinatario_id: destinatarioId, monto, descripcion: descripcion.substring(0, 50) },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setQrCode(response.data.qrCode);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "No se pudo generar el código QR");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transferencia de Dinero</Text>
            <TextInput
                style={styles.input}
                placeholder="ID del destinatario"
                value={destinatarioId}
                onChangeText={setDestinatarioId}
            />
            <TextInput
                style={styles.input}
                placeholder="Monto"
                value={monto}
                onChangeText={setMonto}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
            />
            <Button title="Generar QR" onPress={generarQr} />
            {qrCode ? (
                <View style={styles.qrContainer}>
                    <Text style={styles.qrText}>Escanea este código QR para completar la transferencia:</Text>
                    <QRCode value={qrCode} size={200} />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    qrContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    qrText: {
        fontSize: 16,
        marginBottom: 10,
    },
});