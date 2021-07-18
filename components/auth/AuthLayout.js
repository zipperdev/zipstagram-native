import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
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

function AuthLayout({ children }) {
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return <TouchableWithoutFeedback style={{ height: "100%" }} onPress={dismissKeyboard} disabled={Platform.OS === "web"}>
        <Container>
            <KeyboardAvoidingView style={{ width: "100%" }} behavior={Platform.OS === "ios" ? "position" : "padding"} keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 10}>
                <Logo resizeMode="center" source={light ? require("../../assets/logo_dark.png") : require("../../assets/logo_light.png")} />
                {children}
            </KeyboardAvoidingView>
        </Container>
    </TouchableWithoutFeedback>;
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthLayout;