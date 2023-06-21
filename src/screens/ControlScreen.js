import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import ControlCard from '../components/ControlCard';

const ControlScreen = () => {

  // Inițializează navigarea între ecrane
  const navigation = useNavigation()

  return (
    <RootSiblingParent>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Control</Text>
        </View>
        <View style={styles.row}>
          <ControlCard label={"light"} title={"Lumini"} onPress={() => navigation.navigate("LightsScreen")} />
          <ControlCard label={"temperature"} title={"Temperatură"} onPress={() => navigation.navigate("TemperatureScreen")} />
        </View>
        <View style={styles.row}>
          <ControlCard label={"humidity"} title={"Umiditate"} onPress={() => navigation.navigate("HumidityScreen")} />
          <ControlCard label={"blinds"} title={"Jaluzele"} onPress={() => navigation.navigate("BlindsScreen")} />
        </View>
      </ScrollView>
    </RootSiblingParent>
  )
}

export default ControlScreen

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