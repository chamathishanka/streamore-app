import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, Alert, ScrollView, ActivityIndicator } from "react-native";
import * as SystemUI from 'expo-system-ui';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { useRouter } from "expo-router";
import { useDispatch } from 'react-redux';
import { selectPlaylist } from '../state/slices/playlistSlice';
import PlaylistCard from "@/components/PlaylistCard";

const { height, width } = Dimensions.get('window');

interface CardData {
    id: number;
    title: string;
    description: string;
    picture_medium: string;
    fans: number;
}

export default function SeeMore() {
    const [cards, setCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        SystemUI.setBackgroundColorAsync('#0a0a1a');
        fetchCardData();
    }, []);

    const fetchCardData = async () => {
        const apiNumbers = [
            '1996494362',
            '2532117644',
            '12673058961',
            '11081408402',
            '1495242491',
            '10581717182',
            '715215865',
            '1908130662',


        ];

        const urls = apiNumbers.map(number => `https://api.deezer.com/playlist/${number}`);

        try {
            const fetchData = async (url: string) => {
                const response = await axios.get(url);
                return response.data;
            };

            const results = await Promise.all(urls.map(fetchData));
            const cardData = results.map(data => ({
                id: data.id,
                title: data.title,
                picture_medium: data.picture_medium,
                fans: data.fans,
                description: data.description,
            }));
            setCards(cardData);
        } catch (error) {
            console.error('Error fetching card data:', error);
            Alert.alert('Error', 'Error fetching card data');
        } finally {
            setLoading(false);
        }
    };

    const handleCardPress = (playlistId: number) => {
        dispatch(selectPlaylist(playlistId));
        router.push('/songList');
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8df807" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Popular Playlists</Text>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {cards.map((card) => (
                    <PlaylistCard
                        key={card.id}
                        data={card}
                        onPress={() => handleCardPress(card.id)}
                    />
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a0a1a",
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
});