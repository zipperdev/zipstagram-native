import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

const LoginLink = styled.Text`
    color: ${props => props.theme.accent};
    font-weight: 600;
    padding: 8px 10px;
    margin-top: 10px;
    font-size: 15px;
    text-align: center;
`;

export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogin = () => navigation.navigate("Login");
    return <AuthLayout>
        <AuthButton disabled={false} onPress={goToCreateAccount} text="Create Account" />
        <TouchableOpacity onPress={goToLogin}>
            <LoginLink>Log In</LoginLink>
        </TouchableOpacity>
    </AuthLayout>;
};