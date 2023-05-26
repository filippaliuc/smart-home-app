import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreenButtons from '../components/HomeScreenButtons'
import { RootSiblingParent } from 'react-native-root-siblings';
import { database } from '../../firebase';

const ControlScreen = () => {
  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <Text>ControlScreen</Text>

        <Text>ControlScreen</Text>
        <Text>ControlScreen</Text>
        <Text>ControlScreen</Text>
        <Text>ControlScreen</Text>
        <Text>ControlScreen</Text>
        {/* <HomeScreenButtons></HomeScreenButtons> */}
      </View>
    </RootSiblingParent>
  )
}

export default ControlScreen

const styles = StyleSheet.create({
  container: {
    marginTop: '6%',
    flex: 1,
    justifyContent: 'flex-end'
  }
})