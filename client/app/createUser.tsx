// filepath: /c:/Users/TUF/Desktop/Projects/React Native/streamore/client/app/createUser.tsx
import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import axios from 'axios';

export default function CreateUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [dobError, setDobError] = useState('');

    const handleCreateAccount = async () => {
        setEmailError('');
        setPasswordError('');
        setNameError('');
        setUsernameError('');
        setDobError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setEmailError('Please enter your email');
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
        }

        if (!password) {
            setPasswordError('Please enter your password');
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        }

        if (!name) {
            setNameError('Please enter your name');
        }

        if (!username) {
            setUsernameError('Please enter your username');
        }

        const yearNum = parseInt(year, 10);
        const monthNum = parseInt(month, 10);
        const dayNum = parseInt(day, 10);

        const daysInMonth = (month: number, year: number) => {
            return new Date(year, month, 0).getDate();
        };

        if (!year || !month || !day) {
            setDobError('Please enter your date of birth');
        } else if (yearNum < 1900 || yearNum > 5000) {
            setDobError('Please enter a valid year');
        } else if (monthNum < 1 || monthNum > 12) {
            setDobError('Please enter a valid month');
        } else if (dayNum < 1 || dayNum > daysInMonth(monthNum, yearNum)) {
            setDobError('Please enter a valid day');
        }

        if (!email || !password || !name || !username || !year || !month || !day || password.length < 8 || !emailRegex.test(email) || yearNum < 1900 || yearNum > 5000 || monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > daysInMonth(monthNum, yearNum)) {
            return;
        }

        try {
            const response = await axios.post('http://192.168.135.21:3000/api/users/create', {
                email,
                password,
                name,
                username,
                dob: `${year}-${month}-${day}`, // Format date as YYYY-MM-DD
            });
            if (response.status === 201) {
                // Handle successful user creation
                setEmail('');
                setPassword('');
                setName('');
                setUsername('');
                setYear('');
                setMonth('');
                setDay('');
                // Optionally, navigate to another screen or show a success message
            } else {
                // Handle server-side validation errors
                const errors = response.data.errors;
                if (errors.email) setEmailError(errors.email);
                if (errors.password) setPasswordError(errors.password);
                if (errors.name) setNameError(errors.name);
                if (errors.username) setUsernameError(errors.username);
                if (errors.dob) setDobError(errors.dob);
            }
        } catch (error) {
            // Handle network or other errors
            const errorMessage = (error as any).response?.data?.message || 'An error occurred. Please try again.';
            if (errorMessage.includes('email')) setEmailError(errorMessage);
            if (errorMessage.includes('password')) setPasswordError(errorMessage);
            if (errorMessage.includes('name')) setNameError(errorMessage);
            if (errorMessage.includes('username')) setUsernameError(errorMessage);
            if (errorMessage.includes('dob')) setDobError(errorMessage);
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
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
            />
            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.dobContainer}>
                <TextInput
                    style={[styles.input, styles.dobInput]}
                    placeholder="YYYY"
                    placeholderTextColor="#888"
                    value={year}
                    onChangeText={setYear}
                    keyboardType="numeric"
                    maxLength={4}
                />
                <TextInput
                    style={[styles.input, styles.dobInput]}
                    placeholder="MM"
                    placeholderTextColor="#888"
                    value={month}
                    onChangeText={setMonth}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <TextInput
                    style={[styles.input, styles.dobInput]}
                    placeholder="DD"
                    placeholderTextColor="#888"
                    value={day}
                    onChangeText={setDay}
                    keyboardType="numeric"
                    maxLength={2}
                />
            </View>
            {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
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
    label: {
        color: "#888",
        alignSelf: "flex-start",
        marginBottom: 5,
    },
    dobContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    dobInput: {
        flex: 1,
        marginHorizontal: 5,
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
});