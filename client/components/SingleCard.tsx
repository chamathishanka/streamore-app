import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface SingleCardProps {
    single: {
        id: number;
        title: string;
        artist: {
            name: string;
        };
        album: {
            cover_medium: string;
        };
    };
    onPress: () => void;
}

const SingleCard: React.FC<SingleCardProps> = ({ single, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.singleContainer}>
                <Image source={{ uri: single.album.cover_medium }} style={styles.singleImage} />
                <Text style={styles.singleTitle}>{single.title}</Text>
                <Text style={styles.singleArtist}>{single.artist.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    singleContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 20,
        width: 120, // Square shape
    },
    singleImage: {
        width: 120,
        height: 120,
        borderRadius: 8, // Slightly rounded corners
        marginBottom: 5,
    },
    singleTitle: {
        color: "white",
        fontSize: 14,
        textAlign: 'center',
    },
    singleArtist: {
        color: "#888",
        fontSize: 12,
        textAlign: 'center',
    },
});

export default SingleCard;