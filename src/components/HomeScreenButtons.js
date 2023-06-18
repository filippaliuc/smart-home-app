
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const HomeScreenButtons = () => {

    const navitagtion = useNavigation();

    return (
        <View style={styles.navigationButtonsContainer}>
            <TouchableOpacity style={styles.navigationButton} onPress={() => navitagtion.navigate("HomeScreen")}>
                <Text style={styles.buttonText}>Informatii</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <TouchableOpacity style={styles.navigationButton} onPress={() => navitagtion.navigate("ControlScreen")}>
                <Text style={styles.buttonText}>Control</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreenButtons

const styles = StyleSheet.create({
    navigationButtonsContainer: {
        flexDirection: "row",
    },
    navigationButton: {
        flexDirection: 'column',
        flex: 1,
        padding: 10,
        borderTopColor: 'black',
        backgroundColor: '#c3d396',
        borderTopWidth: 1,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20
    },
    verticalLine: {
        width: 1,
        height: '100%',
        backgroundColor: 'black',
    },
})