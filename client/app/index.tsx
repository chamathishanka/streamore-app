import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet, SafeAreaView, Animated } from "react-native";
import * as SystemUI from 'expo-system-ui';
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#0a0a1a');
    Animated.sequence([
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim1, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
    ]).start(() => {
      router.push('/login');
    });
  }, [fadeAnim1, fadeAnim2, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Animated.View style={[styles.animatedView, { opacity: fadeAnim1 }]}>
          <Text style={styles.subtitle}>
            <Text style={styles.strea}>Strem</Text>
            <Text style={styles.more}> + More</Text>
          </Text>
        </Animated.View>
        <Animated.View style={[styles.animatedView, { opacity: fadeAnim2 }]}>
          <Text style={styles.title}>
            <Text style={styles.strea}>Strea</Text>
            <Text style={styles.more}>More</Text>
          </Text>
        </Animated.View>
      </View>
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
  textContainer: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    marginBottom: 120,
  },
  animatedView: {
    position: "absolute",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
  },
  strea: {
    color: "white",
  },
  more: {
    color: "#8df807",
  },
});