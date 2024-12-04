import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'http://10.0.2.2:3000';

export default function DashboardScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

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

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
                <Button title="Volver al Login" onPress={() => navigation.navigate('Login')} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>Dashboard</Text>
                    <Text style={styles.text}>Nombre: {user.nombre}</Text>
                    <Text style={styles.text}>Correo: {user.email}</Text>
                    <Text style={styles.text}>Saldo: ${user.saldo}</Text>
                </>
            ) : (
                <Text>Cargando...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 20,
    },
});
