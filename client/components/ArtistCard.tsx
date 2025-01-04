import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ArtistCardProps {
    artist: {
        id: number;
        name: string;
        picture_medium: string;
    };
    onPress: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.artistContainer}>
                <Image source={{ uri: artist.picture_medium }} style={styles.artistImage} />
                <Text style={styles.artistName}>{artist.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    artistContainer: {
        marginRight: 15,
        alignItems: 'center',
    },
    artistImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    artistName: {
        color: 'white',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'center',
    },
});

export default ArtistCard;