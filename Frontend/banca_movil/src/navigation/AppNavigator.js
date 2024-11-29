import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UserList from '../components/UserList.js';
import UserForm from '../components/UserForm.js';
import UserSearch from '../components/UserSearch.js';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="UserList">
                <Stack.Screen name="UserList" component={UserList} options={{ title: 'Lista de Usuarios' }} />
                <Stack.Screen name="UserForm" component={UserForm} options={{ title: 'Crear Usuario' }} />
                <Stack.Screen name="UserSearch" component={UserSearch} options={{ title: 'Buscar Usuario' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
