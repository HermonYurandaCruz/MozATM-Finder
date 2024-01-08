import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

import Login from './pages/Login'
import InfoATM from './pages/InfoATM'
import TabScreen from './pages/TabScreen'
import AddBank from './pages/AddBank'
import Register from './pages/Register'
import MapaAgentes from './pages/MapaAgentes';
import MapaATM from './pages/MapaATM';
import Store from './pages/StoreAdd';
import UpdateBank from './pages/UpdateBank';
import UpdateProfile from './pages/UpdateProfile';
import Verificar from './services/api';
import UpdatePassword from './pages/UpdatePassword';
import MapInst from './pages/MapInst';
import Setting from './pages/Setting';
import Help from './pages/Help';
import Admin from './pages/Admin';
import ConfirmMaly from './pages/ConfirmMaly';






const AppStack = createNativeStackNavigator();



export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false,
            gestureEnabled: Platform.OS === 'ios' ? false : true}}
            >
                <AppStack.Screen name='Verificar' component={Verificar}/>
                <AppStack.Screen name='Register'component={Register}/>
                <AppStack.Screen name='Login' component={Login}/>
                <AppStack.Screen name='TabScreen' component={TabScreen}/>
                <AppStack.Screen name='InfoATM' component={InfoATM}/>
                <AppStack.Screen name='AddBank' component={AddBank}/>
                <AppStack.Screen name='MapaAgentes'component={MapaAgentes}/>
                <AppStack.Screen name='MapaATM'component={MapaATM}/>
                <AppStack.Screen name='StoreAdd'component={Store}/>
                <AppStack.Screen name='UpdateBank'component={UpdateBank}/>
                <AppStack.Screen name='UpdateProfile'component={UpdateProfile}/>
                <AppStack.Screen name='UpdatePassword'component={UpdatePassword}/>
                <AppStack.Screen name='Setting'component={Setting}/>
                <AppStack.Screen name='MapInst'component={MapInst}/>
                <AppStack.Screen name='Help' component={Help}/>
                <AppStack.Screen name='Admin' component={Admin}/>
                <AppStack.Screen name='ConfirmMaly' component={ConfirmMaly}/>

            </AppStack.Navigator>
        </NavigationContainer>
    )
}
