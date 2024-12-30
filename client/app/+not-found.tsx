import { Link } from "expo-router";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

export default function Index() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>404 Not Found</Text>
            <Link href={"/"} style={styles.button}> Home </Link>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a0a1a",
    },
    text: {
        color: "white",
    },
    button: {
        color: "white",
        fontSize: 20,
    },
});
