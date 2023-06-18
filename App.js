import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import HomeScreenButtons from './src/components/HomeScreenButtons';
import BlindsScreen from './src/screens/BlindsScreen';
import ControlScreen from './src/screens/ControlScreen';
import HomeScreen from './src/screens/HomeScreen';
import HumidityScreen from './src/screens/HumidityScreen';
import LightsScreen from './src/screens/LightsScreen';
import TemperatureScreen from './src/screens/TemperatureScreen';

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
