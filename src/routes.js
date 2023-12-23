import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login'
import InfoATM from './pages/InfoATM'
import TabScreen from './pages/TabScreen'
import AddBank from './pages/AddBank'
import Register from './pages/Register'
import MapaAgentes from './pages/MapaAgentes';
import MapaATM from './pages/MapaATM';
import Store from './pages/StoreAdd';


const AppStack = createNativeStackNavigator();



export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                
                <AppStack.Screen name='Login' component={Login}/>
                <AppStack.Screen name='TabScreen' component={TabScreen}/>
                <AppStack.Screen name='InfoATM' component={InfoATM}/>
                <AppStack.Screen name='AddBank' component={AddBank}/>
                <AppStack.Screen name='Register'component={Register}/>
                <AppStack.Screen name='MapaAgentes'component={MapaAgentes}/>
                <AppStack.Screen name='MapaATM'component={MapaATM}/>
                <AppStack.Screen name='StoreAdd'component={Store}/>







            </AppStack.Navigator>
        </NavigationContainer>
    )
}
