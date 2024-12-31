import { Stack } from "expo-router";
import React from "react";
import { StatusBar, Text } from "react-native";
import { Provider } from 'react-redux';
import store from '../state/store'; // Adjust the import path as needed

export default function RootLayout() {
  const commonHeaderOptions = {
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#0a0a1a" },
  };

  return (
    <Provider store={store}>
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
              headerTitle: " ",
              ...commonHeaderOptions,
            }} />
          <Stack.Screen name="songList"
            options={{
              headerTitle: " ",
              ...commonHeaderOptions,
            }} />
        </Stack>
      </>
    </Provider>
  );
}