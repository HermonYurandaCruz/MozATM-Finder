import React, { useState,useEffect,useLayoutEffect } from 'react';
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
  const [servico, setServico] = useState('')

  const [userApelido, setUserApelido] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userId, setUserId] = useState('')

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


  const carregarDadosAtuais = (userId) => {
    const userRef = firebase.firestore().collection('users').doc(userId);
    userRef.onSnapshot((userDoc) => {
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserName(userData.nome || '');
        setUserApelido(userData.sobreNome || '');
        setUserEmail(userData.email || '');
        setImagemPerfil(userData.fotoURL || perfilImg)
      } else {
        setUserName('');
        setUserApelido('');
        setUserEmail('');
        setImagemPerfil(perfilImg);
        console.error('Usuário não encontrado.');
      }
    });
  };



  const abrirPOP= async ()=>{
    setShowPopup(true);

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

  const openHelp = () => {
    navigation.navigate('Help');
  };

  const openAdmin = () => {
    navigation.navigate('Admin');
  };


const openURLServicos=async()=>{
  const url = 'https://malyspot.netlify.app/termos.html'; // TERMOS DE USO URL que deseja abrir
  
  const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error('Não é possível abrir o link:', url);
    }
}

  const openURLPoliticas = async () => {
    const url = 'https://malyspot.netlify.app/privace.html'; //  URL que deseja abrir

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error('Não é possível abrir o link:', url);
    }
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



  const renderizarImagem = () => {
    if (imagemPerfil) {
      return <Image style={styles.img} source={{ uri: imagemPerfil }} />;
    } else {
      return <Image style={styles.img} source={perfilImg} />;
    }
  };



  const renderizarComponentes  = () => {
    console.log(' entrou no  userEmail', userEmail);

  if (userEmail === 'malyFinder@gmail.com') {
    return (
      <View>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.botoes} onPress={openAdmin}>
          <MaterialIcons name="logout" size={20} color="#000" />
          <Text style={styles.texto}>Adicionar Dados</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return null; // Retorna null se o email não corresponder
};

  useEffect(() => {
    retrieveUserData();
  }, []);

  useEffect(() => {
    if (userData) {
        setUserId(userData.id)
        carregarDadosAtuais(userData.id)

    }

  }, [userData]);
  useEffect(()=>{
    renderizarImagem();
  },)

  



    return(
      <View style={styles.container}>

          <View style={styles.heade}>
                    <Text style={styles.TextHeade}>Definições</Text>
          </View>
          
         
          <ScrollView
        showsVerticalScrollIndicator={false}
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
                
                <TouchableOpacity style={styles.botoes} onPress={openHelp} >
                  <Ionicons name="md-help-buoy-outline" size={20} color="black" />
                  <Text style={styles.texto}>Obter ajuda</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

                
                <TouchableOpacity style={styles.botoes}onPress={openURLServicos}>
                  <Ionicons name="ios-document-text-outline" size={20} color="black" /> 
                  <Text style={styles.texto}>Ver termos e serviços</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>


                <TouchableOpacity style={styles.botoes} onPress={openURLPoliticas}>
                  <AntDesign name="lock" size={20} color="black" />   
                  <Text style={styles.texto}>Ver politicas de privacidade</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

            </View>

            <Text style={styles.Titulo}>Conta</Text>
            <View style={styles.box}>
                <TouchableOpacity style={styles.botoes} onPress={abrirPOP}>
                  <MaterialIcons name="logout" size={20} color="#F23232" />
                  <Text style={styles.textoSair}>Terminar sessão</Text>
                </TouchableOpacity>

                {renderizarComponentes()}

          

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
                                <Text >Sim</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.nao} onPress={() => setShowPopup(false)}>
                                <Text style={styles.textButton}>Não</Text>
                              </TouchableOpacity>

                          </View>
                         

                        
                          
                      
                      </View>
                </Modal>  


            </View>
         
            </ScrollView>

      </View>
    )
}