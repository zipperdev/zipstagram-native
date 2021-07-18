import React, { useState } from "react";
import { AppearanceProvider } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import LoggedOutNav from "./navigators/LoggedOutNav";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import { darkTheme, lightTheme } from "./styles";
import { light } from "./shared";
import LoggedInNav from "./navigators/LoggedInNav";

export default function App() {
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const preloadAssets = () => {
        const fontsToLoad = [Ionicons.font];
        const fontPromises = fontsToLoad.map(font => Font.loadAsync(font));
        const imagesToLoad = [
            require("./assets/logo_dark.png"),
            require("./assets/logo_light.png")
        ];
        const imagePromises = imagesToLoad.map(image => Asset.loadAsync(image));
        return Promise.all([
            ...fontPromises,
            ...imagePromises
        ]);
    };
    const preload = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            isLoggedInVar(true);
            tokenVar(token);
        };
        return preloadAssets;
    };
    if (loading) {
        return <AppLoading
            startAsync={preload}
            onError={console.warn}
            onFinish={() => setLoading(false)}
        />;
    };
    return <ApolloProvider client={client}>
        <AppearanceProvider>
            <ThemeProvider theme={light ? lightTheme : darkTheme}>
                <NavigationContainer>
                    {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
                </NavigationContainer>
            </ThemeProvider>
        </AppearanceProvider>
    </ApolloProvider>;
}