import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login'
import Home from './pages/Home'
import TabScreen from './pages/TabScreen'

const AppStack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                
                <AppStack.Screen name='Login' component={Login}/>
                <AppStack.Screen name='Home' component={Home}/>
                <AppStack.Screen name='TabScreen' component={TabScreen}/>


            </AppStack.Navigator>
        </NavigationContainer>
    )
}
