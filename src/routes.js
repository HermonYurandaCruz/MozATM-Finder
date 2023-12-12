import React, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';



import Login from './pages/Login'
import InfoATM from './pages/InfoATM'
import TabScreen from './pages/TabScreen'
import AddBank from './pages/AddBank'
import Register from './pages/Register'


const AppStack = createNativeStackNavigator();

export default function Routes(){
    
    const [isLoading, setIsLoading] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    

    useEffect(() => {
        // Verifica se o usuário já está logado
        const checkLoginStatus = async () => {
          try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData !== null) {
              // Se houver dados de usuário, o usuário já está logado
              setIsUserLoggedIn(true);
            }
          } catch (error) {
            console.error('Erro ao verificar o status de login:', error);
          } finally {
            setIsLoading(false); // Indica que a verificação foi concluída
          }
        };
    
        checkLoginStatus();
      }, []);
      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
        }


    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>

            {isUserLoggedIn ? (
                    // Se o usuário estiver logado, navegue para a TabScreen
                    <AppStack.Screen name='TabScreen' component={TabScreen}/>
                    ) : (
                    // Se o usuário não estiver logado, navegue para a tela de Login
                    <AppStack.Screen name='Login' component={Login}/>
                    )}
            
                <AppStack.Screen name='InfoATM' component={InfoATM}/>
                <AppStack.Screen name='AddBank' component={AddBank}/>
                <AppStack.Screen name='Register'component={Register}/>




            </AppStack.Navigator>
        </NavigationContainer>
    )
}
