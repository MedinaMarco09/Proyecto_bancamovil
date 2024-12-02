import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"

const Tab = createBottomTabNavigator();

function MyTabs() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Login" component={LoginScreen}/>
            <Tab.Screen name="Register" component={RegisterScreen}/>
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}