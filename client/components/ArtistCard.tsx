import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface ArtistCardProps {
    artist: {
        id: number;
        name: string;
        picture_medium: string;
    };
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
    return (
        <View style={styles.artistContainer}>
            <Image source={{ uri: artist.picture_medium }} style={styles.artistImage} />
            <Text style={styles.artistName}>{artist.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    artistContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 20,
    },
    artistImage: {
        width: 80,
        height: 80,
        borderRadius: 40, // Make the image circular
        marginBottom: 5,
    },
    artistName: {
        color: "white",
        fontSize: 14,
        textAlign: 'center',
    },
});

export default ArtistCard;