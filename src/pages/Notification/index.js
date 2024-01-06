import React, {useEffect,useState} from "react";
import {Image,View,ActivityIndicator,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,route } from '@react-navigation/native';

import styles from './styles';
import { AntDesign,Feather, Ionicons,Entypo  } from '@expo/vector-icons';
import api from '../../services/api'

import {firebase} from '../../services/firebaseConfig'



export default function Notification(){
  const navigation = useNavigation();
  const [instituicoes,setInstituicoes] = useState([])
  const [estado, setEstado] = useState('0')
  const [userId, setUserId] = useState('')
  const [userData, setUserData] = useState(null);





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
    .where('estado', '==', '1')
    .get();
    const malys = [];
    
    querySnapshot.forEach((doc) => {
      malys.push({ id: doc.id, ...doc.data() });
    });
    setInstituicoes(malys)
    setUserId(userData.id)

  }




 
  const handleUpdateEstado = async (docId) => {
    // ... seu código para definir os valores dos campos a serem atualizados
  
    try {
    
      const updateData = {
        estado:"0"
        // ... outros campos a serem atualizados
      };
  
      // Atualize o documento no Firestore usando o método update
      await firebase.firestore().collection('maly').doc(docId).update(updateData);
  
    } catch (error) {
    } 
  };
  
  

  const handleUpdate = (item) => {
    navigation.navigate('UpdateBank', { itemId: item });
  };

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
                    <Text style={styles.Text}>Notificações </Text>
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
                    </View>                  
              </View>


            )}
            >
            

          </FlatList>
      </View>
    )
}