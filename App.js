import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { AppearanceProvider } from "react-native-appearance";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles";
import { light } from "./shared";

export default function App() {
    const [loading, setLoading] = useState(true);
    const preload = () => {
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
    if (loading) {
        return <AppLoading
            startAsync={preload}
            onError={console.warn}
            onFinish={() => setLoading(false)}
        />;
    };
    return <AppearanceProvider>
        <ThemeProvider theme={light ? lightTheme : darkTheme}>
            <NavigationContainer>
                <LoggedOutNav />
            </NavigationContainer>
        </ThemeProvider>
    </AppearanceProvider>;
}