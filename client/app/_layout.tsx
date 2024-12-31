import { Stack } from "expo-router";
import React from "react";
import { StatusBar, Text } from "react-native";

export default function RootLayout() {
  const commonHeaderOptions = {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#0a0a1a" },
  };

  return (
    <>
      <StatusBar backgroundColor='#0a0a1a' barStyle="light-content" />
      <Stack>
        <Stack.Screen name="index"
          options={{
            headerTitle: "StreaMore",
            ...commonHeaderOptions,
            headerLeft: () => null,
          }} />

        <Stack.Screen name="login"
          options={{
            headerTitle: "StreaMore",
            ...commonHeaderOptions,
            headerLeft: () => <></>,
          }} />

        <Stack.Screen name="createUser"
          options={{
            headerTitle: "",
            ...commonHeaderOptions,
            headerRight: () => (
              <Text style={{ color: 'white', marginRight: 10 }}>Create Account</Text>
            ),
          }} />

        <Stack.Screen name="home"
          options={{
            headerTitle: "StreaMore",
            ...commonHeaderOptions,
            headerLeft: () => <></>,
          }} />

        <Stack.Screen name="player"
          options={{
            headerTitle: "Music Player",
            ...commonHeaderOptions,
          }} />

        <Stack.Screen name="seeMore"
          options={{
            headerTitle: "Music Player",
            ...commonHeaderOptions,
          }} />
      </Stack>
    </>
  );
}