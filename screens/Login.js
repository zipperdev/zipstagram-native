import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";

export default function Login() {
    const { register, handleSubmit, setValue } = useForm();
    const passwordRef = useRef();

    const onNext = element => {
        element?.current?.focus();
    };
    const onValid = data => {
        console.log("ASDf");
    };
    useEffect(() => {
        register("email");
        register("password");
    }, [register]);
    return <AuthLayout>
        <TextInput autoCapitalize="none" placeholder="Email Address" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => onNext(passwordRef)} onChangeText={text => setValue("email", text)} />
        <TextInput ref={passwordRef} autoCapitalize="none" placeholder="Password" secureTextEntry returnKeyType="done" onSubmitEditing={handleSubmit(onValid)} onChangeText={text => setValue("password", text)} />
        <AuthButton disabled={true} onPress={handleSubmit(onValid)} text="Log In" />
    </AuthLayout>;
};