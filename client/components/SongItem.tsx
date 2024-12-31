import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useRouter } from "expo-router";
import { selectSong } from '../state/slices/songSlice';

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

interface SongItemProps {
    song: Song;
    isPlaying: boolean;
    onPlayPause: (song: Song) => void;
}

const SongItem: React.FC<SongItemProps> = ({ song, isPlaying, onPlayPause }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSongPress = () => {
        dispatch(selectSong(song.id));
        router.push('/player');
    };

    return (
        <View style={styles.songContainer}>
            <TouchableOpacity onPress={handleSongPress}>
                <Image source={{ uri: song.album.cover_medium }} style={styles.coverArt} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSongPress} style={styles.songDetails}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.artistName}>{song.artist.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playPauseButton} onPress={() => onPlayPause(song)}>
                <Icon name={isPlaying ? 'pause' : 'play'} size={15} color="#0a0a1a" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    songContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    coverArt: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    songDetails: {
        flex: 1,
    },
    songTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    artistName: {
        color: "#888",
        fontSize: 14,
    },
    playPauseButton: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default React.memo(SongItem);