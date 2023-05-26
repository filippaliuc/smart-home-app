
import React from 'react'

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'


const HomeScreenButtons = () => {

    const navitagtion = useNavigation();

    return (
        <View style={styles.navigationButtonsContainer}>
            <TouchableOpacity style={styles.navigationButton} onPress={() => navitagtion.navigate("HomeScreen")}>
                <Text style={styles.buttonText}>Informatii</Text>
            </TouchableOpacity>
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
        borderBottomColor: 'green',
        backgroundColor: 'green',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20
    }
})