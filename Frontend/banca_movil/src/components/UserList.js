import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { API_URL } from '../utils/apiConfig';

export default function UserList({ navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/users`);
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Crear Usuario" onPress={() => navigation.navigate('UserForm')} />
            <Button title="Buscar Usuario" onPress={() => navigation.navigate('UserSearch')} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <Text>Nombre: {item.nombre}</Text>
                            <Text>Email: {item.email}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    userCard: { padding: 10, marginVertical: 5, backgroundColor: '#f0f0f0', borderRadius: 5 },
});

