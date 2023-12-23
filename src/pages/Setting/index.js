import React, { useState,useEffect } from 'react';
import {View,Linking, Modal,TouchableOpacity,Text,Image} from 'react-native';
import perfilImg from '../../../src/assets/perfil.png';
import { AntDesign,Ionicons,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api'
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import { tr } from 'date-fns/locale';



export default function Setting(){
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const email = 'hermondacruz73@gmail.com'; // E-mail pré-definido
  const body = ` `;


  const abrirPOP= async ()=>{
    setShowPopup(true);
    console.log(' entrou no metodo ');

  }

  const openStoreAdd = () => {
    navigation.navigate('StoreAdd');
  };

  const handleLogout = async () => {
    try {
      // Limpa o ID do usuário do AsyncStorage
      await AsyncStorage.removeItem('userId');
      // Redireciona o usuário de volta para a tela de login
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
  const enviarEmail=async()=>{
    const subject = 'Suporte- Obter Ajuda';
    const mailTo = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(mailTo);
  }


    return(
      <View style={styles.container}>
          <View style={styles.heade}>
                    <Text style={styles.TextHeade}>Perfil</Text>
          </View>
          
        

          <View style={styles.perfil}>
            <Image style={styles.img} source={perfilImg}/>
            <Text style={styles.textoNome}>Nome User</Text>
            <Text style={styles.textoEmail}>e-mail</Text>
          </View>

          <Text style={styles.Titulo}>Perfil</Text>
           
            <View style={styles.box}>
                
                <View style={styles.botoes}>
                  <AntDesign name="edit" size={20} color="black" />
                  <Text style={styles.texto}>Editar Perfil</Text>
                </View>
                <View style={styles.separator}></View>

                <View style={styles.botoes}>
                  <MaterialCommunityIcons name="form-textbox-password" size={20} color="black" />
                  <Text style={styles.texto}>Mudar senha</Text>
                </View>
                <View style={styles.separator}></View>


                <TouchableOpacity style={styles.botoes} onPress={openStoreAdd}>
                  <MaterialIcons name="history" size={20} color="black" />
                  <Text style={styles.texto}>Historico de contribuições</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

            </View>

            <Text style={styles.Titulo}>Suporte</Text>
            <View style={styles.box}>
                
                <TouchableOpacity style={styles.botoes} onPress={enviarEmail} >
                  <Ionicons name="md-help-buoy-outline" size={20} color="black" />
                  <Text style={styles.texto}>Obter ajuda</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

                
                <View style={styles.botoes}>
                  <Ionicons name="ios-document-text-outline" size={20} color="black" /> 
                  <Text style={styles.texto}>Ver termos e serviços</Text>
                </View>
                <View style={styles.separator}></View>


                <View style={styles.botoes}>
                  <AntDesign name="lock" size={20} color="black" />   
                  <Text style={styles.texto}>Ver politicas de privacidade</Text>
                </View>
                <View style={styles.separator}></View>

            </View>

            <Text style={styles.Titulo}>Conta</Text>
            <View style={styles.box}>
                <TouchableOpacity style={styles.botoes} onPress={abrirPOP}>
                  <MaterialIcons name="logout" size={20} color="black" />
                  <Text style={styles.texto}>Terminar sessão</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>


                <View style={styles.botoes}>
                  <AntDesign name="deleteuser" size={20} color="black" />
                  <Text style={styles.texto}>Apagar conta</Text>
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
                          <MaterialIcons name="logout" size={42} color="rgba(41, 82, 74, 0.68)" />
                          <Text style={styles.titlePopUp}>Terminar sessão</Text>
                          <Text>Tem certeza de que deseja sair?</Text>

                          <View style={styles.botoes}>
                              <TouchableOpacity style={styles.sim} onPress={handleLogout}>
                                <Text style={styles.textButton}>Sim</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.nao} onPress={() => setShowPopup(false)}>
                                <Text style={styles.textButton}>Não</Text>
                              </TouchableOpacity>

                          </View>
                         

                        
                          
                      
                      </View>
                </Modal>  

                <View style={styles.separator}></View>


            </View>
         


      </View>
    )
}