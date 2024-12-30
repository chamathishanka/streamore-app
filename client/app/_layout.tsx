import { Stack } from "expo-router";
import React from "react";
import { StatusBar, Text } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor='#0a0a1a' barStyle="light-content" />
      <Stack>
        <Stack.Screen name="index"
          options={{
            headerTitle: "StreaMore",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0a0a1a" },
            headerLeft: () => null,
          }} />

        <Stack.Screen name="login"
          options={{
            headerTitle: "StreaMore",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0a0a1a" },
            headerLeft: () => <></>,
          }} />

        <Stack.Screen name="createUser"
          options={{
            headerTitle: "",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0a0a1a" },
            headerRight: () => (
              <Text style={{ color: 'white', marginRight: 10 }}>Create Account</Text>
            ),
          }} />

        <Stack.Screen name="home"
          options={{
            headerTitle: "StreaMore",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0a0a1a" },
            headerLeft: () => <></>,
          }} />

        <Stack.Screen name="player"
          options={{
            headerTitle: "Music Player",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0a0a1a" },
          }} />
      </Stack>


    </>
  );
}