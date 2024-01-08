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
        } else if (route.name === 'Instituições') {
          iconName = focused ? 'list' : 'list';
        }else if (route.name === 'Mapa') {
          iconName = focused ? 'map' : 'map-outline';
        }else if (route.name === 'Definições') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'rgba(41, 82, 74, 0.9)',
    })}
    
  
    >
      <Tab.Screen name="Home" component={Home}  options={{ headerShown: false }}  />
      <Tab.Screen name="Instituições" component={ListBank}  options={{ headerShown: false }}  />
      <Tab.Screen name="Mapa" component={Map}  options={{ headerShown: false }}  />
      <Tab.Screen name="Definições" component={Setting}  options={{ headerShown: false }}  />

    </Tab.Navigator>
  );
}