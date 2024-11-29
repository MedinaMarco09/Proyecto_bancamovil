import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { API_URL } from '../utils/apiConfig';

export default function UserForm({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleCreateUser = async () => {
        if (!nombre || !email || !password) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Ingresa un correo válido');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.status === 200) {
                Alert.alert('Éxito', 'Usuario creado');
                navigation.navigate('UserList');
            } else {
                Alert.alert('Error', data.message || 'No se pudo crear el usuario');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Crear Usuario" onPress={handleCreateUser} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
});

