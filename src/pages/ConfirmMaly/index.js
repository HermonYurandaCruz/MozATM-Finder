import React, {useEffect,useState} from "react";
import {Image,View,Modal,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,route } from '@react-navigation/native';

import styles from './styles';
import { AntDesign,MaterialCommunityIcons, Ionicons,MaterialIcons  } from '@expo/vector-icons';

import {firebase} from '../../services/firebaseConfig'



export default function ConfirmMaly(){
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
    .where('estado', '==', '0')
    .get();
    const malys = [];
    
    querySnapshot.forEach((doc) => {
      malys.push({ id: doc.id, ...doc.data() });
    });
    setInstituicoes(malys)
    setUserId(userData.id)

  }

  
  const handleInformacoes = (id) => {
    navigation.navigate('InfoATM', { itemId: id });
  };


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

 
  const handleConfirmar = async (docId) => {
  
    try {
      const userRef = firebase.firestore().collection('maly').doc(docId);
      console.log('Documento Confirmado com sucesso!');
      await userRef.update({
        estado: "1",
      });
      loadMalyAddUser();
    } catch (error) {
      console.error('Erro ao confirmar o documento:', error);
    }
  };

  const handleNaoConfirmar = async (docId) => {
  
    try {
      const userRef = firebase.firestore().collection('maly').doc(docId);
      console.log('Documento nao Confirmado!');
      await userRef.update({
        estado: "0",
      });
      loadMalyAddUser()
    } catch (error) {
      console.error('Erro ao desabilitar o documento:', error);
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
                    <Ionicons name="arrow-back-outline" size={24} color="rgba(25, 25, 27, 0.9)" onPress={()=>navigation.goBack()} />
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
              
              <TouchableOpacity  style={styles.CardBank} onPress={() => handleInformacoes(instituicao.id)} >
                   <Image
                    style={styles.imgBank}
                    source={{ uri:instituicao.foto_urlInstituicao }}
                  />
                 

                    <View style={styles.infoBank}>
                      <Text style={styles.TextNomeBank}>{instituicao.nomeInstituicao}</Text>

                      <Text style={styles.TextAndereco}> 
                      <Ionicons name="md-location-outline" size={16} color="rgba(25, 25, 27, 0.9)" />
                      {instituicao.endereco}</Text>

                      <View style={styles.Hora}>
                        <Text style={styles.TextTypoBank}>
                        <Ionicons name="time-outline" size={16} color="rgba(25, 25, 27, 0.9)" />
                         {instituicao.data}
                        </Text>
                  
                       </View>

                       <View style={styles.Hora}>
                       <MaterialCommunityIcons name="list-status" size={16} color="rgba(25, 25, 27, 0.9)" />
                       <Text> {instituicao.estado == 0 ? 'Pendente' : 'Aceite'}</Text>
              
                       </View>

                        <View style={styles.buttonsCard}>
                          
                          <TouchableOpacity style={styles.buttonDireção} onPress={()=>handleConfirmar(instituicao.id)} >
                              <MaterialIcons name="done" size={18} color="#0CCE6B" />
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.buttonDireção} onPress={()=>handleNaoConfirmar(instituicao.id)} >
                             <MaterialIcons name="cancel-presentation" size={18} color="#DD5757" />    
                          </TouchableOpacity>

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

                    

              </TouchableOpacity>


            )}
            >
            

          </FlatList>
      </View>
    )
}