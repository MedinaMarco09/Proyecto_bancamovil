import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const BASE_URL = 'http://localhost:3000';

export default function LoginScreen() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status === 200 && data.users.length > 0) {
        const user = data.users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          Alert.alert('Éxito', `Bienvenido, ${user.nombre}!`);
        } else {
          Alert.alert('Error', 'Contraseña incorrecta.');
        }
      } else {
        Alert.alert('Error', 'Usuario no encontrado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un problema al iniciar sesión.');
    }
  };

  return (
<View style={styles.container}>
      {!showForm ? (
        <>
          <Text style={styles.text}>Bienvenido a la pantalla de Login</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Iniciar sesión"
              color="#0E6A7F"
              onPress={() => setShowForm(true)} 
            />
          </View>  
        </>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.text}>Formulario de Inicio de Sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          <Button
            title="Enviar"
            color="#000"
            onPress={() => alert('Inicio de sesión enviado')}
          />
          <Button
            title="Cancelar"
            color="red"
            onPress={() => setShowForm(false)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    paddingTop: 64,
    paddingBottom: 80,
  },
  buttonContainer:{
    paddingTop: 100,
  },
  input: {
    padding:14,
    margin: 2,
    backgroundColor: "#1238",
    borderRadius: 12,
  }
});

// border-radius: 40px;
// border: 1px solid rgba(119, 129, 233, 0.00);
// background: #0E6A7F;
// box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);