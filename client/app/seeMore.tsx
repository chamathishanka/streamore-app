import React, { useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as SystemUI from 'expo-system-ui';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default function SeeMore() {
    useEffect(() => {
        SystemUI.setBackgroundColorAsync('#0a0a1a');
    }, []);

    const handleCardPress = () => {
        Alert.alert('Card Pressed', 'You pressed the card!');
        // You can navigate to another screen or perform any other action here
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>New Releases</Text>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {[...Array(10)].map((_, index) => (
                    <TouchableOpacity key={index} style={styles.card} onPress={handleCardPress}>
                        <View style={styles.cardStatus}>
                            <Text style={styles.cardStatusText}>Status</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/150' }}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Card Title {index + 1}</Text>
                            <Text style={styles.cardDescription}>This is a description of the card. It provides more details about the content.</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#0a0a1a",
        padding: 20,
    },
    heading: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    scrollView: {
        alignItems: "center",
    },
    card: {
        width: width * 0.90, // Adjust the width as needed
        height: 120, // Adjust the height as needed
        backgroundColor: "#2e2e2e", // Greyish background color
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        position: 'relative', // Add relative positioning to the card
    },
    cardImage: {
        width: 120,
        height: 120,
        borderRadius: 5,
        margin: 0,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        color: "white", // White text color for the title
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 10,
    },
    cardDescription: {
        color: "#888", // Grey text color for the description
        fontSize: 14,
        marginHorizontal: 10,
    },
    cardStatus: {
        backgroundColor: "#8df807",
        borderRadius: 8,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', // Position the status tag absolutely
        top: 10, // Adjust the top position as needed
        right: 10, // Adjust the right position as needed
    },
    cardStatusText: {
        color: "black",
        fontSize: 12,
    },
});