import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreenButtons from '../components/HomeScreenButtons'
import { RootSiblingParent } from 'react-native-root-siblings';
import { database } from '../../firebase';
import ControlCard from '../components/ControlCard';

const ControlScreen = () => {
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Control</Text>
        </View>
        <View style={styles.row}>
            <ControlCard title={"ceva"}/>
            <ControlCard title={"ceva"}/>
        </View>
        <View style={styles.row}>
            <ControlCard title={"ceva"}/>
            <ControlCard title={"ceva"}/>
        </View>
      </View>
    </RootSiblingParent>
  )
}

export default ControlScreen

const styles = StyleSheet.create({
  container: {
    marginTop: '6%',
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'center',
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