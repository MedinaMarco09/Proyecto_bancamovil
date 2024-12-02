import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const BASE_URL = 'http://10.0.2.2:3000';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Validar campos vacíos
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Validar contraseñas coincidentes
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: name, email, password }),
      });

      const data = await response.json();

      if (data.status === 200) {
        Alert.alert('Éxito', 'Usuario registrado exitosamente.');
      } else {
        Alert.alert('Error', data.message || 'Ocurrió un error al registrar el usuario.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Registrar" color="#0E6A7F" onPress={handleRegister} />
      </View>
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
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
});
