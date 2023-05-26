import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeScreenButtons from '../components/HomeScreenButtons'
import { RootSiblingParent } from 'react-native-root-siblings'
import { database } from '../../firebase'
import { onValue, ref} from 'firebase/database'


const HomeScreen = () => {
    
    [data, setData] = useState()

    useEffect(() => {
        setData(readSignalData())
    })

    function readSignalData() {
        const signalRef = ref(database, 'semnale')
        onValue(signalRef, (snapshot) => {
            return snapshot.val();
        }) 
    }

    console.log()

    return (
        <RootSiblingParent>
            <View style={styles.container}> 
                <Text>{data}</Text>
                {/* <HomeScreenButtons></HomeScreenButtons> */}
            </View>
        </RootSiblingParent>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: '6%',
        flex: 1,
        justifyContent: 'flex-end'
    }
})