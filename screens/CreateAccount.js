import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { ErrorText, TextInput, ButtonErrorText } from "../components/auth/AuthShared";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            success
            error
        }
    }
`;

export default function CreateAccount({ navigation }) {
    const { register, handleSubmit, setValue, setError, clearErrors, watch, formState: { errors }, getValues } = useForm();
    const [ createAccountMutation, { loading } ] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted: data => {
            const { createAccount : { success, error } } = data;
            const { email, password } = getValues();
            if (!success) {
                return setError("result", {
                    message: error
                });
            } else {
                return navigation.navigate("Login", {
                    email, 
                    password
                });
            };
        }
    });
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailAddressRef = useRef();
    const passwordRef = useRef();
    const passwordConfrimRef = useRef();

    const onNext = element => {
        element?.current?.focus();
    };
    const onValid = data => {
        if (!loading) {
            const {
                firstName, 
                lastName, 
                username, 
                email, 
                password
            } = data;
            createAccountMutation({
                variables: {
                    firstName, 
                    lastName, 
                    username, 
                    email, 
                    password
                }
            });
        };
    };
    useEffect(() => {
        register("firstName", {
            required: "First name is required.", 
            validate: currrentValue => currrentValue ? currrentValue.length < 40 : false
        });
        register("lastName", {
            validate: currentValue => currentValue ? currentValue.length < 40 : true
        });
        register("username", {
            required: "Username is required.", 
            validate: currentValue => currentValue ? currentValue.length < 40 : false
        });
        register("email", {
            required: "Email address is required.", 
            pattern: {
                value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, 
                message: "Email address is invalid."
            }
        });
        register("password", {
            required: "Password is required.", 
            validate: currentValue => currentValue ? currentValue.length >= 8 : false
        });
        register("passwordConfrim", {
            required: "Password confrimation is required.", 
            validate: currrentValue => {
                const password = watch("password");
                return currrentValue === password;
            }
        });
    }, [register]);
    return <AuthLayout>
        <TextInput autoFocus placeholder="First Name" returnKeyType="next" onSubmitEditing={() => onNext(lastNameRef)} onChangeText={text => setValue("firstName", text)} />
        {errors?.firstName ? (
            <ErrorText>{errors?.firstName?.type === "validate" ? "First name must be shorter than 40." : errors?.firstName?.message}</ErrorText>
        ) : null}
        <TextInput ref={lastNameRef} placeholder="Last Name" returnKeyType="next" onSubmitEditing={() => onNext(usernameRef)} onChangeText={text => setValue("lastName", text)} />
        {errors?.lastName ? (
            <ErrorText>{"Last name must be shorter than 40."}</ErrorText>
        ) : null}
        <TextInput autoCapitalize="none" ref={usernameRef} placeholder="Username" returnKeyType="next" onSubmitEditing={() => onNext(emailAddressRef)} onChangeText={text => setValue("username", text)} />
        {errors?.username ? (
            <ErrorText>{errors?.username?.type === "validate" ? "Username must be shorter than 40." : errors?.username?.message}</ErrorText>
        ) : null}
        <TextInput autoCapitalize="none" ref={emailAddressRef} placeholder="Email Address" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => onNext(passwordRef)} onChangeText={text => setValue("email", text)} />
        {errors?.email ? (
            <ErrorText>{errors?.email?.message}</ErrorText>
        ) : null}
        <TextInput autoCapitalize="none" ref={passwordRef} placeholder="Password" secureTextEntry returnKeyType="next" onSubmitEditing={() => onNext(passwordConfrimRef)} onChangeText={text => setValue("password", text)} />
        {errors?.password ? (
            <ErrorText>{errors?.password?.type === "validate" ? "Password must be longger than 7." : errors?.password?.message}</ErrorText>
        ) : null}
        <TextInput autoCapitalize="none" ref={passwordConfrimRef} placeholder="Password Confrim" secureTextEntry returnKeyType="done" onSubmitEditing={handleSubmit(onValid)} onChangeText={text => setValue("passwordConfrim", text)} />
        {errors?.passwordConfrim ? (
            <ErrorText>{errors?.passwordConfrim?.type === "validate" ? "Password confrimation doesn't match." : errors?.passwordConfrim?.message}</ErrorText>
        ) : null}
        <AuthButton loading={loading} disabled={(!watch("firstName") || !watch("username") || !watch("email") || !watch("password") || !watch("passwordConfrim")) || loading} onPress={() => {
            clearErrors("result");
            handleSubmit(onValid)();
        }} text="Create Account" />
        {errors?.result ? (
            <ButtonErrorText>{errors?.result?.message}</ButtonErrorText>
        ) : null}
    </AuthLayout>;
};