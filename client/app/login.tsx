import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import * as SystemUI from 'expo-system-ui';
import axios from 'axios';
import { Link, useRouter } from "expo-router";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const handleLogin = async () => {
        console.log('Username:', username);
        console.log('Password:', password);
        try {
            const response = await axios.post('http://192.168.244.21:3000/api/users/login', {
                username,
                password,
            });
            if (response.status === 200) {
                Alert.alert('Success', 'Login successful');
                router.push('/home');
            } else {
                Alert.alert('Error', 'Invalid username or password');
            }
        } catch (error) {
            Alert.alert('Error', 'Error logging in: ' + (error as any).message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
            <TextInput
                style={styles.input}
                placeholder="Email or Phone Number"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>


            <Text style={styles.prompt}>Don't have an account?</Text>
            <Link href="/createUser" asChild>
                <TouchableOpacity >
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
    button: {
        width: "100%",
        padding: 15,
        backgroundColor: "#046ebf",
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