import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeScreenButtons from '../components/HomeScreenButtons'
import { RootSiblingParent } from 'react-native-root-siblings'
import { database } from '../../firebase'
import { onValue, ref, off, update } from 'firebase/database'
import InformationCard from '../components/InformationCard'
import { useIsFocused } from '@react-navigation/native';


const HomeScreen = () => {

    const [sensorData, setSensorData] = useState()
    const [temperature, setTemperature] = useState()
    const [humidity, setHumidity] = useState()
    const [light, setLight] = useState()
    const [isFlame, setIsFlame] = useState(false)

    const isFocused = useIsFocused()

    useEffect(() => {
        const signalRef = ref(database, 'semnale');
        onValue(signalRef, (snapshot) => {
            const tempData = snapshot.val();
            if (tempData) {
                setTemperature(tempData["temperatura(C)"])
                setHumidity(tempData["umiditate(%)"])
                setLight(tempData["lumina"])
                setIsFlame(tempData["foc"])
                console.log(light)
            }
        });

        return () => {
            off(signalRef)
        }

    }, [temperature, humidity, light, isFocused])

    return (
        <RootSiblingParent>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Informații</Text>
                </View>
                {isFlame == 1 && <InformationCard value={isFlame} label={"Alarmă de incendiu !"} />}
                <InformationCard value={temperature} label={'Temperatură(°C):'} />
                <InformationCard value={light ? 'zi' : 'noapte'} label={'Timpul zilei: '} />
                <InformationCard value={humidity} label={'Umiditate(%):'} />
                {/* <InformationCard value={sensorData["distanta(cm)"]} label={'Distanța(cm):'}/> */}
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