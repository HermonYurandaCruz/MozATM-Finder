import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Importa os ícones do Expo
import { Settings } from 'react-native';
import Home from '../Home'
import Setting from '../Setting'
import Map from '../Map'
import ListBank from '../ListBank'




const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator
    screenOptions={ ({ route}) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
    

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'ListBank') {
          iconName = focused ? 'list' : 'list';
        }else if (route.name === 'Map') {
          iconName = focused ? 'map' : 'map-outline';
        }else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#29524A',
    }}
    >
      <Tab.Screen name="Home" component={Home}  options={{ headerShown: false }}  />
      <Tab.Screen name="ListBank" component={ListBank}  options={{ headerShown: false }}  />
      <Tab.Screen name="Map" component={Map}  options={{ headerShown: false }}  />
      <Tab.Screen name="Settings" component={Setting}  options={{ headerShown: false }}  />

    </Tab.Navigator>
  );
}