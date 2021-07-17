import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import { light } from "../../shared";

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.bgColor};
    padding: 0 40px;
`;

const Logo = styled.Image`
    max-width: 60%;
    height: 200px;
    margin: 0 auto;
`;

export default function Welcome({ children }) {
    const diemissKeyboard = () => {
        Keyboard.dismiss();
    };
    return <TouchableWithoutFeedback style={{ flex: 1 }} onPress={diemissKeyboard} disabled={Platform.OS === "web"}>
        <Container>
            <KeyboardAvoidingView style={{ width: "100%" }} behavior="position" keyboardVerticalOffset={Platform.OS === "ios" ? 50 : -100}>
                <Logo resizeMode="center" source={light ? require("../../assets/logo_dark.png") : require("../../assets/logo_light.png")} />
                {children}
            </KeyboardAvoidingView>
        </Container>
    </TouchableWithoutFeedback>;
};