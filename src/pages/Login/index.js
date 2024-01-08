import React, {useState,useLayoutEffect} from 'react';
import {View,ActivityIndicator,TouchableOpacity,Modal, Image, TextInput,Text} from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather,Ionicons,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';

import {firebase} from '../../services/firebaseConfig'

import styles from './styles';

import logoImg from '../../../src/assets/logo.png'
import logoGoogle from '../../../src/assets/google.png'


export default function Login(){

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [recuperaEmail, setRecuperaEmail] = useState('')

    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');
    const [showPopup, setShowPopup] = useState(false);


    




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
    
        if (!userCredential.user.emailVerified) {
          setErrorText('Por favor, verifique seu e-mail antes de fazer login.');
          setLoading(false);
          setShowText(true);
          return;
        }
    
        const userDoc = await firebase.firestore().collection('users').doc(userCredential.user.uid).get();
        if (userDoc.exists) {
          const userData = { id: userCredential.user.uid, ...userDoc.data() };
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabScreen' }],
          });
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
        navigation.replace('Register');
      };


      const handlePasswordReset = async () => {
        if (!recuperaEmail) {
          setErrorText('Por favor, insira seu endereço de e-mail.');
          return;
        }
      
        try {
          setLoading(true);
          setErrorText(''); // Limpa qualquer mensagem de erro anterior
      
          await firebase.auth().sendPasswordResetEmail(recuperaEmail);
          setShowPopup(false);

          // Indique que o e-mail de redefinição foi enviado com sucesso
          setErrorText('Um e-mail de redefinição de senha foi enviado para o seu endereço.');
      
        } catch (error) {
          console.error('Erro ao enviar e-mail de redefinição de senha:', error);
          setErrorText('Erro ao enviar e-mail de redefinição de senha. Por favor, tente novamente.');
        } finally {
          setLoading(false);
        }
      };


      const abrirPOP= async ()=>{
        setShowPopup(true);
        console.log(' entrou no metodo ');
    
      }
      


    return(
        
        <View style={styles.container}>
        
            <View style={styles.containerLogo}>
                <Image style={styles.logoImag} source={logoImg}/>
                <Text style={styles.TextBold}>MalyFinder</Text>
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

                
                <Text style={styles.TextRecuperar} onPress={abrirPOP}>Recuperar a senha</Text>

            <TouchableOpacity style={styles.button} onPress={handleLoginPress} disabled={loading}>
            {showText && <Text style={styles.text}>Login</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}
                
                <View style={styles.containerRecuperar}>
                <Text style={styles.Textm}>Não tem uma conta?</Text>
                <Text style={styles.Text2} onPress={handleRegisterPress}>Criar agora</Text>
                </View>



                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showPopup}
                      style={styles.modalContainer}
                      presentationStyle="overFullScreen"
                      onRequestClose={() => setShowPopup(false)}
                       >
                      <View style={styles.modalView}>
                          <Feather name="help-circle" size={42} color="rgba(41, 82, 74, 0.68)" />
                          <Text style={styles.titlePopUp}>Esqueceu a senha?</Text>
                          <Text>Por favor, insira seu endereço de e-mail.</Text>

                          <TextInput
                          style={styles.inputPopUp}
                          placeholder='Digite o seu e-mail'
                          value={recuperaEmail}
                          onChangeText={(text) => setRecuperaEmail(text)}
                          />
                          
                          <View style={styles.botoes}>
                              <TouchableOpacity style={styles.sim} onPress={handlePasswordReset}>
                                <Text style={styles.textButton}>Confirmar</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.nao} onPress={() => setShowPopup(false)}>
                                <Text >Cancelar</Text>
                              </TouchableOpacity>

                          </View>
                         

                        
                          
                      
                      </View>
                </Modal>  

             </View>
        </View>
    )
}
