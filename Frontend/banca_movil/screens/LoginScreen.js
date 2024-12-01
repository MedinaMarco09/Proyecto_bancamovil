import React from 'react';
import { Button } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a la pantalla de Login</Text>
      <Button 
      label = "Login"
      title='Iniciar sesion'
      color = "#000"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});