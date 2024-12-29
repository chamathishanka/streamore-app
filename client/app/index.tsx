import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as SystemUI from 'expo-system-ui';
import { Link } from "expo-router";


export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#0a0a1a');
  }, []);

  const handleLogin = () => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
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
      <Link href="/createUser" style={styles.link}>
        Create a new user account
      </Link>
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
  prompt: {
    color: "white",
    marginTop: 20,
  },
  link: {
    color: "#1a73e8",
    marginTop: 10,
  },
});