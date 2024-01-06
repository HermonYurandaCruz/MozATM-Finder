import React, {useEffect,useState} from "react";
import {Image,View,ActivityIndicator,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import { useNavigation,route} from '@react-navigation/native';
import styles from './styles';
import { MaterialCommunityIcons ,Feather,AntDesign ,Entypo  } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'

import bankInfra from '../../../src/assets/bankInfra.png'



export default function ListBank() {
  const [instituicoes, setInstituicoes] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const navigation = useNavigation();


  async function loadInstituicoes(){
    
    const malyRef = firebase.firestore().collection('instituicoes');

    const querySnapshot = await malyRef
    .where('tipoInstituicao', 'in', ['Banco', 'Agente'])
    .orderBy('curtidas', 'desc') // Ordenar por curtidas em ordem decrescente
    .get();
    const malys = [];

    querySnapshot.forEach((doc) => {
      malys.push({ id: doc.id, ...doc.data() });
    });
    setInstituicoes(malys)
  };
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('instituicoes')
      .where('tipoInstituicao', 'in', ['Banco', 'Agente'])
      .orderBy('curtidas', 'desc')
      .onSnapshot((querySnapshot) => {
        const malys = [];
        querySnapshot.forEach((doc) => {
          malys.push({ id: doc.id, ...doc.data() });
        });
        setInstituicoes(malys);
      });

    return () => unsubscribe();
  }, []);

  const searchFilter = (text) => {
    const filtered = instituicoes.filter((item) =>
      item.nome.toLowerCase().includes(text.toLowerCase())
    );
    setPesquisa(text);
    if (text === '') {
      loadInstituicoes();
    } else {
      setInstituicoes(filtered);
    }
    };
  

    const MapInst=(nomeInst)=>{
       console.log('nome inst',nomeInst)
      navigation.navigate('MapInst', { itemNome: nomeInst });
      
    }
  


    return(
      <View style={styles.container}>
      <Text style={styles.Text}>Instituições Bancárias</Text>

      <View style={styles.inputPesquisa}>
        <Feather name="search" size={20} color="#19191B" />
        <TextInput
          placeholder="Pesquisar Banco ou ATM"
          style={styles.input}
          value={pesquisa}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>

      <FlatList
        data={instituicoes}
        keyExtractor={(instituicao) => String(instituicao.id)}
        renderItem={({ item: instituicao }) => (
          
          <TouchableOpacity style={styles.CardBank} onPress={()=>MapInst(instituicao.nome)}>
            <Image
              style={styles.imgBank}
              source={{ uri: instituicao.foto_urlInstituicao }}
            />

            <View style={styles.infoBank}>
              <Text style={styles.TextNomeBank}>{instituicao.nome}</Text>

              <View style={styles.Hora}>
                <Text>
                  <AntDesign
                    name="heart"
                    size={18}
                    color="rgba(221, 87, 87, 1)"
                  />
                </Text>
                <Text style={styles.curtidasText}>
                  {instituicao.curtidas}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
    )
}