import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');

    const handleCreateAccount = () => {
        // Handle create account logic here
        console.log('Contact:', username);
        console.log('Password:', password);
        console.log('Name:', name);
        console.log('DOB:', dob);
    };

    return (
        <View style={styles.container}>
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
        </View>
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