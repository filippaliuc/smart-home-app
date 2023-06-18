import { off, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Slider, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { database } from '../../firebase';

const HumidityScreen = () => {
    const [humidifierValue, setHumidifierValue] = useState(false);
    const [dehumidifierValue, setDeumidifierValue] = useState(false);
    const [autonomous, setAutonomous] = useState(false);
    const [humidity, setHumidity] = useState();

    useEffect(() => {
        const signalRef = ref(database, 'semnale');
        onValue(signalRef, (snapshot) => {
            const tempData = snapshot.val();
            if (tempData) {
                let temp = tempData['umiditate(%)'];
                setHumidity(temp);
                if (autonomous) {
                    if (temp < 30) {
                        setHumidifierValue(true);
                        setDeumidifierValue(false);
                    } else if (temp > 50) {
                        setHumidifierValue(false);
                        setDeumidifierValue(true);
                    } else {
                        setHumidifierValue(false);
                        setDeumidifierValue(false);
                    }
                }
            }
        });

        return () => {
            off(signalRef);
        };
    }, [humidity]);

    useEffect(() => {
        if (humidifierValue) {
            updateControl("umiditate", "umidificator", 0)
        } else {
            updateControl("umiditate", "umidificator", 1)
        }

        if (dehumidifierValue) {
            updateControl("umiditate", "dezumidificator", 0)
        } else {
            updateControl("umiditate", "dezumidificator", 1)
        }
    }, [humidifierValue, dehumidifierValue])

    let thumbColor = '#c3d396';
    if (humidity < 30) {
        thumbColor = 'red';
    } else if (humidity > 50) {
        thumbColor = 'blue';
    }


    const handleThermalPlantSwitch = () => {
        setHumidifierValue((prevValue) => !prevValue);
    };

    const handleAirConditionerSwitch = () => {
        setDeumidifierValue((prevValue) => !prevValue);
    };

    const handleAutonomousToggle = () => {
        setAutonomous((prevState) => !prevState);
        if (autonomous) {
            showAlert('Modul autonom este oprit');
            setHumidifierValue(false);
            setDeumidifierValue(false);
        } else {
            showAlert('Modul autonom este pornit');
            if (humidity) {
                if (humidity < 30) {
                    setHumidifierValue(true);
                    setDeumidifierValue(false);
                } else if (humidity > 50) {
                    setHumidifierValue(false);
                    setDeumidifierValue(true);
                } else {
                    setHumidifierValue(false);
                    setDeumidifierValue(false);
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
                setHumidifierValue((prevValue) => !prevValue);
            } else if (device === 'airConditioner') {
                setDeumidifierValue((prevValue) => !prevValue);
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
                <Text style={styles.title}>Umiditate</Text>
            </View>
            <View style={styles.humidityContainer}>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={100}
                        value={humidity}
                        thumbTintColor={thumbColor}
                        minimumTrackTintColor={thumbColor}
                        maximumTrackTintColor={thumbColor}
                        disabled
                    />
                    <View
                        style={[styles.sliderBar, { left: `${((humidity + 20) / 120) * 100}%` }]}
                    />
                </View>
                <Text style={[styles.humidityText, { color: thumbColor }]}>{humidity}%</Text>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => handleCardPress('thermalPlant')}
                    activeOpacity={autonomous ? 1 : 0.2}
                >
                    <Text style={styles.cardTitle}>Umidificator</Text>
                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            { backgroundColor: humidifierValue ? '#c3d396' : 'white' },
                            { borderColor: humidifierValue ? '#c3d396' : '#c3d396' },
                        ]}
                        onPress={handleThermalPlantSwitch}
                    >
                        <Text style={[styles.switchText, { color: humidifierValue ? 'white' : '#c3d396' }]}>
                            {humidifierValue ? 'On' : 'Off'}
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
                    <Text style={styles.cardTitle}>Dezumidificator</Text>
                    <TouchableOpacity
                        style={[
                            styles.switchButton,
                            { backgroundColor: dehumidifierValue ? '#c3d396' : 'white' },
                            { borderColor: dehumidifierValue ? '#c3d396' : '#c3d396' },
                        ]}
                        onPress={handleAirConditionerSwitch}
                    >
                        <Text style={[styles.switchText, { color: dehumidifierValue ? 'white' : '#c3d396' }]}>
                            {dehumidifierValue ? 'On' : 'Off'}
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
    humidityContainer: {
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
    humidityText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
});

export default HumidityScreen;
