import React, { useEffect, useState } from 'react';
import {Linking,Image,View,ActivityIndicator,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import { EvilIcons ,Ionicons,Feather,MaterialCommunityIcons,Entypo  } from '@expo/vector-icons';

import {firebase} from '../../services/firebaseConfig'

import imgATM from '../../../src/assets/ATM.png'
import imgBank from '../../../src/assets/Bank.png'
import gifMap from '../../../src/assets/giftListMap.gif'

import perfilImg from '../../../src/assets/perfil.png'

import { useNavigation,route } from '@react-navigation/native';


export default function Home(){

  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);

  const [maly,setMaly]= useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingLista, setLoadingLista] = useState(true);


  const refreshList=async()=>{
    loadMalyProximos();
    
  }
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

  function calcularDistancia(lat1, lon1, lat2, lon2) {
    const raioTerra = 6371; 
  
    const diferencaLat = (lat2 - lat1) * (Math.PI / 180);
    const diferencaLon = (lon2 - lon1) * (Math.PI / 180);
  
    const a =
      Math.sin(diferencaLat / 2) * Math.sin(diferencaLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(diferencaLon / 2) *
        Math.sin(diferencaLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distancia = raioTerra * c; // Distância em quilômetros
  
    return distancia;
  }

  
  // Função para ordenar a lista de MAly por proximidade
async function ordenarMalyPorProximidade(malys, userLatitude, userLongitude) {
  // Mapear a lista de malys e calcular a distância para cada um
  const malysComDistancia = malys.map(maly => {
    const distancia = calcularDistancia(userLatitude, userLongitude, maly.latitude, maly.longitude);
    return { ...maly, distancia };
  });

  // Ordenar a lista com base na distância
  const malysOrdenados = malysComDistancia.sort((a, b) => a.distancia - b.distancia);

  return malysOrdenados;
}

// Função para carregar os MAly próximos com base na localização do usuário
async function loadMalyProximos() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão para acessar a localização negada');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      const { latitude, longitude } = location.coords;

      // Obter a referência para a coleção 'maly' no Firestore
      const malyRef = firebase.firestore().collection('maly');

      // Buscar os MAly do tipo "Banco/ATM"
      const querySnapshot = await malyRef
      .where('tipoMaly', 'in', ['Banco', 'ATM'])
      .where('estado', '==', "1")
      .get();
      const malys = [];
      
      querySnapshot.forEach((doc) => {
        malys.push({ id: doc.id, ...doc.data() });
      });

      // Ordenar os MAly por proximidade com base na localização do usuário
      const malysProximos = await ordenarMalyPorProximidade(malys, latitude, longitude);

      // Aqui você pode definir o estado com os MAly ordenados por proximidade
      setMaly(malysProximos);
      setLoadingLista(false);
    }
  } catch (error) {
    console.error('Erro ao obter localização ou carregar MAly:', error);
  }
}


  const handleInformacoes = (id) => {
    navigation.navigate('InfoATM', { itemId: id });
  };
  

  const openMapAgentes = () => {
    navigation.navigate('MapaAgentes');
  };

  const openMapATM = () => {
    navigation.navigate('MapaATM');
  };

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const shareLocation =(lat,log, tipo)=>{
    const message = `Confira a localização do ${tipo} aqui: https://www.google.com/maps?q=${lat},${log}`;
    Linking.openURL(`sms:?body=${message}`);
    
    // Para compartilhar via WhatsApp
    // Linking.openURL(`whatsapp://send?text=${message}`);
   
    // Para compartilhar via Facebook Messenger
    // Linking.openURL(`fb-messenger://share?link=${message}`);
  }
  
const openInMap=(lat,log)=>{
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${log}`;
  Linking.openURL(url);
}



  useEffect(() => {
    loadMalyProximos();
    retrieveUserData();
    
    
  }, []);



  


    return(
        <View style={styles.container}>

          <View style={styles.header}>
            <Image style={styles.logoImag} source={perfilImg}/>
            <View>
              <Text style={styles.TextOla}>Bem-vindo de volta,</Text>
              {userData && (
                <>
              <Text style={styles.UserName}>{userData.nome}</Text>
              </>
              )}
            </View>
           
            <Ionicons style={styles.iconNotification} name="notifications-outline" size={24} color="black"  />
          </View>

          <View style={styles.inputPesquisa}>
            <Feather name="search" size={20} color="#19191B" />
            <TextInput
                  placeholder='Pesquisar Banco ou ATM'
                  style={styles.input}
                  />
          </View>

          <Text style={styles.Text}>Busca por Bancos/ATMs e Agentes</Text>
          <View style={styles.containerATM}>
            <View>
            <TouchableOpacity style={styles.buttonATM} onPress={openMapATM}>
                    <View style={styles.buttonContent} >
                        <Image 
                        source={imgATM} 
                        />
                    </View>
                    <Text style={styles.TextMedio}>Encontre ATM/Banco</Text>

                </TouchableOpacity>
            </View>

            <View>

            <TouchableOpacity style={styles.buttonATM} onPress={openMapAgentes}>
                    <View  style={styles.buttonContent}>
                        <Image 
                        source={imgBank} 
                        />
                    </View>
                    <Text style={styles.TextMedio}>Encontre Agentes</Text>

                </TouchableOpacity>
            </View>

          </View>

          <View style={styles.estiloRefre}>
              <Text style={styles.TextLista}>Bancos/ATMs Perto de si</Text>
              <TouchableOpacity onPress={refreshList}>
              <EvilIcons name="refresh" size={32} color="black" />
              </TouchableOpacity>
          </View>

          <FlatList
          
          data={maly}
          showsVerticalScrollIndicator={false}
          keyExtractor={maly=> String(maly.id)} 
          renderItem={({item:maly})=>(
           
            <TouchableOpacity style={styles.CardBank}  onPress={() => handleInformacoes(maly.id)}>
                <Image
                  style={styles.imgBank}
                  source={{ uri: maly.foto_urlInstituicao }}
                  onLoadEnd={() => setLoading(false)} 
                />

              <View style={styles.infoBank}>
                <Text style={styles.TextNomeBank}>{maly.nomeInstituicao}</Text>
                <Text style={styles.TextTypoBank}> {maly.tipoMaly}</Text>

                <Text style={styles.TextAndereco}> 
                <Ionicons name="md-location-outline" size={16} color="black" />
                {maly.endereco}</Text>

                <View style={styles.Hora}>
                  <Text>
                  <Ionicons name="time-outline" size={16} color="black" />
                  Aberto : 
                  </Text>
                  <Text>
                  08:00–15:00
                  </Text>
                </View>
                        

              <View style={styles.buttonsCard}>

                    <TouchableOpacity style={styles.buttonDireção} onPress={() => openInMap(maly.latitude,maly.longitude)}>
                        <View style={styles.buttonContentCard}>
                            <MaterialCommunityIcons name="directions" size={15} color="rgba(25, 25, 27, 1)" />
                            <Text style={styles.textButton}>Direção</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonDireção}  onPress={() => handleCall(maly.contacto)}>
                        <View style={styles.buttonContentCard}>
                        <Ionicons name="call-sharp" size={15} color="rgba(25, 25, 27, 1)" />
                            <Text style={styles.textButton}>Contacto</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonDireção}  onPress={() => shareLocation(maly.latitude,maly.longitude, maly.tipoMaly)}>
                        <View style={styles.buttonContentCard}>
                            <Entypo name="share" size={15} color="rgba(25, 25, 27, 1)" />
                            <Text style={styles.textButton}>Partilhar</Text>
                        </View>
                </TouchableOpacity>


                </View>

              </View>

            </TouchableOpacity>
          )}
        >

         
            
          </FlatList>
          {loadingLista && (

             <View>
                 <ActivityIndicator size="large"  color="#B0BEC5" style={styles.loadingLista} />
              
            </View>

                )}
          
          
  






          
        </View>
    )
}