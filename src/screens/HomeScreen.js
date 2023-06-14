import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeScreenButtons from '../components/HomeScreenButtons'
import { RootSiblingParent } from 'react-native-root-siblings'
import { database } from '../../firebase'
import { onValue, ref, off, update} from 'firebase/database'
import InformationCard from '../components/InformationCard'


const HomeScreen = () => {
    
    const [signalData, setSignalData] = useState(null)

    useEffect(() => {
        readSignalData()
        updateControl("temperatura", "centrala", 1)
        updateControl("temperatura", "clima", 0)
        updateControl("lumini", "camera3", 1)
        updateControl("lumini", "camera4", 0)
        updateControl("jaluzele", "", 0)

    },[])

    function updateControl (controlType, key, value) {
        if(key){
            const updates = {};
            updates[key] = value;

            update(ref(database, 'control/' + controlType + '/'), updates).catch(console.error);
        } else {
            const updates = {};
            updates[controlType] = value;
            update(ref(database, 'control/'), updates).catch(console.error);
        }

    }

    function readSignalData () {
        const signalRef = ref(database, 'semnale');
        onValue(signalRef, (snapshot) => {
            const tempData = snapshot.val();
            if (tempData) {
                setSignalData(tempData);
                console.log(signalData)
            }
        });

        // Clean up the event listener when the component unmounts
        return () => {
            off(signalRef);
        };
    }

    return (
        <RootSiblingParent>
            <View style={styles.container}> 
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Informații</Text>
                </View>
                <InformationCard value={signalData && signalData["temperatura(C)"]} label={'Temperatură(°C):'}/>
                <InformationCard value={signalData && signalData["lumina"] == 0 ? 'zi' : 'noapte'} label={'Timpul zilei: '}/>
                <InformationCard value={signalData && signalData["umiditate(%)"]} label={'Umiditate(%):'}/>
                {/* <InformationCard value={signalData["distanta(cm)"]} label={'Distanța(cm):'}/> */}
            </View>
        </RootSiblingParent>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: '6%',
        flex: 1,
    },
    titleContainer: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 10,
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
      },
})