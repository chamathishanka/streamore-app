import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

interface FloatingButtonProps {
    onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
    const clickCount = useSelector((state: RootState) => state.click.count);

    return (
        <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
            <Text style={styles.floatingButtonText}>{clickCount}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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

export default FloatingButton;