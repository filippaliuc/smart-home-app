import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { RootSiblingParent } from 'react-native-root-siblings';
import LightCard from '../components/LightCard';
import { useEffect } from 'react';
import { onValue, ref, off, update } from 'firebase/database';
import { database } from '../../firebase';


const LightsScreen = () => {

    const [bathroomState, setBathoomState] = useState()
    const [bedroomState, setBedroomState] = useState()
    const [lampState, setLampState] = useState()
    const [kitchenState, setKitchenState] = useState()
    const [turnOffAll, setTurnOffAll] = useState()

    useEffect(() => {
        const signalRef = ref(database, 'control/lumini');
        onValue(signalRef, (snapshot) => {
            const tempData = snapshot.val();
            if (tempData) {
                let temp = tempData
                setBathoomState(temp["baie"])
                setBedroomState(temp["dormitor"])
                setKitchenState(temp["bucatarie"])
                setLampState(temp["lampa"])
                setTurnOffAll(temp["stingeTot"])
                console.log(turnOffAll)
            }
        });

        return () => {
            off(signalRef);
        };

    }, [bathroomState, kitchenState, bedroomState, lampState, turnOffAll])

    useEffect(() => {

        if (!bathroomState && !kitchenState && !bedroomState && !lampState) {
            updateControl("lumini", "stingeTot", true)
        }

        return () => {

        }
    }, [bathroomState, kitchenState, bedroomState, lampState])


    useEffect(() => {
        if (turnOffAll) {
            updateControl("lumini", "baie", false)
            updateControl("lumini", "bucatarie", false)
            updateControl("lumini", "dormitor", false)
            updateControl("lumini", "lampa", false)
        }

    }, [turnOffAll])

    function updateControl(controlType, key, value) {
        if (value) {
            console.log("ceva")
            setTurnOffAll(false)
        }


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

    function updateTurnOffAll(value) {
        if (value) {
            updateControl("lumini", "stingeTot", false)
        }
    }

    return (
        <RootSiblingParent>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Lumini </Text>
                </View>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: turnOffAll ? '#ccc' : '#c3d396' }]}
                    onPress={() => updateControl("lumini", "stingeTot", !turnOffAll)}
                    disabled={!kitchenState && !bathroomState && !bedroomState && !lampState && turnOffAll}
                >
                    <Text style={styles.buttonText}>Închide toate luminile</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <LightCard label={"camera"} title={"Baie"} state={bathroomState}
                        onPress={() => {
                            updateControl("lumini", "baie", !bathroomState)
                            updateTurnOffAll(!bathroomState)
                        }} />
                    <LightCard label={"camera"} title={"Bucatarie"} state={kitchenState}
                        onPress={() => {
                            updateControl("lumini", "bucatarie", !kitchenState)
                            updateTurnOffAll(!kitchenState)
                        }}
                    />
                </View>
                <View style={styles.row}>
                    <LightCard label={"camera"} title={"Dormitor"} state={bedroomState}
                        onPress={() => {
                            updateControl("lumini", "dormitor", !bedroomState)
                            updateTurnOffAll(!bathroomState)
                        }}
                    />
                    <LightCard label={"lampa"} title={"Lampă"} state={lampState} onPress={() => {
                        updateControl("lumini", "lampa", !lampState)
                        updateTurnOffAll(!lampState)
                    }}
                    />
                </View>
            </ScrollView>
        </RootSiblingParent>
    )
}

export default LightsScreen

const styles = StyleSheet.create({
    container: {
        marginTop: '6%',
        marginHorizontal: 20,
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 20,
    },
    titleContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})