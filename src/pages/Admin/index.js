import React, { useState,useEffect } from 'react';
import {View,ActivityIndicator,Button,TouchableOpacity , Modal, TextInput,Text} from 'react-native';
import { Ionicons,AntDesign,Octicons,MaterialCommunityIcons  } from '@expo/vector-icons';
import { format } from 'date-fns';
import {Dropdown} from 'react-native-element-dropdown'
import * as ImagePicker from 'expo-image-picker';
import {firebase} from '../../services/firebaseConfig'
import { useNavigation,useRoute } from '@react-navigation/native';


import styles from './styles';
import api from '../../services/api'


import logoGoogle from '../../../src/assets/google.png'


export default function Admin(){

    const navigation = useNavigation();
    const route = useRoute();

    

  
    const [nome, setNome] = useState('')
    const [contacto, setContacto] = useState('')
    const [email, setEmail] = useState('')
    const [foto_urlInstituicao, setfoto_urlInstituicao] = useState('')
    const [foto_urlMaly, setFoto_urlMaly] = useState('')

    const [tipoInstituicao, setTipoInstituicao] = useState('');

    

    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');


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
          const numeroAleatorio2 = Math.floor(Math.random() * 1000000);

          const idFoto = `${numeroAleatorio2}_${numeroAleatorio}`;
    
      
          if (selectedImage && selectedImage.uri) {
            const response = await fetch(selectedImage.uri);
            const blob = await response.blob();
      
            const storageRef = firebase.storage().ref().child(`fotos_Inst/${idFoto}`);
            await storageRef.put(blob);
            const fotoURL = await storageRef.getDownloadURL();
      
            setFoto_urlMaly(fotoURL);
          }
        }
      } catch (error) {
        console.error('Erro ao selecionar a foto:', error);
      }
    };

    const selecionarLogotipo = async () => {
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
          const numeroAleatorio2 = Math.floor(Math.random() * 1000000);

          const idFoto = `${numeroAleatorio2}_${numeroAleatorio}`;
    
      
          if (selectedImage && selectedImage.uri) {
            const response = await fetch(selectedImage.uri);
            const blob = await response.blob();
      
            const storageRef = firebase.storage().ref().child(`fotos_Inst/${idFoto}`);
            await storageRef.put(blob);
            const fotoURL = await storageRef.getDownloadURL();
      
            setfoto_urlInstituicao(fotoURL);
          }
        }
      } catch (error) {
        console.error('Erro ao selecionar a foto:', error);
      }
    };


    const handleRegister = async () => {

      if (!nome || !email || !tipoInstituicao || !foto_urlInstituicao||!foto_urlMaly||!contacto) {
          setErrorText('Por favor, preencha todos os campos.');
          return;
        }

      
  try {
      setLoading(true);
      setShowText(false);
      setErrorText(''); // Limpa qualquer mensagem de erro anterior

      
      await firebase.firestore().collection('instituicoes').add({
          nome: nome,
          tipoInstituicao: tipoInstituicao,
          email: email,
          contacto:contacto,
          foto_urlInstituicao:foto_urlInstituicao,
          foto_urlMaly:foto_urlMaly,
          curtidas:0

        });      
        setErrorText('Registro realizado com sucesso');

      } catch (error) {
          
              setErrorText('Erro ao registrar Inst. Por favor, tente novamente.');
              console.log('erro no registro de inst',error)   
      } finally {
          setLoading(false);
          setShowText(true);
        }
    };




   

     

    

  
    return(
        <View style={styles.container}>
                <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" onPress={()=>navigation.goBack()} />
                    <Text style={styles.TextHeade}>Registrar</Text>
                </View>
         
            <View style={styles.dadosNome}>
           

                         <Text style={styles.Text}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Nome da Intituicao'
                                value={nome}
                                onChangeText={(text) => setNome(text)}
                        />


                            <Text style={styles.Text}>Tipo de Instiuicao</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Banco,ATM,Agente'
                                value={tipoInstituicao}
                                onChangeText={(text) => setTipoInstituicao(text)}
                            />

                             <Text style={styles.Text}>Contacto</Text>
                                    <TextInput
                                    placeholder='exemplo:8600000'
                                    style={styles.input}
                                    value={contacto}
                                    onChangeText={(text) => setContacto(text)}
                                    />

                           <Text style={styles.TextForm}>e-mail da idInstituicaoe</Text>
                                <TextInput
                                style={styles.input}
                                placeholder='Digite o codigo'
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                />

<                               TouchableOpacity onPress={selecionarLogotipo}>
                                  <Text style={styles.Titulo}> Add Logo</Text>
                                   <Ionicons name="images-outline" size={64} color="rgba(41, 82, 74, 0.85)" />
                                </TouchableOpacity>

                                
<                               TouchableOpacity onPress={selecionarFoto}>
                                  <Text style={styles.Titulo}> Add foto</Text>
                                   <Ionicons name="images-outline" size={64} color="rgba(41, 82, 74, 0.85)" />
                                </TouchableOpacity>
                              
                      
                        </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {showText && <Text style={styles.text}>Registrar Agora</Text>}

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