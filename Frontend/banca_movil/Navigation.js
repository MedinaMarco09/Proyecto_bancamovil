import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import TransferScreen from "./screens/TransferScreen";
import TransactionHistoryScreen from "./screens/TransactionHistoryScreen";
import QRCodeScannerScreen from "./screens/QRCodeScannerScreen";
import MakeTransferScreen from "./screens/MakeTransferScreen.js"; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack para manejar Login y Dashboard
function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Transfer" component={TransferScreen} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
            <Stack.Screen name="MakeTransfer" component={MakeTransferScreen} /> 
        </Stack.Navigator>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
            <Tab.Screen name="Register" component={RegisterScreen} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}
