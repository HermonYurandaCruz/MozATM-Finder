import React,{useEffect}from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation,  } from '@react-navigation/native';


export default function Verificar() {
  const navigation = useNavigation();


  const verificarUsuarioLogado = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        navigation.navigate('TabScreen')
        console.log('com conta')

      } else {
        navigation.navigate('Login');
        console.log('sem conta')
      }
    } catch (error) {
      console.error('Erro ao verificar usuário logado:', error);
      // Lide com o erro, por exemplo, mostrando uma mensagem ou logando-o para depuração
    }
  };


  useEffect(() => {
    verificarUsuarioLogado();
  }, []);
}