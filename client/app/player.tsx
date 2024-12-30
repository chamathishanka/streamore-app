import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert, Linking } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio, AVPlaybackStatus } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

export default function Player() {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [track, setTrack] = useState<any>(null);

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const response = await axios.get('https://api.deezer.com/track/2992749261');
                setTrack(response.data);
            } catch (error) {
                console.error('Error fetching track:', error);
                Alert.alert('Error', 'Error fetching track data');
            }
        };

        fetchTrack();
    }, []);

    useEffect(() => {
        if (track && track.preview) {
            playSound();
        }
    }, [track]);

    async function playSound() {
        if (track && track.preview) {
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync({ uri: track.preview });
            setSound(sound);

            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

            console.log('Playing Sound');
            await sound.playAsync();
            setIsPlaying(true);
        } else {
            Alert.alert('Error', 'No preview URL available for this track');
        }
    }

    function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis ?? 0);
        }
    }

    async function togglePlayPause() {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
        } else {
            await playSound();
        }
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    if (!track) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: track.album.cover_big }}
                style={styles.coverArt}
            />
            <View style={styles.textContainer}>
                <Text style={styles.songName}>{track.title}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(track.artist.link)}>
                    <Text style={styles.artistName}>{track.artist.name}</Text>
                </TouchableOpacity>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                // onValueChange={value => sound && sound.setPositionAsync(value)}   //seek to a specific position
                minimumTrackTintColor="white"
                maximumTrackTintColor="#888"
                thumbTintColor="white"
            />
            <View style={styles.controls}>
                <Icon style={{ marginLeft: width * 0.05 }} name="backward" size={30} color="white" />

                <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
                    <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="#0a0a1a" />
                </TouchableOpacity>

                <Icon style={{ marginRight: width * 0.05 }} name="forward" size={30} color="white" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#0a0a1a',
        padding: 20,
    },
    coverArt: {
        width: width * 0.86,
        height: width * 0.86,
        marginBottom: height * 0.12,
        borderRadius: 10,
    },
    textContainer: {
        width: '100%',
        alignItems: 'flex-start', // Align text to the left
        marginLeft: width * 0.07,
        marginBottom: 15,
    },
    songName: {
        fontSize: 24,
        color: 'white',
        textAlign: 'right',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    artistName: {
        fontSize: 18,
        color: '#888',
        marginBottom: 20,
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 20,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginBottom: 30,
    },
    playPauseButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
    },
});