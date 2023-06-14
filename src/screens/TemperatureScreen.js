import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TemperatureScreen = () => {
  const [thermalPlantValue, setThermalPlantValue] = useState(false);
  const [airConditionerValue, setAirConditionerValue] = useState(false);
  const [autonomous, setAutonomous] = useState(false);

  const handleThermalPlantSwitch = () => {
    setThermalPlantValue((prevValue) => !prevValue);
  };

  const handleAirConditionerSwitch = () => {
    setAirConditionerValue((prevValue) => !prevValue);
  };

  const handleAutonomousToggle = () => {
    setAutonomous((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Temperatură</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Centrală termică</Text>
          <TouchableOpacity
            style={[
              styles.switchButton,
              { backgroundColor: thermalPlantValue ? '#c3d396' : 'white' },
              { borderColor: thermalPlantValue ? '#c3d396' : '#c3d396' },
            ]}
            onPress={handleThermalPlantSwitch}
          >
            <Text style={[styles.switchText, { color: thermalPlantValue ? 'white' : '#c3d396' }]}>
              {thermalPlantValue ? 'On' : 'Off'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Aer condiționat</Text>
          <TouchableOpacity
            style={[
              styles.switchButton,
              { backgroundColor: airConditionerValue ? '#c3d396' : 'white' },
              { borderColor: airConditionerValue ? '#c3d396' : '#c3d396' },
            ]}
            onPress={handleAirConditionerSwitch}
          >
            <Text style={[styles.switchText, { color: airConditionerValue ? 'white' : '#c3d396' }]}>
              {airConditionerValue ? 'On' : 'Off'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.semicircleContainer}>
        {/* Render your semicircle design with the actual temperature value */}
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: autonomous ? '#ccc' : '#c3d396' },
          ]}
          onPress={() => handleAutonomousToggle()}
          disabled={autonomous}
        >
          <Text style={styles.buttonText}>Autonomous On</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: autonomous ? '#c3d396' : '#ccc' },
          ]}
          onPress={() => handleAutonomousToggle()}
          disabled={!autonomous}
        >
          <Text style={styles.buttonText}>Autonomous Off</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    // backgroundColor: '#c3d396',
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    color: '#c3d396',
    fontSize: 30,
    fontWeight: 'bold',
  },
  cardContainer: {
    margin: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c3d396",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  switchButton: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  switchText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  semicircleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TemperatureScreen;
