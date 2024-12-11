import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'http://192.168.1.159:3000';

export default function MakeTransferScreen({ navigation }) {
    const [destinatarioId, setDestinatarioId] = useState('');
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleTransfer = async () => {
        if (!destinatarioId || !monto || !descripcion) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(
                `${BASE_URL}/transferencias`,
                {
                    remitente_id: user.id,
                    destinatario_id: destinatarioId,
                    monto: parseFloat(monto),
                    descripcion,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.status === 200) {
                Alert.alert("Éxito", "Transferencia realizada con éxito.");
                navigation.navigate("TransactionHistory");
            } else {
                Alert.alert("Error", response.data.message || "Error en la transferencia.");
            }
        } catch (error) {
            Alert.alert("Error", "Error de conexión al realizar la transferencia.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hacer Transferencia</Text>
            <TextInput
                style={styles.input}
                placeholder="ID del destinatario"
                value={destinatarioId}
                onChangeText={setDestinatarioId}
                keyboardType="numeric"
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
            <Button title="Transferir" onPress={handleTransfer} />
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
});