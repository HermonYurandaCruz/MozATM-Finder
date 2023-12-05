import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login'

const AppStack = createNativeStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                
                <AppStack.Screen name='Login' component={Login}/>

            </AppStack.Navigator>
        </NavigationContainer>
    )
}
