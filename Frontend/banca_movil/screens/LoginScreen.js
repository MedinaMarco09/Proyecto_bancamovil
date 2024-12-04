import React, { useState } from "react";
import { TextInput, Button, Text, View, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'http://10.0.2.2:3000';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            const { token } = response.data;

            if (token) {
                await AsyncStorage.setItem('token', token);
                navigation.navigate('Dashboard'); // Navegar al Dashboard
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Ocurrió un error. Por favor, intenta de nuevo.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Inicia sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button title="Iniciar sesión" onPress={handleLogin} color="#0E6A7F" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});


// border-radius: 40px;
// border: 1px solid rgba(119, 129, 233, 0.00);
// background: #0E6A7F;
// box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);