import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Slider } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TemperatureScreen = () => {
    const [thermalPlantValue, setThermalPlantValue] = useState(false);
    const [airConditionerValue, setAirConditionerValue] = useState(false);
    const [autonomous, setAutonomous] = useState(false);

    const [temperature, setTemperature] = useState(23);

    let thumbColor = '#c3d396';

    if (temperature < 17) {
        thumbColor = 'blue';
    } else if (temperature > 30) {
        thumbColor = 'red';
    }

    const handleThermalPlantSwitch = () => {
        setThermalPlantValue((prevValue) => !prevValue);
    };

    const handleAirConditionerSwitch = () => {
        setAirConditionerValue((prevValue) => !prevValue);
    };

    const handleAutonomousToggle = () => {
        setAutonomous((prevState) => !prevState);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Temperatură</Text>
            </View>
            <View style={styles.temperatureContainer}>

                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={-20}
                        maximumValue={100}
                        value={temperature}
                        thumbTintColor={thumbColor}
                        minimumTrackTintColor={thumbColor}
                        maximumTrackTintColor="#d3d3d3"
                        disabled
                    />
                    <View
                        style={[
                            styles.sliderBar,
                            { left: `${((temperature + 20) / 120) * 100}%` },
                        ]}
                    />
                </View>
                <Text style={[styles.temperatureText, { color: thumbColor }]}>{temperature}°C</Text>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Centrală termică</Text>
                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            { backgroundColor: thermalPlantValue ? '#c3d396' : 'white' },
                            { borderColor: thermalPlantValue ? '#c3d396' : '#c3d396' },
                        ]}
                        onPress={handleThermalPlantSwitch}
                    >
                        <Text style={[styles.switchText, { color: thermalPlantValue ? 'white' : '#c3d396' }]}>
                            {thermalPlantValue ? 'On' : 'Off'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Aer condiționat</Text>
                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            { backgroundColor: airConditionerValue ? '#c3d396' : 'white' },
                            { borderColor: airConditionerValue ? '#c3d396' : '#c3d396' },
                        ]}
                        onPress={handleAirConditionerSwitch}
                    >
                        <Text style={[styles.switchText, { color: airConditionerValue ? 'white' : '#c3d396' }]}>
                            {airConditionerValue ? 'On' : 'Off'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: autonomous ? '#c3d396' : '#ccc' },
                    ]}
                    onPress={() => handleAutonomousToggle()}
                    disabled={autonomous}
                >
                    <Text style={styles.buttonText}>Autonomous On</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        { backgroundColor: autonomous ? '#ccc' : '#c3d396' },
                    ]}
                    onPress={() => handleAutonomousToggle()}
                    disabled={!autonomous}
                >
                    <Text style={styles.buttonText}>Autonomous Off</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        // backgroundColor: '#c3d396',
        padding: 10,
        alignItems: 'center',
        elevation: 2,
    },
    title: {
        color: '#c3d396',
        fontSize: 30,
        fontWeight: 'bold',
    },
    cardContainer: {
        margin: 10,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#c3d396",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    switchButton: {
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
    },
    switchText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    button: {
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    temperatureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    sliderContainer: {
        width: '80%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    slider: {
        flex: 1,
    },
    sliderBar: {
        position: 'absolute',
        height: 8,
        width: 8,
        borderRadius: 4,
        zIndex: 1,
    },
    temperatureText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
});

export default TemperatureScreen;