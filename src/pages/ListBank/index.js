import React, {useEffect,useState} from "react";
import {Image,View,ActivityIndicator,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';

import styles from './styles';
import { MaterialCommunityIcons ,Feather,AntDesign ,Entypo  } from '@expo/vector-icons';
import api from '../../services/api'

import bankInfra from '../../../src/assets/bankInfra.png'



export default function ListBank(){
  const [instituicoes,setInstituicoes] = useState([])
  const [loading, setLoading] = useState(true);

  async function loadInstituicoes(){
    const response= await api.get('instituicoes');
    setInstituicoes(response.data)
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
            keyExtractor={instituicao=> String(instituicao.idInstituicao)} 
            renderItem={({item:instituicao})=>(
              <View  style={styles.CardBank}>
                {loading && (
                  <ActivityIndicator size="small"  color="#000" style={styles.loadingIndicator} />
                )}
                <Image
                  style={styles.imgBank}
                  source={{ uri:instituicao.foto_url }}
                  onLoadEnd={() => setLoading(false)} 
                />


              <View style={styles.infoBank}>
                <Text style={styles.TextNomeBank}>{instituicao.nome}</Text>

                <View style={styles.Hora}>
                  <Text>
                  <AntDesign name="heart" size={18} color="rgba(221, 87, 87, 1)" /> 
                  </Text>
                  <Text style={styles.curtidasText}>
                  {instituicao.curtidas}
                  </Text>
                </View> 
              </View>

              </View>


            )}
            >
            

          </FlatList>
      </View>
    )
}