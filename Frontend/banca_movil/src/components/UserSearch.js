import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';

export default function UserSearch() {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);

    const handleSearchUser = async () => {
        if (!email) {
            Alert.alert('Error', 'El email es obligatorio');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/users/${email}`);
            const data = await response.json();

            if (data.status === 200 && data.users.length > 0) {
                setUser(data.users[0]);
            } else {
                Alert.alert('Error', 'Usuario no encontrado');
                setUser(null);
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <Button title="Buscar Usuario" onPress={handleSearchUser} />
            {user && (
                <View style={styles.result}>
                    <Text>Nombre: {user.nombre}</Text>
                    <Text>Email: {user.email}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    result: { marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
});
