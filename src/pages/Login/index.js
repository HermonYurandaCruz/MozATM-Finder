import React, {useState} from 'react';
import {View,ActivityIndicator,TouchableOpacity , Image, TextInput,Text} from 'react-native';
import { useNavigation,CommonActions  } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {firebase} from '../../services/firebaseConfig'

import styles from './styles';

import logoImg from '../../../src/assets/logo.png'
import logoGoogle from '../../../src/assets/google.png'


export default function Login(){

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
   
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');


    const checkIfUserLoggedIn = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          // Se houver um ID de usuário salvo, navegue diretamente para a tela 'TabScreen'
          navigation.navigate('TabScreen', { userId });
        }
      } catch (error) {
        console.error('Erro ao verificar usuário logado:', error);
      }
    };
    
    // Chame esta função no início do seu aplicativo
    checkIfUserLoggedIn();


    const handleLoginPress = async () => {
      if (!email || !senha) {
        setErrorText('Por favor, preencha todos os campos.');
        return;
      }
    
      try {
        setLoading(true);
        setShowText(false);
        setErrorText(''); // Limpa qualquer mensagem de erro anterior
    
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, senha);
        
          const userDoc = await firebase.firestore().collection('users').doc(userCredential.user.uid).get();
          if (userDoc.exists) {
            const userData = { id: userCredential.user.uid, ...userDoc.data() };
            console.log('Dados do usuário:', userData);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            navigation.navigate('TabScreen');
          }

        return userCredential.user;

      } catch (error) {
        console.error('Erro ao logar usuário:', error);
        setErrorText('Erro ao efetuar Login. Por favor, tente novamente.'); // Define mensagem de erro
      } finally {
        setLoading(false);
        setShowText(true);
      }
    };
    
      const handleRegisterPress = () => {
        navigation.navigate('Register');
      };
      
    return(
        
        <View style={styles.container}>
        
            <View style={styles.containerLogo}>
                <Image style={styles.logoImag} source={logoImg}/>
                <Text style={styles.TextBemVindo}>Seja bem vindo ao</Text>
                <Text style={styles.TextBold}>MozATM Finder</Text>
            </View>
         
            <View style={styles.formLogin}>
               
             
                <Text style={styles.TextForm}>Endereço de e-mail</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite o seu e-mail'
                value={email}
                onChangeText={(text) => setEmail(text)}
                />


                <Text style={styles.Text}>Senha</Text>
                 <TextInput
                placeholder='Digite a sua senha'
                style={styles.input}
                secureTextEntry={true}
                value={senha}
                onChangeText={(text) => setSenha(text)}
                />

                
                <Text style={styles.TextRecuperar}>Recuperar a senha</Text>

            <TouchableOpacity style={styles.button} onPress={handleLoginPress} disabled={loading}>
            {showText && <Text style={styles.text}>Login</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

               

               
           
                <Text style={styles.Text3}>Inicie sessão com</Text>
                <TouchableOpacity style={styles.buttonGoogle}>
                    <View style={styles.buttonContent}>
                        <Image
                        source={logoGoogle} // Substitua pelo caminho do seu ícone
                        style={styles.icon}
                        />
                        <Text style={styles.textGoogle}>Iniciar sessão com Google</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.containerRecuperar}>
                <Text style={styles.Text}>Não tem uma conta?</Text>
                <Text style={styles.Text2} onPress={handleRegisterPress}>criar agora</Text>
                </View>

                        


               

                
            </View>
        </View>
    )
}
