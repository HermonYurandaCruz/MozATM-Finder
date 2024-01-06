import React, {useEffect,useState} from "react";
import {Image,View,Modal,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,route } from '@react-navigation/native';

import styles from './styles';
import { AntDesign,MaterialCommunityIcons, Ionicons,Entypo  } from '@expo/vector-icons';

import {firebase} from '../../services/firebaseConfig'



export default function StoreAdd(){
  const navigation = useNavigation();
  const [instituicoes,setInstituicoes] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [userId, setUserId] = useState('')
  const [idMaly, setIdMaly] = useState('')

  const [userData, setUserData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Pendentes');



  const handleTabChange = async (tabName) => {
    setSelectedTab(tabName);

    if (tabName === 'Pendentes') {

      const malyRef = firebase.firestore().collection('maly');

      const querySnapshot = await malyRef
      .where('idUser', '==', userId)
      .where('estado', '==', '0')
      .get();
      const malys = [];
      
      querySnapshot.forEach((doc) => {
        malys.push({ id: doc.id, ...doc.data() });
      });
      setInstituicoes(malys)
      setUserId(userData.id)
      
    } else if (tabName === 'Aceites') {
      const malyRef = firebase.firestore().collection('maly');

      const querySnapshot = await malyRef
      .where('idUser', '==', userId)
      .where('estado', '==', '1')
      .get();
      const malys = [];
      
      querySnapshot.forEach((doc) => {
        malys.push({ id: doc.id, ...doc.data() });
      });
      setInstituicoes(malys)
      setUserId(userData.id)
    }


  };

  const retrieveUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData !== null) {
        setUserData(JSON.parse(storedUserData));
        console.log('dados do usuario4',userData.id)

      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do usuário:', error);
      // Tratar erros ao recuperar dados do AsyncStorage
    }
  };

  async function loadMalyAddUser(){
    const malyRef = firebase.firestore().collection('maly');

    const querySnapshot = await malyRef
    .where('idUser', '==', userId)
    .where('estado', '==', '0')
    .get();
    const malys = [];
    
    querySnapshot.forEach((doc) => {
      malys.push({ id: doc.id, ...doc.data() });
    });
    setInstituicoes(malys)
    setUserId(userData.id)

  }

  async function loadMalyAddUserAceite(){
    const malyRef = firebase.firestore().collection('maly');

    const querySnapshot = await malyRef
    .where('idUser', '==', userId)
    .where('estado', '==', '1')
    .get();
    const malys = [];
    
    querySnapshot.forEach((doc) => {
      malys.push({ id: doc.id, ...doc.data() });
    });
    setInstituicoes(malys)
    setUserId(userData.id)

  }


 
  const handleDelete = async (docId) => {
  
    try {
      await firebase.firestore().collection('maly').doc(docId).delete();
      console.log('Documento excluído com sucesso!');
      loadMalyAddUser()
      setShowPopup(false);

    } catch (error) {
      console.error('Erro ao excluir o documento:', error);
    }
  };

  const abrirPOP= async (id)=>{
    setShowPopup(true);
    setIdMaly(id)
    console.log(' entrou no metodo ');
  }
  
  


  useEffect(() => {
    retrieveUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setUserId(userData.id);
    }
  }, [userData]);

  useEffect(() => {
    if (userId) {
      loadMalyAddUser();
    }
  }, [userId]);

  



    return(
      <View style={styles.container}>
        <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" onPress={()=>navigation.goBack()} />
                    <Text style={styles.Text}>Historico de contribuições</Text>
                </View>
    
          <View style={styles.navStore}>
            <TouchableOpacity onPress={() => handleTabChange('Pendentes')} style={[styles.tab, selectedTab === 'Pendentes' && styles.selectedTab]}>
              <Text style={selectedTab === 'Pendentes' ? styles.selectedText : styles.tabText}>Pendentes</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleTabChange('Aceites')} style={[styles.tab, selectedTab === 'Aceites' && styles.selectedTab]}>
              <Text style={selectedTab === 'Aceites' ? styles.selectedText : styles.tabText}>Aceites</Text>
            </TouchableOpacity>
          </View>
    

           <FlatList 
              data={instituicoes}
              showsVerticalScrollIndicator={false}
              keyExtractor={instituicao=> String(instituicao.id)} 
              renderItem={({item:instituicao})=>(
              
              <View  style={styles.CardBank} >
                   <Image
                    style={styles.imgBank}
                    source={{ uri:instituicao.foto_urlInstituicao }}
                  />
                 

                    <View style={styles.infoBank}>
                      <Text style={styles.TextNomeBank}>{instituicao.nomeInstituicao}</Text>

                      <Text style={styles.TextAndereco}> 
                      <Ionicons name="md-location-outline" size={16} color="black" />
                      {instituicao.endereco}</Text>

                      <View style={styles.Hora}>
                        <Text>
                        <Ionicons name="time-outline" size={16} color="black" />
                        {instituicao.data}
                        </Text>
                  
                       </View>

                       <View style={styles.Hora}>
                        <Text>Estado: </Text>
                        <Text>{instituicao.estado == 0 ? 'Pendente' : 'Aceite'}</Text>
              
                       </View>

                        <View style={styles.buttonsCard}>
                           <TouchableOpacity style={styles.buttonDireção} onPress={()=>abrirPOP(instituicao.id)} >
                              <AntDesign name="delete" size={18} color="#DD5757" />
                          </TouchableOpacity>
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
                         <MaterialCommunityIcons name="delete-outline" size={42} color="#DD5757" />
                          <Text style={styles.titlePopUp}>Apagar Arquivo</Text>
                          <Text>Tem certeza de que deseja Apagar este Arquivo?</Text>

                          <View style={styles.botoes}>
                              <TouchableOpacity style={styles.sim} onPress={()=>handleDelete(idMaly)}>
                                <Text style={styles.textButton}>Sim</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.nao} onPress={() => setShowPopup(false)}>
                                <Text >Não</Text>
                              </TouchableOpacity>

                          </View>
                                              
                        </View>
                </Modal>  
                    </View>

                    

              </View>


            )}
            >
            

          </FlatList>
      </View>
    )
}