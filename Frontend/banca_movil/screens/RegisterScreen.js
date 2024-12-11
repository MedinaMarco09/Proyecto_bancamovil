import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';

const BASE_URL = 'http://192.168.1.159:3000';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: name, email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

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
      <Image
        source={require('../src/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Mobile Banking</Text>
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
      <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}>
          <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingLeft:70,
    paddingRight:70,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 5,
    borderColor: '#ccc',
    borderRadius: 5,
    marginLeft: 50,
    marginRight: 60,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 90,
    width: '100%',
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
button: {
  backgroundColor: '#0E6A7F',
  padding: 14,
  borderRadius: 20,
  alignItems: 'center',
  marginTop: 45,
  elevation: 10,
  paddingHorizontal:100,
},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'normal',
  
},
});
