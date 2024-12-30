import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import * as SystemUI from 'expo-system-ui';
import { Link } from "expo-router";

export default function Index() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#0a0a1a');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enter</Text>
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