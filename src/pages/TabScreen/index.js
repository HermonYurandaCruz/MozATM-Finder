import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; // Importa os ícones do Expo
import Home from '../Home'
import AllCourses from '../AllCourses'
import MyCourses from '../MyCourses';
import Setting from '../Setting';


const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator
    screenOptions={ ({ route}) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
    

        if (route.name === 'Inicio') {
          iconName = focused ? 'grid' : 'grid';
        } else if (route.name === 'Cursos') {
          iconName = focused ? 'monitor' : 'monitor';
        }else if (route.name === 'Meus Cursos') {
          iconName = focused ? 'layers' : 'layers';
        }else if (route.name === 'Perfil') {
          iconName = focused ? 'user' : 'user';
        }

        return <Feather name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#4177FF',
    })}
    
    >
      <Tab.Screen name="Inicio" component={Home}  options={{ headerShown: false }}  />
      <Tab.Screen name="Cursos" component={AllCourses}  options={{ headerShown: false }}  />
      <Tab.Screen name="Meus Cursos" component={MyCourses}  options={{ headerShown: false }}  />
      <Tab.Screen name="Perfil" component={Setting}  options={{ headerShown: false }}  />

    </Tab.Navigator>
  );
}
