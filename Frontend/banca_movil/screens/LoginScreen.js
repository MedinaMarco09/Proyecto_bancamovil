import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'http://172.17.182.42:3000';

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
            <Image
                source={require('../src/images/Logo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Mobile Banking</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 108,
        height: 70,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        padding: 10,
        marginBottom: 15,
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
        elevation: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'normal',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    registerText: {
        color: '#07f',
        marginTop: 20,
        textAlign: 'center',
    },
});