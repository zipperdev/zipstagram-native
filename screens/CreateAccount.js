import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
    const { register, handleSubmit, setValue } = useForm();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailAddressRef = useRef();
    const passwordRef = useRef();
    const passwordConfrimRef = useRef();

    const onNext = element => {
        element?.current?.focus();
    };
    const onValid = data => {
        console.log(data);
    };
    useEffect(() => {
        register("firstName");
        register("lastName");
        register("username");
        register("email");
        register("password");
        register("passwordConfrim");
    }, [register]);
    return <AuthLayout>
        <TextInput autoFocus placeholder="First Name" returnKeyType="next" onSubmitEditing={() => onNext(lastNameRef)} onChangeText={text => setValue("firstName", text)} />
        <TextInput ref={lastNameRef} placeholder="Last Name" returnKeyType="next" onSubmitEditing={() => onNext(usernameRef)} onChangeText={text => setValue("lastName", text)} />
        <TextInput autoCapitalize="none" ref={usernameRef} placeholder="Username" returnKeyType="next" onSubmitEditing={() => onNext(emailAddressRef)} onChangeText={text => setValue("username", text)} />
        <TextInput autoCapitalize="none" ref={emailAddressRef} placeholder="Email Address" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => onNext(passwordRef)} onChangeText={text => setValue("email", text)} />
        <TextInput autoCapitalize="none" ref={passwordRef} placeholder="Password" secureTextEntry returnKeyType="next" onSubmitEditing={() => onNext(passwordConfrimRef)} onChangeText={text => setValue("password", text)} />
        <TextInput autoCapitalize="none" ref={passwordConfrimRef} placeholder="Password Confrim" secureTextEntry returnKeyType="done" onSubmitEditing={handleSubmit(onValid)} onChangeText={text => setValue("passwordConfrim", text)} />
        <AuthButton disabled={true} onPress={handleSubmit(onValid)} text="Create Account" />
    </AuthLayout>;
};