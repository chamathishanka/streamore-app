import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const { height, width } = Dimensions.get('window');

interface PlaylistCardProps {
    data: {
        picture_medium: string;
        fans: number;
        title: string;
        description: string;
    } | null;
    onPress: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ data, onPress }) => {
    if (!data) return null;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cardStatus}>
                <Text style={styles.cardStatusText}>{`${(data.fans / 1000).toFixed(1)}K`}</Text>
                <Icon name="heart" size={12} color="black" />
            </View>
            <Image
                source={{ uri: data.picture_medium }}
                style={styles.cardImage}
            />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{data.title}</Text>
                <Text style={styles.cardDescription}>{data.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.90,
        height: 120,
        backgroundColor: "#2e2e2e",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        position: 'relative',
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
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 10,
    },
    cardDescription: {
        color: "#888",
        fontSize: 14,
        marginHorizontal: 10,
    },
    cardStatus: {
        backgroundColor: "#8df807",
        borderRadius: 8,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
    },
    cardStatusText: {
        color: "black",
        fontSize: 12,
        marginRight: 3,
    },
});

export default PlaylistCard;