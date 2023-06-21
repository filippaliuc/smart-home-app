import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ControlCard = ({ label, title, onPress }) => {
    let componentToRender;

    switch (label) {
        case 'light':
            // Cardul pentru controlul luminii
            componentToRender = (
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.5}
                    onPress={onPress}
                >
                    <View style={styles.cardContent}>
                        <FontAwesome name="lightbulb-o" size={24} color={'#eeb00b'} />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>
            );
            break;
        case 'temperature':
            // Cardul pentru controlul temperaturii
            componentToRender = (
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.5}
                    onPress={onPress}
                >
                    <View style={styles.cardContent}>
                        <Icon name="thermometer" size={24} color={'red'} />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>
            );
            break;

        case 'humidity':
            // Cardul pentru controlul umidității
            componentToRender = (
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.5}
                    onPress={onPress}
                >
                    <View style={styles.cardContent}>
                        <Icon name="water-percent" size={24} color={'blue'} />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>
            );
            break;
        case 'blinds':
            // Cardul pentru controlul jaluzelelor
            componentToRender = (
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.5}
                    onPress={onPress}
                >
                    <View style={styles.cardContent}>
                        <Icon name="blinds" size={24} color={'grey'} />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>
            );
            break;
        default:
            // Cardul implicit
            componentToRender = (
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.5}
                    onPress={onPress}
                >
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>
            );
            break;
    }

    return componentToRender;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        width: '50%', 
        aspectRatio: 1.2, 
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

export default ControlCard;
