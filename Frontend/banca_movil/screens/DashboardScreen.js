import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from 'react-native-qrcode-svg';

const BASE_URL = 'http://172.17.182.42:3000';

export default function DashboardScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [monto, setMonto] = useState('');
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.get(`${BASE_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data.user);
            } catch (err) {
                console.error(err);
                setError('Error al cargar los datos del usuario.');
            }
        };

        fetchUserData();
    }, []);

    const generarQr = async () => {
        const token = await AsyncStorage.getItem("token");
        try {
            const response = await axios.get(
                `${BASE_URL}/api/generate-qr`,
                {
                    params: { destinatario_id: user.id, monto, descripcion: 'Depósito' },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setQrCode(response.data.qrCode);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "No se pudo generar el código QR");
        }
    };

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Volver al Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Mobile Banking</Text>
            {user ? (
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Welcome</Text>
                    <View style={styles.userInfoContainer}>
                        <Text style={styles.text}>Nombre: {user.nombre}</Text>
                        <Text style={styles.text}>Correo: {user.email}</Text>
                        <Text style={styles.text}>Saldo: ${user.saldo}</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Monto"
                        value={monto}
                        onChangeText={setMonto}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.button} onPress={generarQr}>
                        <Text style={styles.buttonText}>Generar QR para Depósito</Text>
                    </TouchableOpacity>
                    {qrCode ? (
                        <View style={styles.qrContainer}>
                            <Text style={styles.qrText}>Escanea este código QR para completar el depósito:</Text>
                            <QRCode value={qrCode} size={200} />
                        </View>
                    ) : null}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Transfer')}>
                            <Text style={styles.buttonText}>Transferir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TransactionHistory')}>
                            <Text style={styles.buttonText}>Ver Historial</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRCodeScanner')}>
                            <Text style={styles.buttonText}>Escanear QR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MakeTransfer')}>
                            <Text style={styles.buttonText}>Hacer Transferencia</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Text>Cargando...</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    contentContainer: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userInfoContainer: {
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#66D1FF5E',
        elevation: 5,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#0E6A7F',
        padding: 14,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 10,
        width: '48%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    qrContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    qrText: {
        fontSize: 16,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 20,
    },
});