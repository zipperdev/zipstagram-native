import React from "react";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
    background-color: ${props => props.theme.accent};
    margin-top: 20px;
    padding: 12px;
    border-radius: 5px;
    width: 100%;
    opacity: ${props => props.disabled ? "0.5" : "1"};
`;

const ButtonText = styled.Text`
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
`;

export default function AuthButton({ onPress, disabled, text }) {
    return <Button disabled={disabled} onPress={onPress}>
        <ButtonText>{text}</ButtonText>
    </Button>;
};