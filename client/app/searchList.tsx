import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import SearchBar from '@/components/SearchBar';
import SongItem from '@/components/SongItem';
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

const SearchList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    return (
        <View style={styles.container}>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSubmit={handleSearch}
            />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8df807" />
                </View>
            ) : (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <SongItem
                            song={item}
                            isPlaying={false}
                            onPlayPause={() => { }}
                        />
                    )}
                />
            )}
        </View>
    );
};

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
});

export default SearchList;