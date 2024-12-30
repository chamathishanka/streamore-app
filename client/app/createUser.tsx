import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import axios from 'axios';

export default function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');

    const handleCreateAccount = async () => {

        // Log the data to check if it's being captured correctly
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Name:', name);
        console.log('DOB:', dob);
        try {
            const response = await axios.post('http://192.168.244.21:3000/api/users/create', {
                username,
                password,
                name,
                dob,
            });
            if (response.status === 201) {
                Alert.alert('Success', 'User created successfully');
            }
        } catch (error) {
            Alert.alert('Error', 'Error creating user: ' + (error as any).message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Let's Connect with Us!</Text>
            <Text style={styles.subtitle}>Tune in to your favorite music and more.</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                placeholderTextColor="#888"
                value={dob}
                onChangeText={setDob}
            />
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
            <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
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
        marginBottom: 10,
    },
    subtitle: {
        color: "#888",
        fontSize: 12,
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
        backgroundColor: "#8df807",
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "black",
        fontSize: 18,
    },
});