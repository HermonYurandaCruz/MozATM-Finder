import React, { useState,useEffect } from 'react';
import {View,ActivityIndicator,TouchableOpacity , Image, TextInput,Text} from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';

import { Ionicons,Octicons,MaterialCommunityIcons  } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import {firebase} from '../../services/firebaseConfig'

import styles from './styles';


import perfilImg from '../../../src/assets/perfil.png';


export default function UpdateProfile(){

    const navigation = useNavigation();
    const route = useRoute();

    const { itemId } = route.params;

    const [nome, setNome] = useState('')
    const [sobreNome, setSobreNome] = useState('')
    const [fotoURL,setFotoURL]= useState('')
    const [imagemURI, setImagemURI] = useState(null);

   
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');

    const carregarDadosAtuais = async (itemId) => {
        console.log('id do usuario',itemId)
        try {
          const userRef = firebase.firestore().collection('users').doc(itemId);
          const userDoc = await userRef.get();
      
          if (userDoc.exists) {
            const userData = userDoc.data();
            setNome(userData.nome || '');
            setSobreNome(userData.sobreNome || '');
          } else {
            console.error('Usuário não encontrado.');
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      };
      


    const handleRegister = async () => {

        if (!nome || !sobreNome ) {
            setErrorText('Por favor, preencha todos os campos.');
            return;
          }

       
        
    try {
        setLoading(true);
        setShowText(false);
        setErrorText(''); // Limpa qualquer mensagem de erro anterior

        const userRef = firebase.firestore().collection('users').doc(itemId);
          // Aqui você pode tratar a resposta da API conforme necessário
    
          await userRef.update({
            nome: nome,
            sobreNome: sobreNome,
            fotoURL: fotoURL,
          });

navigation.goBack()          

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorText('Este e-mail já está em uso. Tente outro endereço de e-mail.');
              } else {
                setErrorText('Erro ao registrar usuário. Por favor, tente novamente.');
              }
      
        } finally {
            setLoading(false);
            setShowText(true);
          }
      };


      // Verifica se o acesso à galeria está permitido e permite se necessário
const getPermissionAsync = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('É necessário permitir acesso à galeria para selecionar uma foto.');
      return false;
    }
    return true;
  }
  return false;
};
    

const selecionarFoto = async () => {
  console.log('entrou na galeria')
  const permissao = await getPermissionAsync();
  if (!permissao) return;

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });


    const selectedImage = result.assets[0]; // Obter a primeira imagem selecionada, se houver

    if (selectedImage && selectedImage.uri) {
      const numeroAleatorio = Math.floor(Math.random() * 1000000);
      const idFoto = `${itemId}_${numeroAleatorio}`;

  
      if (selectedImage && selectedImage.uri) {
        const response = await fetch(selectedImage.uri);
        const blob = await response.blob();
  
        const storageRef = firebase.storage().ref().child(`fotos_perfil/${idFoto}`);
        await storageRef.put(blob);
        const fotoURL = await storageRef.getDownloadURL();
  
        setImagemURI(selectedImage.uri);
        setFotoURL(fotoURL);
      }
    }
  } catch (error) {
    console.error('Erro ao selecionar a foto:', error);
  }
};



  

 

   
   

      useEffect(() => {
        carregarDadosAtuais(itemId);
        getPermissionAsync();
      }, [itemId]);

      
    return(
        <View style={styles.container}>
                <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" onPress={()=>navigation.goBack()} />
                    <Text style={styles.Titulo}>Editar Perfil</Text>
                </View>
 
                {imagemURI ? (
                  <Image style={styles.ImgaEscolhida} source={{ uri: imagemURI }}  />
                ) : (
                  <TouchableOpacity onPress={selecionarFoto}>
                  <Ionicons style={styles.ImgaEscolhida} name="person-circle-outline" size={100} color="black" /> 
                 </TouchableOpacity>
                )}
                <Text style={styles.Text}>Atualizar Nome</Text>
                 <TextInput
                placeholder='atualizar o seu nome'
                style={styles.input}
                value={nome}
                onChangeText={(text) => setNome(text)}
                />

                <Text style={styles.Text}>Atualizar Apelido</Text>
                 <TextInput
                placeholder='Atualizar Apelido'
                style={styles.input}
                value={sobreNome}
                onChangeText={(text) => setSobreNome(text)}
                />


          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {showText && <Text style={styles.text}>Atualizar Dados</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

                    

               
           
                

                             
     </View>
    )
}