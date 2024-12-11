import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation(); // Hook para acceder a la navegación

  return (
    <View style={styles.container}>
      <Image
        source={require('../src/images/Logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Mobile Banking</Text>
      <Text style={styles.text2}>Mobile Banking for your security</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={() => navigation.navigate('Auth', { screen: 'Login' })} // Navegar a Login
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={() => navigation.navigate('Register')} // Navegar a Register
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 108,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text2: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0E6A7F',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 10,
  },
  loginButton: {
    backgroundColor: '#0E6A7F',
  },
  registerButton: {
    backgroundColor: '#07f',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
  },
});