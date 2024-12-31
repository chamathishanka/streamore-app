import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import * as SystemUI from 'expo-system-ui';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { increment } from '../state/slices/clickSlice';
import PlaylistCard from "@/components/PlaylistCard";
import ArtistCard from '../components/ArtistCard';
import SingleCard from '../components/SingleCard';

const { height, width } = Dimensions.get('window');

export default function Home() {
    interface CardData {
        picture_medium: string;
        fans: number;
        title: string;
        description: string;
    }

    interface ArtistData {
        id: number;
        name: string;
        picture_medium: string;
    }

    interface TrackData {
        id: number;
        title: string;
        artist: {
            name: string;
        };
        album: {
            cover_medium: string;
        };
    }

    const [firstCardData, setFirstCardData] = useState<CardData | null>(null);
    const [secondCardData, setSecondCardData] = useState<CardData | null>(null);
    const [thirdCardData, setThirdCardData] = useState<CardData | null>(null);
    const [fourthCardData, setFourthCardData] = useState<CardData | null>(null);
    const [artists, setArtists] = useState<ArtistData[]>([]);
    const [topSingles, setTopSingles] = useState<TrackData[]>([]);
    const [loading, setLoading] = useState(true); // Loading state
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const clickCount = useSelector((state: RootState) => state.click.count);

    useEffect(() => {
        SystemUI.setBackgroundColorAsync('#0a0a1a');
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            await Promise.all([
                fetchFirstCardData(),
                fetchSecondCardData(),
                fetchThirdCardData(),
                fetchFourthCardData(),
                fetchTopArtists(),
                fetchTopSinglesFromPlaylist()
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false once all data is fetched
        }
    };

    const fetchFirstCardData = async () => {
        try {
            const response = await axios.get('https://api.deezer.com/playlist/6682665064');
            setFirstCardData(response.data);
        } catch (error) {
            console.error('Error fetching first card data:', error);
            Alert.alert('Error', 'Error fetching first card data');
        }
    };

    const fetchSecondCardData = async () => {
        try {
            const response = await axios.get('https://api.deezer.com/playlist/1282495565');
            setSecondCardData(response.data);
        } catch (error) {
            console.error('Error fetching second card data:', error);
            Alert.alert('Error', 'Error fetching second card data');
        }
    };

    const fetchThirdCardData = async () => {
        try {
            const response = await axios.get('https://api.deezer.com/playlist/1282537185');
            setThirdCardData(response.data);
        } catch (error) {
            console.error('Error fetching third card data:', error);
            Alert.alert('Error', 'Error fetching third card data');
        }
    };

    const fetchFourthCardData = async () => {
        try {
            const response = await axios.get('https://api.deezer.com/playlist/6712593324');
            setFourthCardData(response.data);
        } catch (error) {
            console.error('Error fetching fourth card data:', error);
            Alert.alert('Error', 'Error fetching fourth card data');
        }
    };

    const fetchTopArtists = async () => {
        try {
            const response = await axios.get('https://api.deezer.com/chart/0/artists');
            setArtists(response.data.data.slice(0, 10)); // Get the top 10 artists
        } catch (error) {
            console.error('Error fetching top artists:', error);
        }
    };

    const fetchTopSinglesFromPlaylist = async () => {
        try {
            const response = await axios.get('https://api.deezer.com/playlist/3155776842');
            setTopSingles(response.data.tracks.data.slice(0, 10)); // Get the top 10 singles from the playlist
        } catch (error) {
            console.error('Error fetching top singles from playlist:', error);
        }
    };

    const handleCardPress = () => {
        dispatch(increment());
        Alert.alert('Card Pressed', 'You pressed the card!');
        // You can navigate to another screen or perform any other action here
    };

    const handleSeeMorePress = () => {
        router.push('/seeMore');
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
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.heading}>New Releases</Text>
                <React.Fragment>
                    <PlaylistCard data={firstCardData} onPress={handleCardPress} />
                    <PlaylistCard data={secondCardData} onPress={handleCardPress} />
                    <View style={styles.seeMoreContainer}>
                        <TouchableOpacity onPress={handleSeeMorePress}>
                            <Text style={styles.seeMore}>See More {'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>

                <Text style={styles.heading}>Top Artists</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.artistsScrollView}>
                    {artists.map(artist => (
                        <ArtistCard key={artist.id} artist={artist} onPress={handleCardPress} />
                    ))}
                </ScrollView>

                <Text style={styles.heading}>On the Rise</Text>
                <React.Fragment>
                    <PlaylistCard data={thirdCardData} onPress={handleCardPress} />
                    <PlaylistCard data={fourthCardData} onPress={handleCardPress} />
                    <View style={styles.seeMoreContainer}>
                        <TouchableOpacity onPress={handleSeeMorePress}>
                            <Text style={styles.seeMore}>See More {'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>

                <Text style={styles.heading}>Top Singles</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.singlesScrollView}>
                    {topSingles.map(single => (
                        <SingleCard key={single.id} single={single} onPress={handleCardPress} />
                    ))}
                </ScrollView>
            </ScrollView>
            <TouchableOpacity style={styles.floatingButton} onPress={() => Alert.alert('Click Count', `Items clicked ${clickCount} times`)}>
                <Text style={styles.floatingButtonText}>{clickCount}</Text>
            </TouchableOpacity>
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
        alignSelf: "flex-start",
    },
    subHeading: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        alignSelf: "flex-end",
    },
    scrollView: {
        alignItems: "center",
    },
    seeMoreContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
        paddingRight: 10,
    },
    seeMore: {
        color: "#8df807",
        fontSize: 16,
        marginBottom: 10,
    },
    artistsScrollView: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    singlesScrollView: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#8df807',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});