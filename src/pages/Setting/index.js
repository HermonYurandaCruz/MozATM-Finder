import React, { useState,useEffect } from 'react';
import {View,Linking,ScrollView, Modal,TouchableOpacity,Text,Image} from 'react-native';
import perfilImg from '../../../src/assets/perfil.png';
import { AntDesign,Ionicons,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import { tr } from 'date-fns/locale';



export default function Setting(){
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState('')
  const [imagemPerfil, setImagemPerfil] = useState('')

  const [userApelido, setUserApelido] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userId, setUserId] = useState('')


  const email = 'hermondacruz73@gmail.com'; // E-mail pré-definido
  const body = ` `;

  const retrieveUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData !== null) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do usuário:', error);
      // Tratar erros ao recuperar dados do AsyncStorage
    }
  };


  const carregarDadosAtuais = async () => {
    try {
      const userRef = firebase.firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();
  
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserName(userData.nome || '');
        setUserApelido(userData.sobreNome || '');
        setUserEmail(userData.email || '');
        setImagemPerfil(userData.fotoURL || perfilImg)
      } else {
        console.error('Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const abrirPOP= async ()=>{
    setShowPopup(true);
    console.log(' entrou no metodo ');

  }

  const UpdateProfile=()=>{
    console.log('id do usuario antes',userId)

    navigation.navigate('UpdateProfile', { itemId: userId });
    
  }

  const UpdatePassword=()=>{
    console.log('id do usuario antes',userId)

    navigation.navigate('UpdatePassword', { itemId: userId, emailUser:userEmail });
    
  }

  const openStoreAdd = () => {
    navigation.navigate('StoreAdd');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Login');
      setShowPopup(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
  const enviarEmail=async()=>{
    const subject = 'Suporte- Obter Ajuda';
    const mailTo = `mailto:${email}?subject=${subject}&body=${body}`;
    Linking.openURL(mailTo);
  }


  const renderizarImagem = () => {
    if (imagemPerfil) {
      return <Image style={styles.img} source={{ uri: imagemPerfil }} />;
    } else {
      return <Image style={styles.img} source={perfilImg} />;
    }
  };

  useEffect(() => {
    retrieveUserData();
  }, []);

  useEffect(() => {
    if (userData) {
        setUserId(userData.id)
    }
  }, [userData]);
  useEffect(()=>{
    carregarDadosAtuais();
    renderizarImagem();
  })



    return(
      <View style={styles.container}>

          <View style={styles.heade}>
                    <Text style={styles.TextHeade}>Perfil</Text>
          </View>
          
         
          <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        >

          <View style={styles.perfil}>
          {renderizarImagem()}
            <Text style={styles.textoNome}>{userName} {userApelido}</Text>
            <Text style={styles.textoEmail}>{userEmail}</Text>
          </View>

          <Text style={styles.Titulo}>Perfil</Text>
           
            <View style={styles.box}>
                
                <TouchableOpacity style={styles.botoes} onPress={UpdateProfile}>
                  <AntDesign name="edit" size={20} color="black" />
                  <Text style={styles.texto}>Editar Perfil</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

                <TouchableOpacity style={styles.botoes} onPress={UpdatePassword}>
                  <MaterialCommunityIcons name="form-textbox-password" size={20} color="black" />
                  <Text style={styles.texto}>Mudar senha</Text>
                </TouchableOpacity>
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
         
            </ScrollView>

      </View>
    )
}