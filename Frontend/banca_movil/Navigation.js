import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import StackScreen from "./screens/StackScreen"

const Tab = createBottomTabNavigator();

function MyTabs() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Login" component={LoginScreen}/>
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