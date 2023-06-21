import { useIsFocused } from '@react-navigation/native';
import { off, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { database } from '../../firebase';
import InformationCard from '../components/InformationCard';


const HomeScreen = () => {

    const [temperature, setTemperature] = useState();
    const [humidity, setHumidity] = useState();
    const [light, setLight] = useState();
    const [isFlame, setIsFlame] = useState(false);

    // Verifică dacă ecranul este în prim-plan
    const isFocused = useIsFocused();

    useEffect(() => {
        const signalRef = ref(database, 'semnale');
        
        // Citește schimbările din baza de date
        onValue(signalRef, (snapshot) => {
            const tempData = snapshot.val();
            if (tempData) {
                setTemperature(tempData["temperatura(C)"]);
                setHumidity(tempData["umiditate(%)"]);
                setLight(tempData["lumina"]);
                setIsFlame(tempData["foc"]);
                console.log(light);
            }
        });

        return () => {
            off(signalRef);
        }

    }, [temperature, humidity, light, isFocused]);

    return (
        <RootSiblingParent>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Informații</Text>
                </View>
                {isFlame == 0 && <InformationCard value={isFlame} label={"Alarmă de incendiu !"} />}
                <InformationCard value={temperature} label={'Temperatură(°C):'} />
                <InformationCard value={!light ? 'zi' : 'noapte'} label={'Timpul zilei: '} />
                <InformationCard value={humidity} label={'Umiditate(%):'} />
            </View>
        </RootSiblingParent>
    )
}

export default HomeScreen;

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
});
