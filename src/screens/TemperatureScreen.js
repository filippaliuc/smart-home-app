import { off, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Slider, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { database } from '../../firebase';

const TemperatureScreen = () => {
    const [thermalPlantValue, setThermalPlantValue] = useState();
    const [airConditionerValue, setAirConditionerValue] = useState();
    const [autonomous, setAutonomous] = useState(false);
    const [temperature, setTemperature] = useState();


    useEffect(() => {
        const signalRef = ref(database, 'semnale');
        onValue(signalRef, (snapshot) => {
            const tempData = snapshot.val();
            if (tempData) {
                let temp = tempData['temperatura(C)'];
                setTemperature(temp);
                if (autonomous) {
                    if (temp < 17) {
                        setThermalPlantValue(true);
                        setAirConditionerValue(false);
                    } else if (temp > 30) {
                        setThermalPlantValue(false);
                        setAirConditionerValue(true);
                    } else {
                        setThermalPlantValue(false);
                        setAirConditionerValue(false);
                    }
                }
            }
        });

        return () => {
            off(signalRef);
        };
    }, [temperature]);

    useEffect(() => {

        if (thermalPlantValue) {
            updateControl("temperatura", "centrala", 0)
        } else {
            updateControl("temperatura", "centrala", 1)
        }

        if (airConditionerValue) {
            updateControl("temperatura", "clima", 0)
        } else {
            updateControl("temperatura", "clima", 1)
        }

    }, [thermalPlantValue, airConditionerValue])

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
        if (autonomous) {
            showAlert('Modul autonom este oprit');
            setThermalPlantValue(false);
            setAirConditionerValue(false);
        } else {
            showAlert('Modul autonom este pornit');
            if (temperature) {
                if (temperature < 17) {
                    setThermalPlantValue(true);
                    setAirConditionerValue(false);
                } else if (temperature > 30) {
                    setThermalPlantValue(false);
                    setAirConditionerValue(true);
                } else {
                    setThermalPlantValue(false);
                    setAirConditionerValue(false);
                }
            }
        }
    };

    const showAlert = (message) => {
        if (Platform.OS === 'ios') {
            Alert.alert('', message);
        } else {
            Alert.alert('', message, [{ text: 'OK' }]);
        }
    };

    const handleCardPress = (device) => {
        if (autonomous) {
            showAlert('Modul autonom este pornit');
        } else {
            if (device === 'thermalPlant') {
                setThermalPlantValue((prevValue) => !prevValue);
            } else if (device === 'airConditioner') {
                setAirConditionerValue((prevValue) => !prevValue);
            }
        }
    };

    function updateControl(controlType, key, value) {
        if (key) {
            const updates = {};
            updates[key] = value;

            update(ref(database, 'control/' + controlType + '/'), updates).catch(console.error);
        } else {
            const updates = {};
            updates[controlType] = value;
            update(ref(database, 'control/'), updates).catch(console.error);
        }
    }

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
                        style={[styles.sliderBar, { left: `${((temperature + 20) / 120) * 100}%` }]}
                    />
                </View>
                <Text style={[styles.temperatureText, { color: thumbColor }]}>{temperature}°C</Text>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => handleCardPress('thermalPlant')}
                    activeOpacity={autonomous ? 1 : 0.2}
                >
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
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => handleCardPress('airConditioner')}
                    activeOpacity={autonomous ? 1 : 0.2}
                >
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
                </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: autonomous ? '#c3d396' : '#ccc' }]}
                    onPress={() => handleAutonomousToggle()}
                    disabled={autonomous}
                >
                    <Text style={styles.buttonText}>Mod autonom On</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: autonomous ? '#ccc' : '#c3d396' }]}
                    onPress={() => handleAutonomousToggle()}
                    disabled={!autonomous}
                >
                    <Text style={styles.buttonText}>Mod autonom Off</Text>
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
        padding: 10,
        alignItems: 'center',
        elevation: 2,
    },
    title: {
        color: 'black',
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
        borderColor: '#c3d396',
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
