import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LightCard = ({ label, title, state, onPress }) => {

    const iconNameOn = label === 'camera' ? 'lightbulb-outline' : 'lamp-outline';
    const iconNameOff = label === 'camera' ? 'lightbulb-off-outline' : 'lamp-outline';

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.5}
            onPress={onPress}
        >
            <View style={styles.cardContent}>
                <Icon name={state ? iconNameOn : iconNameOff} size={60} color={state ? '#eeb00b' : 'grey'} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        width: '50%', // Occupies half of the row
        aspectRatio: 1.2, // Square shape
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 10,
        marginRight: 10,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LightCard;
