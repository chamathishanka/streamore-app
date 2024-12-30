import { Track } from "react-native-track-player";


export const playlistData: Track[] = [
    {
        id: 1,
        url: require('../assets/metro.mp3'), // Correct relative path to your audio file
        title: 'Metro',
        artist: 'Unknown Artist'
    },
    {
        id: 2,
        url: require('../assets/metro.mp3'), // Correct relative path to your audio file
        title: 'Metro',
        artist: 'Unknown Artist'
    }
];