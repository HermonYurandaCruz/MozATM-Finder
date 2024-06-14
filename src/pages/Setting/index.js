import React, { useState,useEffect,useLayoutEffect } from 'react';
import {View,Linking,ScrollView, Modal,TouchableOpacity,Text,Image} from 'react-native';
import { AntDesign,Ionicons,MaterialCommunityIcons,Feather,MaterialIcons } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import imgMan from '../../assets/man.png';
import imgWoman from '../../assets/woman.png';


export default function Setting(){
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState('')

  const [fotoPerfil, setFotoPerfil] = useState('')

  const [userApelido, setUserApelido] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userId, setUserId] = useState('')
  const [estado, setEstado] = useState('')
  const[genero, setGenero]=useState('')
  const[imagem, setImagem]=useState('')
  const[statusTeachers, setStatusTeachers]=useState(false)



  const retrieveUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData !== null) {
        const userData = JSON.parse(storedUserData);
        setUserId(userData.id);
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do usuário:', error);
      // Tratar erros ao recuperar dados do AsyncStorage
    }
  };
  


  const carregarDadosAtuais = () => {
    const userRef = firebase.firestore().collection('users').doc(userId);
    userRef.onSnapshot((userDoc) => {
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserName(userData.nome );
        setUserEmail(userData.email );
        setGenero(userData.sexo)
        setStatusTeachers(userData.statusTeachers) 

      } 
    });
  };

  useEffect(()=>{
    if(genero=='masculino'){
        setImagem(imgMan)
    }
    if(genero=='feminino'){
        setImagem(imgWoman)
    }
  })

  const abrirPOP= async ()=>{
    setShowPopup(true);

  }

  const UpdateProfile=()=>{
    navigation.navigate('UpdateProfile', { itemId: userId });
    
  }

  const UpdatePassword=()=>{

    navigation.navigate('UpdatePassword', { itemId: userId, emailUser:userEmail });
    
  }



  const openProfile = () => {
    navigation.navigate('Profile' , { itemId: userId });
  };

  const openHelp = () => {
    navigation.navigate('Help');
  };

  const openAdmin = () => {
    navigation.navigate('EducationTeachers',{idUser:userId});
  };

  const openAddMarca = () => {
    // navigation.navigate('AddMarca');
  };

  const ListUsers = () => {
    // navigation.navigate('AdminListUser');
  };

  const AdminListStands = () => {
    // navigation.navigate('AdminListStands');
  };
  const handleVendas = async () => {
    // navigation.navigate('StoredCar', {itemIdUser:userId });
  };

  const openStoredCar= () => {
    // navigation.navigate('RescuedCars',{itemIdUser:userId});
  };


const openURLServicos=async()=>{
  const url = 'https://movhamozsuport.netlify.app/termos_condicoes.html'; // TERMOS DE USO URL que deseja abrir
  
  const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error('Não é possível abrir o link:', url);
    }
}

  const openURLPoliticas = async () => {
    const url = 'https://movhamozsuport.netlify.app/politica_privacidade.html'; //  URL que deseja abrir

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
      // navigation.popToTop('Login');
      navigation.navigate('Login');
      setShowPopup(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }



  



  const renderizarComponentes  = () => {

  if (statusTeachers == true) {
    return (
      <View>
        <TouchableOpacity style={styles.botoes} onPress={openAdmin}>
          <AntDesign name="addfile" size={20} color="#000" />    
          <Text style={styles.texto}>Cursos que sou Intrutor</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.botoes} onPress={ListUsers}>
          <AntDesign name="addusergroup" size={20} color="#000" />    
          <Text style={styles.texto}>Lista de Alunos</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.botoes} onPress={AdminListStands}>
          <MaterialCommunityIcons name="briefcase-check-outline" size={20} color="#000"/>
          <Text style={styles.texto}>Estatisticas</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        
      </View>
    );
  }
  return null; 
};



useEffect(() => {
  retrieveUserData();
}, []);

useEffect(() => {
  if(userId){
    carregarDadosAtuais()
  }
}, [userId]);


  



    return(
      <View style={styles.container}>

          <View style={styles.heade}>
                    <Text style={styles.UserName} >Definições</Text>
          </View>
          
         
          <ScrollView
        showsVerticalScrollIndicator={false}
        >

          <TouchableOpacity style={{flexDirection:"row", padding:8,backgroundColor:"#FFFFFF",borderRadius:8}} onPress={openProfile}>
            <Image style={{width:60,height:60, borderRadius:100}} resizeMode='contain' source={imagem}></Image>
            <View style={{marginStart:6}}>
              <Text style={{fontSize:18,fontWeight:"bold"}}>{userName} {userApelido}</Text>
              <Text >{userEmail}</Text>
            </View>
          </TouchableOpacity>

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


                <TouchableOpacity style={styles.botoes} onPress={handleVendas}>
                  <MaterialIcons name="history" size={20} color="black" />
                  <Text style={styles.texto}>Historico de vendas</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

                <TouchableOpacity style={styles.botoes} onPress={openStoredCar}>
                  <MaterialIcons name="bookmark-outline" size={20} color="black" />
                  <Text style={styles.texto}>Guardados</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

            </View>

            <Text style={styles.Titulo}>Suporte</Text>
            <View style={styles.box}>
                
                <TouchableOpacity style={styles.botoes} onPress={openHelp} >
                <Feather name="alert-triangle" size={22} color="black" />                  
                <Text style={styles.texto}>Obter ajuda</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

                
                <TouchableOpacity style={styles.botoes}onPress={openURLServicos}>
                  <Feather name="briefcase" size={20} color="black" />
                  <Text style={styles.texto}>Termos e Condições</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>


                <TouchableOpacity style={styles.botoes} onPress={openURLPoliticas}>
                  <AntDesign name="lock" size={20} color="black" />   
                  <Text style={styles.texto}>Política de Privacidade</Text>
                </TouchableOpacity>
                <View style={styles.separator}></View>

            </View>

            <Text style={styles.Titulo}>Conta</Text>
            <View style={styles.box}>
            {renderizarComponentes()}
                <TouchableOpacity style={styles.botoes} onPress={abrirPOP}>
                  <MaterialIcons name="logout" size={20} color="#F23232" />
                  <Text style={styles.textoSair}>Terminar sessão</Text>
                </TouchableOpacity>


          
  
                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showPopup}
                      style={styles.modalContainer}
                      presentationStyle="overFullScreen"
                      onRequestClose={() => setShowPopup(false)}
                       >
                      <View style={styles.modalView}>
                          <MaterialIcons name="logout" size={32} color="#4177FF" />
                          <Text>Tem certeza de que deseja sair?</Text>

                              <TouchableOpacity style={styles.sim} onPress={handleLogout}>
                                <Text >Sim</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.nao} onPress={() => setShowPopup(false)}>
                                <Text style={styles.textButton}>Não</Text>
                              </TouchableOpacity>
                      
                      </View>
                </Modal>  


            </View>
         
            </ScrollView>

      </View>
    )
}