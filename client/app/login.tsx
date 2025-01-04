import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import axios from 'axios';
import { Link, useRouter } from "expo-router";
import { useDispatch } from 'react-redux';
import { setUsername } from '../state/slices/userSlice';

export default function Login() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [identifierError, setIdentifierError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        setIdentifierError('');
        setPasswordError('');

        if (!identifier) {
            setIdentifierError('Please enter your username or email');
        }
        if (!password) {
            setPasswordError('Please enter your password');
        }
        if (!identifier || !password) {
            return;
        }

        try {
            const response = await axios.post('http://192.168.135.21:3000/api/users/login', {
                identifier,
                password,
            });
            if (response.status === 200) {
                dispatch(setUsername(identifier));
                router.push('/home');
            } else {
                setIdentifierError('Invalid username or email');
                setPasswordError('Invalid password');
            }
        } catch (error) {
            setIdentifierError('Invalid username or email');
            setPasswordError('Invalid password');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <TextInput
                style={styles.input}
                placeholder="Username or Email"
                placeholderTextColor="#888"
                value={identifier}
                onChangeText={setIdentifier}
            />
            {identifierError ? <Text style={styles.errorText}>{identifierError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.prompt}>Don't have an account?</Text>
            <Link href="/createUser" asChild>
                <TouchableOpacity>
                    <Text style={styles.link}>Create a new user account</Text>
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a0a1a",
        padding: 20,
    },
    title: {
        color: "white",
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: "#1a1a1a",
        color: "white",
        borderRadius: 8,
    },
    errorText: {
        color: "red",
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    button: {
        width: "100%",
        padding: 15,
        backgroundColor: "#8df807",
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "black",
        fontSize: 18,
    },
    prompt: {
        color: "white",
        marginTop: 20,
    },
    link: {
        color: "#1a73e8",
        marginTop: 10,
    },
});