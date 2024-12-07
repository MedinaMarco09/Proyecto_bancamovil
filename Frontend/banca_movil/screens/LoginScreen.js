import React, { useState } from "react";
import { TextInput, Button, Text, View, StyleSheet, Alert, Image, TouchableOpacity } from "react-native";
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
            <Image
                source={require('../src/images/Logo.png')}
                style={styles.logo}
            />
            <Text style={styles.text}>Mobile Banking</Text>
            <Text style={styles.text2}>Welcome to Mobile Banking</Text>   
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.buttonRegister, styles.registerButton, { flexDirection: 'row', alignItems: 'center' }]} // Alineación horizontal
                    onPress={() => navigation.navigate('Register')}>
                    <Text>Don't have an account? </Text>
                    <Text style={styles.buttonText2}>Sing Up</Text>
                </TouchableOpacity>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    logo: {
        width: 108,
        height: 70,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 70,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    text2: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        padding: 10,
        marginLeft: 50,
        marginRight: 60,
        marginBottom: 15,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#0E6A7F',
        padding: 14,
        borderRadius: 20,
        alignItems: 'center',
        margin: 40,
        elevation: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'normal',
    },
    buttonText2: {
        color: '#07f',
        fontSize: 16,
        fontWeight:'normal',
        textDecorationLine: 'underline',
    },
    registerButton:{
        backgroundColor: '223',
        flexDirection: 'row', 
        alignItems: 'start',
        marginLeft: 50,
    }
});


// border-radius: 40px;
// border: 1px solid rgba(119, 129, 233, 0.00);
// background: #0E6A7F;
// box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);