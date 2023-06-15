import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootSiblingParent } from 'react-native-root-siblings';
import LightCard from '../components/LightCard';

const LightsScreen = () => {

    return (
        <RootSiblingParent>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Lumini </Text>
                </View>
                <View style={styles.row}>
                    <LightCard label={"camera"} title={"Baie"} state={false} />
                    <LightCard label={"camera"} title={"Bucatarie"} state={false} />
                </View>
                <View style={styles.row}>
                    <LightCard label={"camera"} title={"Dormitor"} state={true} />
                    <LightCard label={"lampa"} title={"Lampă"} state={true} />
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
})