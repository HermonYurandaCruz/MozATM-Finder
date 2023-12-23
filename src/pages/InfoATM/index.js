import React,{useState,useEffect} from "react";
import {View,KeyboardAvoidingView,Text,Image,TouchableOpacity, TextInput, ActivityIndicator, FlatList} from 'react-native';
import { Ionicons,Octicons,MaterialCommunityIcons  } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

import api from '../../services/api'

import bankInfra from '../../../src/assets/imagem.png';
import perfilImg from '../../../src/assets/perfil.png'



export default function InfoATM(){
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { itemId } = route.params;
  const [data,setData]= useState([])
  const [comentarios,setComentarios]= useState([]);
  const [dia, setDia] = useState('')
  const [textComentario, setTextComentario] = useState('')
  const [userName, setUserName] = useState('')
  const [idMaly, setIdMaly] = useState('')

  
  const [showText, setShowText] = useState(true);
  const [errorText, setErrorText] = useState('');

  



  function getCurrentDate() {
    const currentDate = new Date();
    return format(currentDate, 'dd/MM/yyyy HH:mm');
  }

  const getMalyData = async (itemId) => {
    try {
      const response = await api.get(`/maly/searchMalyById?id=${itemId}`);
      setData(response.data)
      setIdMaly(itemId)
      return response.data; // Retorna os dados do usuário
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  };

  const getUserData = async (userId) => {
    try {
      const response = await api.get(`/user/searchUserById?id=${userId}`);
      return response.data; // Retorna os dados do usuário
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  };

    const loadComentarios = async(itemId)=>{
      const userId = await AsyncStorage.getItem('userId');

      const userData = await getUserData(userId);
      setUserName(userData.nome);
      const response = await api.get(`/comentarios/searchComentarioByIdMaly?id=${itemId}`);
      setComentarios(response.data)
  }

  const enviarComentario = async () => {
    const userId = await AsyncStorage.getItem('userId');
    
    console.log('Usuário criado:',idMaly,userId, userName,dia,textComentario);


    try{  
      
      const response = await api.post('/comentarios', {
      
        id_maly: idMaly,
        id_user:userId,
        nomeUser:userName,
        data:dia,
        textComentario:textComentario      
    });
    
    console.log('Usuário criado:', response.data);


    }catch (error){
      console.error('Erro ao registrar usuário:', error);


    }
    setTextComentario("");
    loadComentarios(itemId);

  }

  useEffect(() => {
    getMalyData(itemId);
    loadComentarios(itemId);
    const today = getCurrentDate();
    setDia(today)
    
  }, []);


    return(
      <View style={styles.container}>
       <View style={styles.heade}>
          <Ionicons name="arrow-back-outline" size={24} color="black" onPress={()=>navigation.goBack()} />
          <Text style={styles.Titulo}>{data.nomeInstituicao}</Text>
          <Octicons style={styles.iconARch} name="archive" size={20} color="black" />
       </View>

       {loading && (
                  <ActivityIndicator size="small"  color="#000" style={styles.loadingIndicator} />
                )}
                <Image
                  style={styles.ImagemBank}
                  source={{uri:data.foto_urlMaly}}
                  onLoadEnd={() => setLoading(false)}
                />




        
        <View style={styles.UserNameAdd}>
          <Text>Adicioado Por:</Text>
          <Text>{data.userNomeAdd}</Text>
        </View>

        <View style={styles.dados}>
          <TouchableOpacity style={styles.gosto}>
          <MaterialCommunityIcons name="cards-heart-outline" size={16} color="black" />
            <Text>
             {data.curtidas}
            </Text>
          </TouchableOpacity>

          <View style={styles.Hora}>
          <Ionicons name="time-outline" size={16} color="black" />
                  <Text>
                  08:00–15:00
                  </Text>
          </View>

          <TouchableOpacity style={styles.buttonDireção}>
                        <MaterialCommunityIcons name="directions" size={16} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Direção</Text>    
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonMais}>
                        <Text style={styles.textButton}>Mais</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.Text}>Comentarios</Text>


        <FlatList
          style={styles.caixaComentarios}
          data={comentarios}
          showsVerticalScrollIndicator={false}
          keyExtractor={comentarios=> String(comentarios.id)} 
          renderItem={({item:comentarios})=>(
            <View style={styles.comentario}>
            <Image source={perfilImg}/>
            <View style={styles.dadosComentario}>
              <Text style={styles.NomeUser}>{comentarios.nomeUser}</Text>
              <View style={styles.caixaComentario}>
              <Text style={styles.conteudoComentario} >{comentarios.textComentario}</Text>
              </View>
              <Text style={styles.Data}>{comentarios.data}</Text>
            </View>
          </View>
          )}
        >
        </FlatList>

       

       <KeyboardAvoidingView
       style={styles.escreverComentario}
       behavior="padding" >
        <TextInput
                  placeholder='Adicionar comentario'
                  value={textComentario}
                  onChangeText={(text) => setTextComentario(text)}
                  style={styles.input}
                  />
         <TouchableOpacity style={styles.Enviar} onPress={enviarComentario}>
             <MaterialCommunityIcons name="send-outline" size={24} color="black" />
          </TouchableOpacity>
       </KeyboardAvoidingView>

      </View>
    )
}