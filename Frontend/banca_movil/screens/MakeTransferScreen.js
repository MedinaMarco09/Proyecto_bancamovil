import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from 'react-native-qrcode-svg';

const BASE_URL = 'http://172.17.182.42:3000';

export default function MakeTransferScreen({ navigation }) {
    const [monto, setMonto] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        obtenerDatosUsuario();
    }, []);

   
    const obtenerDatosUsuario = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Error", "No hay sesión activa");
                navigation.navigate('Login');
                return;
            }

            const response = await axios.get(`${BASE_URL}/user`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data.user);
        } catch (error) {
            console.log('Error en obtenerDatosUsuario:', error);
            Alert.alert("Error", "No se pudieron obtener los datos del usuario");
        }
    };


    const generarRetiroQR = async () => {
        try {
            // Validaciones básicas
            if (!monto || isNaN(parseFloat(monto))) {
                Alert.alert('Error', 'Por favor, ingrese un monto válido.');
                return;
            }

            const montoNumerico = parseFloat(monto);
            if (montoNumerico <= 0) {
                Alert.alert('Error', 'El monto debe ser mayor a 0.');
                return;
            }

            if (!user) {
                Alert.alert('Error', 'Datos de usuario no disponibles');
                return;
            }

            if (user.saldo < montoNumerico) {
                Alert.alert('Error', 'Saldo insuficiente');
                return;
            }

            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'No hay sesión activa');
                return;
            }

            // Hacer la petición al servidor
            const response = await axios.post(
                `${BASE_URL}/transferencias/generate-qr`,
                {
                    monto: montoNumerico,
                    descripcion: 'Retiro QR'
                },
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

  
            if (response.data.status === 200) {
                const qrData = JSON.stringify({
                    monto: montoNumerico,
                    fromUserId: user.id,
                    timestamp: Date.now()
                });

                setQrCode(qrData);
                setUser(prevUser => ({
                    ...prevUser,
                    saldo: prevUser.saldo - montoNumerico
                }));

                Alert.alert('Éxito', `Se generó el QR y se descontaron $${monto} de su saldo`);
                setMonto('');
            } else {
                throw new Error('Respuesta inválida del servidor');
            }
        } catch (error) {
            console.log('Error en generarRetiroQR:', error);
            Alert.alert(
                'Error', 
                error.response?.data?.message || 
                'No se pudo generar el QR. Verifique su conexión e intente nuevamente.'
            );
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Generar Código QR para Retiro</Text>
                <Text style={styles.saldo}>Saldo disponible: ${user?.saldo || 0}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Monto a retirar"
                    keyboardType="numeric"
                    value={monto}
                    onChangeText={setMonto}
                />

                <View style={styles.buttonContainer}>
                    <Button 
                        title="Generar QR" 
                        onPress={generarRetiroQR} 
                        color="#6A0DAD" 
                    />
                </View>

                {qrCode && (
                    <View style={styles.qrContainer}>
                        <QRCode
                            value={qrCode}
                            size={250}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
        paddingBottom: 40, 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    saldo: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    buttonContainer: {
        marginVertical: 10,
    },
    qrContainer: {
        alignItems: 'center',
        marginTop: 30,
    }
});

