import React,{useState,useEffect} from "react";
import {View,Modal,KeyboardAvoidingView,Text,Image,TouchableOpacity, TextInput, ActivityIndicator, FlatList} from 'react-native';
import {MaterialIcons, Ionicons,AntDesign,MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

import {firebase} from '../../services/firebaseConfig'

import perfilImg from '../../../src/assets/perfil.png'



export default function InfoATM(){
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);


  const route = useRoute();
  const { itemId } = route.params;
  const [data,setData]= useState([]);
  const [dataInst,setDataInst]= useState([]);


  const [userData, setUserData] = useState(null);
  const [comentarios,setComentarios]= useState([]);
  const [dia, setDia] = useState('')
  const [textComentario, setTextComentario] = useState('')
  const [userName, setUserName] = useState('')
  const [imagemPerfil, setImagemPerfil] = useState('')
  const [userId, setUserId] = useState('')
  const [idInstituicao, setIdInstituicao] = useState('')
  
  const [curtida, setCurtida] = useState(false);
  const [curtidas, setCurtidas] = useState(0);
  const [curtidasInst, setCurtidasInst] = useState(0);

  const[ numeroCancela,setNumeroCancela]= useState('')

  const [idMaly, setIdMaly] = useState('')

  


  



  function getCurrentDate() {
    const currentDate = new Date();
    return format(currentDate, 'HH:mm dd/MM/yyyy');
  }

  const getMalyData = async (itemId) => {
    try {
      
      const malyRef = firebase.firestore().collection('maly').doc(itemId);
      malyRef.get().then((doc) => {
        if (doc.exists) {
          setData(doc.data())
        } else {
          console.log('O maly não foi encontrado!');
        }
      }).catch((error) => {
        console.error('Erro ao obter o maly:', error);
      });

      setIdMaly(itemId)
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
    fetchCurtidaState()
  };

  const getInstituicaoData = async () => {
    try {
      const malyRef = firebase.firestore().collection('instituicoes').doc(idInstituicao);
      malyRef.get().then((doc) => {
        if (doc.exists) {
          setDataInst(doc.data())

        } else {
          console.log('A instituicao não foi encontrado!');
        }
      }).catch((error) => {
        console.error('Erro ao obter instituicao:', error);
      });

      setIdMaly(itemId)
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
   
    fetchCurtidaState()
  };


  const retrieveUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData !== null) {
        setUserData(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do usuário:', error);
    }
  };


    const loadComentarios = async(itemId)=>{
      const malyRef = firebase.firestore().collection('comentarios');
      const querySnapshot = await malyRef
      .where('id_maly', '==', itemId)
      .orderBy('data', 'asc')
      .get();

      const comentario = [];

      querySnapshot.forEach((doc) => {
        comentario.push({ id: doc.id, ...doc.data() });
      });

      setComentarios(comentario)
  }

  const enviarComentario = async () => {
        const diaTime = new Date();
        const timestamp = firebase.firestore.Timestamp.fromDate(diaTime);

        if(!textComentario || !userName || !userId){
      console.log('sem comentario')
    }
    
    setTextComentario("");
    try{ 
        await firebase.firestore().collection('comentarios').add({
        id_maly: idMaly,
        id_user:userId,
        nomeUser:userName,
        data:timestamp,
        diaText:dia,
        textComentario:textComentario,
        imagemPerfil:imagemPerfil
      })

      }catch (error){
      console.error('Erro ao criar comentario:', error);


    }
    loadComentarios(itemId);

  }

  const carregarDadosAtuais = async () => {
    try {
      const userRef = firebase.firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();
  
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserName(userData.nome);
        setImagemPerfil(userData.fotoURL)


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

  const cancelarMaly = async () => {
    try {
      console.log('Número de cancelamentos atual:', numeroCancela);

      const novoNumeroCancelamentos = numeroCancela + 1;


      if(novoNumeroCancelamentos>10){
        const docRef = firebase.firestore().collection('maly').doc(idMaly);
        await docRef.update({
           estado:'0'
          });
      }
  
      // Atualiza o valor no Firestore
      const docRef = firebase.firestore().collection('maly').doc(idMaly);
      await docRef.update({
         numeroCancela: novoNumeroCancelamentos ,
        });
        setShowPopup(false);

      console.log('Número de cancelamentos atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar número de cancelamentos:', error);
    }
  };

  const handleCurtir = async () => {
    try {
      const curtidaRef = firebase.firestore().collection('curtida').doc(`${userId}_${itemId}`);
      const doc = await curtidaRef.get();
    
  
      if (doc.exists) {
        await curtidaRef.delete();

        const novoCurtidasMaly = curtidas - 1;
        const malyRef = firebase.firestore().collection('maly').doc(idMaly);
        await malyRef.update({ curtidas: novoCurtidasMaly });

        const novoCurtidasInst= curtidasInst - 1;
        const malyRefInst = firebase.firestore().collection('instituicoes').doc(idInstituicao);
        await malyRefInst.update({ curtidas: novoCurtidasInst });

      } else {
        await curtidaRef.set({
          id_maly: itemId,
          id_user: userId,
          nomeUser: userName,
          idInstituicao: idInstituicao,
          estadoCurtida: '1'
        });
  
        const novoCurtidasMaly = curtidas + 1;
        const malyRef = firebase.firestore().collection('maly').doc(idMaly);
        await malyRef.update({ curtidas: novoCurtidasMaly });
       
        console.log('numero de gostos  Inst',curtidasInst)
        const novoCurtidasInst= curtidasInst + 1;
        console.log('numero de gostos atuais Inst',novoCurtidasInst)

        const malyRefInst = firebase.firestore().collection('instituicoes').doc(idInstituicao);
        await malyRefInst.update({ curtidas: novoCurtidasInst });
      }
      setCurtida(doc.exists && doc.data()?.estadoCurtida === '1'); // Define o estado de curtida com base no valor de estadoCurtida
    } catch (error) {
      console.error('Erro ao alternar estado de curtida:', error);
    }
    getMalyData(itemId);

  };


  async function fetchCurtidaState() {
    try {
      const curtidaRef = firebase.firestore().collection('curtida').doc(`${userId}_${itemId}`);
      const doc = await curtidaRef.get();

      if (doc.exists) {
        const estadoCurtida = doc.data()?.estadoCurtida === '1'; // Obtém o estado de curtida do documento

        setCurtida(estadoCurtida); 
      }else{
        setCurtida(false); 
      }
    } catch (error) {
      console.error('Erro ao buscar estado de curtida:', error);
    }
  }
  

  const renderizarImagem = (urlImage) => {
    console.log('imagem uri',urlImage)
    if (urlImage) {
      return <Image style={styles.img} source={{ uri: urlImage }} />;
    } else {
      return <Image style={styles.img} source={perfilImg} />;
    }
  };
  

  useEffect(() => {
    getMalyData(itemId);
    loadComentarios(itemId);
    retrieveUserData();
    const today = getCurrentDate();
    setDia(today)
    setCurtidas(data.curtidas)

  }, []);

  useEffect(() => {
    retrieveUserData();
   
  }, []);
  useEffect(() => {
    if (userData) {
        setUserId(userData.id),
        setUserName(userData.nome)
        setImagemPerfil(userData.fotoURL)
    }
  }, [userData]);

  useEffect(()=>{
    carregarDadosAtuais();
    setNumeroCancela(data.numeroCancela)
    setCurtidas(data.curtidas)
    setIdInstituicao(data.idInstituicao);
  }),

  useEffect(() => {
    fetchCurtidaState();
    getInstituicaoData();

  }, [userId, itemId,idInstituicao]);

  useEffect(()=>{
    setCurtidasInst(dataInst.curtidas)

  },)







    return(
      <View style={styles.container}>
       <View style={styles.heade}>
          <Ionicons name="arrow-back-outline" size={24} color="black" onPress={()=>navigation.goBack()} />
          <Text style={styles.Titulo}>{data.nomeInstituicao}</Text>
          <Entypo style={styles.iconARch} name="block" size={24} color="red" onPress={abrirPOP} />
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
        <TouchableOpacity style={styles.gosto} onPress={handleCurtir}>
          <AntDesign name={curtida ? 'heart' : 'hearto'} size={16} color={curtida ? 'red' : 'black'} />
          <Text>{data.curtidas}</Text>
      </TouchableOpacity>

          <View style={styles.Hora}>
          <Ionicons name="call-sharp" size={15} color="rgba(25, 25, 27, 0.8)" />
                  <Text>
                  Ligar
                  </Text>
          </View>

          <TouchableOpacity style={styles.buttonDireção}>
                        <MaterialCommunityIcons name="directions" size={16} color="rgba(25, 25, 27, 0.8)" />
                        <Text style={styles.textButton}>Direção</Text>    
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonMais}>
                        <Text style={styles.textButton}>Fechado</Text>
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
            {renderizarImagem(comentarios.imagemPerfil)}
            <View style={styles.dadosComentario}>
              <Text style={styles.NomeUser}>{comentarios.nomeUser}</Text>
             
              <View style={styles.caixaComentario}>
              <Text style={styles.conteudoComentario} >{comentarios.textComentario}</Text>
              </View>
              <Text style={styles.Data}>{comentarios.diaText}</Text>
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

       <Modal
                      animationType="slide"
                      transparent={true}
                      visible={showPopup}
                      style={styles.modalContainer}
                      presentationStyle="overFullScreen"
                      onRequestClose={() => setShowPopup(false)}
                       >
                      <View style={styles.modalView}>
                          <AntDesign name="exclamationcircleo" size={42} color="red" />
                          <Text style={styles.titlePopUp}>Confirmar Inatividade</Text>
                          <Text>Tem certeza de que o {data.tipoMaly} está inativo?</Text>

                          <View style={styles.botoes}>
                              <TouchableOpacity style={styles.sim} onPress={cancelarMaly}>
                                <Text style={styles.textButton}>Sim</Text>
                              </TouchableOpacity>

                              <TouchableOpacity style={styles.nao} onPress={() => setShowPopup(false)}>
                                <Text style={styles.textButton}>Não</Text>
                              </TouchableOpacity>

                          </View>
                         

                        
                          
                      
                      </View>
                </Modal> 

      </View>
    )
}