import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import { light } from "../shared";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
    return <Stack.Navigator initialRouteName="Welcome" screenOptions={{
        headerBackTitleVisible: false, 
        headerTitle: false, 
        headerTransparent: true, 
        headerTintColor: light ? "black" : "white"
    }}>
        <Stack.Screen name="Welcome" options={{
            headerShown: false
        }} component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>;
};