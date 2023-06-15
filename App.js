import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ControlScreen from './src/screens/ControlScreen';
import HomeScreenButtons from './src/components/HomeScreenButtons';
import TemperatureScreen from './src/screens/TemperatureScreen';
import LightsScreen from './src/screens/LightsScreen';
import HumidityScreen from './src/screens/HumidityScreen'
import BlindsScreen from './src/screens/BlindsScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar></StatusBar>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ControlScreen" component={ControlScreen} />
        <Stack.Screen name="LightsScreen" component={LightsScreen} />
        <Stack.Screen name="TemperatureScreen" component={TemperatureScreen} />
        <Stack.Screen name="HumidityScreen" component={HumidityScreen} />
        <Stack.Screen name="BlindsScreen" component={BlindsScreen} />

      </Stack.Navigator>
      <HomeScreenButtons></HomeScreenButtons>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
