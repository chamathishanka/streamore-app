import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const FloatingButton: React.FC = () => {
    return (
        <Link href="/searchList" asChild>
            <TouchableOpacity style={styles.floatingButton}>
                <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#1DB954',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FloatingButton;