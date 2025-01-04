import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSubmit }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for songs..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={onSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'white',
    },
});

export default SearchBar;