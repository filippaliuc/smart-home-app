import { off, onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { database } from '../../firebase';

const TemperatureScreen = () => {
    const [blindsState, setBlindsState] = useState()
    const [autonomous, setAutonomous] = useState(false);
    const [lightValue, setLightValue] = useState()


    useEffect(() => {
        // Citește schimbările de lumină din baza de date
        const signalRef = ref(database, 'semnale');
        onValue(signalRef, (snapshot) => {
            const tempData = snapshot.val();
            if (tempData) {
                let light = tempData['lumina'];
                setLightValue(light);
                // Verifică dacă modul autonom este pornit caz în care poate lua decizii în controlul jaluzelelor
                if (autonomous) {
                    if (light) {
                        setBlindsState(true)
                    } else {
                        setBlindsState(false)
                    }
                } else {
                    setBlindsState(false)
                }
            }
        });

        return () => {
            off(signalRef);
        };
    }, [lightValue]);

    useEffect(() => {
        // Actualizează starea jaluzelelor când se schimbă valorile luminii
        if (blindsState) {
            updateControl("jaluzele", "", 1)
        } else {
            updateControl("jaluzele", "", 0)
        }

    }, [blindsState])


    // Funcție care setează modul oprit/pornit al modului autonom pentru controlul jaluzelelor
    const handleAutonomousToggle = () => {
        setAutonomous((prevState) => !prevState);
        if (autonomous) {
            showAlert('Modul autonom este oprit');
            setBlindsState(false)
        } else {
            showAlert('Modul autonom este pornit');
            if (lightValue) {
                setBlindsState(true);
            } else {
                setBlindsState(false)
            }
        }
    };

    // Dialog modal pentru informarea despre starea configurării autonome
    const showAlert = (message) => {
        if (Platform.OS === 'ios') {
            Alert.alert('', message);
        } else {
            Alert.alert('', message, [{ text: 'OK' }]);
        }
    };

    // Funcție care controlează starea de deschis/închis a jaluzelelor
    const handleCardPress = () => {
        if (autonomous) {
            showAlert('Modul autonom este pornit');
        } else {
            setBlindsState((prevValue) => !prevValue);
        }
    };

    // Actualizează controlul jaluzelelor în baza de date 
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
                <View style={styles.blindsContainer}>
                    {blindsState == 0 && <Text style={[styles.blindsText]}> Jaluzele sunt deschise </Text>}
                    {blindsState == 1 && <Text style={[styles.blindsText]}> Jaluzele sunt inchise </Text>}
                </View>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity
                    style={[
                        styles.card,
                        { backgroundColor: blindsState ? '#c3d396' : 'white' },
                        { borderColor: blindsState ? '#c3d396' : '#c3d396' },
                    ]}
                    onPress={() => { handleCardPress() }}
                    activeOpacity={autonomous ? 1 : 0.2}
                >
                    <Text style={[styles.switchText, { color: blindsState ? 'white' : '#c3d396' }]}>
                        {blindsState ? 'On' : 'Off'}
                    </Text>
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
        marginTop: 20,
        marginBottom: 10,
        elevation: 2,
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
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 22,
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
    blindsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    blindsText: {
        fontSize: 32,
        fontWeight: 'bold',
    },
});

export default TemperatureScreen;
