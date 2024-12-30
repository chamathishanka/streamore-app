import React, { useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Player() {


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>
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