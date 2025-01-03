import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import axios from 'axios';
import { Audio } from 'expo-av';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { resetArtist } from '../state/slices/artistSlice';
import { resetPlaylist } from '../state/slices/playlistSlice';
import { setSongList, setCurrentSongIndex } from '../state/slices/songListSlice';
import SongItem from "@/components/SongItem";
import { useNavigation } from '@react-navigation/native';
import FloatingButton from "@/components/FloatingButton";

interface Song {
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

export default function SongList() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const selectedPlaylistId = useSelector((state: RootState) => state.playlist.selectedPlaylistId);
    const selectedArtistId = useSelector((state: RootState) => state.artist.selectedArtistId);
    const [songs, setSongs] = useState<Song[]>([]);
    const [playlistName, setPlaylistName] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [playingSongId, setPlayingSongId] = useState<number | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        if (selectedArtistId) {
            fetchSongsFromArtist();
        }
    }, [selectedArtistId]);

    useEffect(() => {
        if (selectedPlaylistId) {
            fetchSongsFromPlaylist();
        }
    }, [selectedPlaylistId]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            dispatch(resetArtist());
            dispatch(resetPlaylist());
            if (sound) {
                sound.unloadAsync();
            }
        });

        return unsubscribe;
    }, [dispatch, navigation, sound]);

    const fetchSongsFromPlaylist = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.deezer.com/playlist/${selectedPlaylistId}`);
            const songData = response.data.tracks.data;
            setSongs(songData);
            setPlaylistName(response.data.title);
            dispatch(setSongList({ songIds: songData.map((song: Song) => song.id) }));
        } catch (error) {
            console.error('Error fetching songs:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSongsFromArtist = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.deezer.com/artist/${selectedArtistId}/top?limit=25`);
            const songData = response.data.data;
            setSongs(songData);
            setPlaylistName('Top Tracks');
            dispatch(setSongList({ songIds: songData.map((song: Song) => song.id) }));
        } catch (error) {
            console.error('Error fetching songs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlayPause = async (song: Song) => {
        const songIndex = songs.findIndex(s => s.id === song.id);
        dispatch(setCurrentSongIndex(songIndex));

        if (playingSongId === song.id) {
            // Pause the currently playing song
            if (sound) {
                await sound.pauseAsync();
                setPlayingSongId(null);
            }
        } else {
            // Play the selected song
            if (sound) {
                await sound.unloadAsync();
            }
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: song.preview });
            setSound(newSound);
            await newSound.playAsync();
            setPlayingSongId(song.id);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8df807" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.playlistName}>{playlistName}</Text>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SongItem
                        song={item}
                        isPlaying={playingSongId === item.id}
                        onPlayPause={() => handlePlayPause(item)}
                    />
                )}
            />
            <FloatingButton onPress={() => Alert.alert('Click Count', `Items clicked ${useSelector((state: RootState) => state.click.count)} times`)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0a0a1a",
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a0a1a",
    },
    playlistName: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        alignSelf: "center",
    },
});