import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import * as SystemUI from 'expo-system-ui';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { increment } from '../state/slices/clickSlice';
import { selectPlaylist } from '../state/slices/playlistSlice';
import { selectArtist } from '../state/slices/artistSlice';
import { selectSong } from '../state/slices/songSlice';
import PlaylistCard from "@/components/PlaylistCard";
import ArtistCard from "@/components/ArtistCard";
import SongItem from "@/components/SongItem";
import SearchBar from "@/components/SearchBar";
import SingleCard from "@/components/SingleCard";
import FloatingButton from "@/components/FloatingButton";

const { height, width } = Dimensions.get('window');

export default function Home() {
    interface CardData {
        id: number;
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
        preview: string;
    }

    const [firstCardData, setFirstCardData] = useState<CardData | null>(null);
    const [secondCardData, setSecondCardData] = useState<CardData | null>(null);
    const [thirdCardData, setThirdCardData] = useState<CardData | null>(null);
    const [fourthCardData, setFourthCardData] = useState<CardData | null>(null);
    const [artists, setArtists] = useState<ArtistData[]>([]);
    const [topSingles, setTopSingles] = useState<TrackData[]>([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TrackData[]>([]);
    const router = useRouter();
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

    const handleCardPress = (playlistId: number) => {
        dispatch(selectPlaylist(playlistId));
        dispatch(increment());
        router.push('/songList');
    };

    const handleArtistPress = (artistId: number) => {
        dispatch(selectArtist(artistId));
        dispatch(increment());
        router.push('/songList');
    };

    const handleSinglePress = (single: TrackData) => {
        dispatch(selectSong(single.id));
        dispatch(increment());
        router.push('/player');
    };

    const handleSeeMorePress = () => {
        router.push('/seeMore');
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') return;

        setLoading(true);
        try {
            const response = await axios.get(`https://api.deezer.com/search?q=${searchQuery}`);
            const songData = response.data.data;
            setSearchResults(songData);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlayPause = async (song: TrackData) => {
        dispatch(selectSong(song.id));
        router.push('/player');
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
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSearch}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                {searchResults.length > 0 ? (
                    <>
                        <Text style={styles.heading}>Search Results</Text>
                        {searchResults.map(single => (
                            <SongItem
                                key={single.id}
                                song={single}
                                isPlaying={false}
                                onPlayPause={() => handlePlayPause(single)}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <Text style={styles.heading}>New Releases</Text>
                        <React.Fragment>
                            <PlaylistCard data={firstCardData} onPress={() => firstCardData?.id && handleCardPress(firstCardData.id)} />
                            <PlaylistCard data={secondCardData} onPress={() => secondCardData?.id && handleCardPress(secondCardData.id)} />
                            <View style={styles.seeMoreContainer}>
                                <TouchableOpacity onPress={handleSeeMorePress}>
                                    <Text style={styles.seeMore}>See More {'>'}</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>

                        <Text style={styles.heading}>Top Artists</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.artistsScrollView}>
                            {artists.map(artist => (
                                <ArtistCard key={artist.id} artist={artist} onPress={() => handleArtistPress(artist.id)} />
                            ))}
                        </ScrollView>

                        <Text style={styles.heading}>On the Rise</Text>
                        <React.Fragment>
                            <PlaylistCard data={thirdCardData} onPress={() => thirdCardData?.id && handleCardPress(thirdCardData.id)} />
                            <PlaylistCard data={fourthCardData} onPress={() => fourthCardData?.id && handleCardPress(fourthCardData.id)} />
                            <View style={styles.seeMoreContainer}>
                                <TouchableOpacity onPress={handleSeeMorePress}>
                                    <Text style={styles.seeMore}>See More {'>'}</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>

                        <Text style={styles.heading}>Top Singles</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.singlesScrollView}>
                            {topSingles.map(single => (
                                <SingleCard key={single.id} single={single} onPress={() => handleSinglePress(single)} />
                            ))}
                        </ScrollView>
                    </>
                )}
            </ScrollView>
            <FloatingButton onPress={() => Alert.alert('Click Count', `Items clicked ${clickCount} times`)} />
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
        marginBottom: 20,
    },
    singlesScrollView: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
});