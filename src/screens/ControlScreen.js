import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootSiblingParent } from 'react-native-root-siblings';
import ControlCard from '../components/ControlCard';

const ControlScreen = () => {
  return (
    <RootSiblingParent>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Control</Text>
        </View>
        <View style={styles.row}>
            <ControlCard label={"light"} title={"Lumini"}/>
            <ControlCard label={"temperature"} title={"Temperatură"}/>
        </View>
        <View style={styles.row}>
            <ControlCard label={"humidity"} title={"Umiditate"}/>
            <ControlCard label={"blinds"} title={"Jaluzele"}/>
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
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  // column: {
  //   flex: 1,
  //   marginRight: 10,
  // }
})