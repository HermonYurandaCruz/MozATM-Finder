import React, {useEffect,useState} from "react";
import {Image,View,ActivityIndicator,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,route } from '@react-navigation/native';

import styles from './styles';
import { AntDesign,Feather, Ionicons,Entypo  } from '@expo/vector-icons';
import api from '../../services/api'

import bankInfra from '../../../src/assets/bankInfra.png'
import UpdateBank from "../UpdateBank";



export default function StoreAdd(){
  const navigation = useNavigation();
  const [instituicoes,setInstituicoes] = useState([])
  const [estado, setEstado] = useState('')


  async function loadInstituicoes(){
    const userId = await AsyncStorage.getItem('userId');
    const response= await api.get(`/maly/searchMalyByIdUser?id=${userId}`);
    setInstituicoes(response.data)
  }
  

  const handleUpdate = (item) => {
    navigation.navigate('UpdateBank', { itemId: item });
  };
  

  const deleteMaly= async (idItem)=>{
    const dataToUpdate = {
      estado: "0",
    };
    
    try {
      const response = await api.put(`/maly/${idItem}`, dataToUpdate);
      console.log('Resposta da atualização:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar o recurso:', error);
    }
    loadInstituicoes();
  }

  useEffect(()=>{
    loadInstituicoes();
  },[]);


    return(
      <View style={styles.container}>
        <Text style={styles.Text}>Instituicoes Bancarias</Text>

        <View style={styles.inputPesquisa}>
            <Feather name="search" size={20} color="#19191B" />
            <TextInput
                  placeholder='Pesquisar Banco ou ATM'
                  style={styles.input}
                  />
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

                        <View style={styles.buttonsCard}>

                           <TouchableOpacity style={styles.buttonDireção} onPress={()=>deleteMaly(instituicao.id)} >
                              <AntDesign name="delete" size={18} color="#DD5757" />
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.buttonDireção} onPress={() => handleUpdate(instituicao.id)} >
                              <AntDesign name="edit" size={18} color="rgba(41, 82, 74, 0.68)" />
                          </TouchableOpacity>
                        </View>

                    </View>

                    

              </View>


            )}
            >
            

          </FlatList>
      </View>
    )
}