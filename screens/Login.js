import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { TextInput, ErrorText, ButtonErrorText } from "../components/auth/AuthShared";
import { logUserIn } from "../apollo";

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            success
            token
            error
        }
    }
`;

export default function Login({ route: { params } }) {
    const { register, handleSubmit, setValue, watch, clearErrors, setError, formState: { errors } } = useForm({
        defaultValues: {
            email: params?.email, 
            password: params?.password
        }
    });
    const [ loginMutation, { loading } ] = useMutation(LOGIN_MUTATION, {
        onCompleted: async data => {
            const { login : { success, token, error } } = data;
            if (!success) {
                return setError("result", {
                    message: error
                });
            } else {
                await logUserIn(token);
            };
        }
    });
    const passwordRef = useRef();

    const onNext = element => {
        element?.current?.focus();
    };
    const onValid = data => {
        if (!loading) {
            loginMutation({
                variables: {
                    email: data.email, 
                    password: data.password
                }
            });
        };
    };
    useEffect(() => {
        register("email", {
            required: "Email address is required.", 
            pattern: {
                value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i, 
                message: "Email address is invalid."
            }
        });
        register("password", {
            required: "Password is required."
        });
    }, [register]);
    return <AuthLayout>
        <TextInput value={watch("email")} autoCapitalize="none" placeholder="Email Address" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => onNext(passwordRef)} onChangeText={text => setValue("email", text)} />
        {errors?.email ? (
            <ErrorText>{errors?.email?.message}</ErrorText>
        ) : null}
        <TextInput value={watch("password")} ref={passwordRef} autoCapitalize="none" placeholder="Password" secureTextEntry returnKeyType="done" onSubmitEditing={handleSubmit(onValid)} onChangeText={text => setValue("password", text)} />
        {errors?.password ? (
            <ErrorText>{errors?.password?.message}</ErrorText>
        ) : null}
        <AuthButton loading={loading} disabled={(!watch("email") || !watch("password")) || loading} onPress={() => {
            clearErrors("result");
            handleSubmit(onValid)();
        }} text="Log In" />
        {errors?.result ? (
            <ButtonErrorText>{errors?.result?.message}</ButtonErrorText>
        ) : null}
    </AuthLayout>;
};