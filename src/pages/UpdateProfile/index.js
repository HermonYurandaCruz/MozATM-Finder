import React, { useState,useEffect } from 'react';
import {View,ActivityIndicator,TouchableOpacity , Image, TextInput,Text, ScrollView} from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown'

import { Ionicons,AntDesign} from '@expo/vector-icons';

import {firebase} from '../../services/firebaseConfig'

import styles from './styles';




export default function UpdateProfile(){

    const navigation = useNavigation();
    const route = useRoute();

    const { itemId } = route.params;

    const [nome, setNome] = useState('')
    const [sobreNome, setSobreNome] = useState('')
    const [fotoURL,setFotoURL]= useState('')
    const [imagemURI, setImagemURI] = useState(null);
    
    const [descricao, setDescricao] = useState('')
    const [contacto, setContacto] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
   
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [loadingImg, setLoadingImg] = useState(false);


    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');

    const [localizacao, setLocalizacao] = useState('');
    const [isFocusLocalizacao, setIsFocusLocalizacao] = useState(false);

    const dataLocalizacao=[
      { id: 11, nome: 'Cidade de Maputo', value: 'Cidade de Maputo' },
      { id: 1, nome: 'Maputo ', value: 'Maputo' },{ id: 2, nome: 'Gaza', value: 'Gaza' },
      { id: 3, nome: 'Inhambane', value: 'Inhambane' },{ id: 4, nome: 'Sofala', value: 'Sofala' },
      { id: 5, nome: 'Manica', value: 'Manica' },{ id: 6, nome: 'Tete', value: 'Tete' },
      { id: 7, nome: 'Zambézia', value: 'Zambézia' },{ id: 8, nome: 'Nampula', value: 'Nampula' },
      { id: 9, nome: 'Cabo Delgado', value: 'Cabo Delgado' },{ id: 10, nome: 'Niassa', value: 'Niassa' },
      
  
    ]

    const carregarDadosAtuais = async (itemId) => {
        try {
          const userRef = firebase.firestore().collection('users').doc(itemId);
          const userDoc = await userRef.get();
      
          if (userDoc.exists) {
            const userData = userDoc.data();
            setNome(userData.nome || '');
            setSobreNome(userData.sobreNome || '');
            setDescricao(userData.descricao);
            setLocalizacao(userData.localizacao);
            setContacto(userData.contacto);
            setWhatsapp(userData.whatsapp);
            setFotoURL(userData.fotoPerfil)
          } else {
            console.error('Usuário não encontrado.');
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        }
      };

 


    const handleRegister = async () => {
        if (!nome || !contacto ) {
            setErrorText('Por favor, preencha os campos obrigatorios.');
            return;
          }

       
        
    try {
        setLoading(true);
        setShowText(false);
        setErrorText(''); // Limpa qualquer mensagem de erro anterior

        const userRef = firebase.firestore().collection('users').doc(itemId);
          if(fotoURL){
            await userRef.update({
              nome: nome,
              fotoPerfil: fotoURL,
              contacto:contacto,
              whatsapp:whatsapp
            });
          }else{
            await userRef.update({
              nome: nome,
              descricao:descricao,
              localizacao:localizacao,
              contacto:contacto,
              whatsapp:whatsapp
            });
          }
       
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




const selecionarFoto = async () => {
  try {
    setLoading2(true);

    // Criar um elemento input de tipo arquivo
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; 
    input.multiple = false; 

    // Aguardar o evento de mudança no input de arquivo
    const file = await new Promise((resolve) => {
      input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        resolve(file);
      });
      input.click();
    });

    if (file) {
      await enviarImagemAoFirebase(file);
    }

    setLoading2(false);
  } catch (error) {
    console.error('Erro ao selecionar a foto:', error);
    setLoading2(false);
  }
};

const enviarImagemAoFirebase = async (selectedImage) => {
  const numeroAleatorio = Math.floor(Math.random() * 1000000);
  const idFoto = `${itemId}_${numeroAleatorio}`;

  // Obter a URL temporária da imagem
  const fotoURL = URL.createObjectURL(selectedImage);

  // Enviar a imagem para o Firebase Storage
  const response = await fetch(fotoURL);
  const blob = await response.blob();
  const storageRef = firebase.storage().ref().child(`fotos_perfil/${idFoto}`);
  await storageRef.put(blob);
  const fotoDownloadURL = await storageRef.getDownloadURL();

  // Atualizar o estado com a URL da imagem
  setImagemURI(fotoDownloadURL);
  setFotoURL(fotoDownloadURL);

  // Retornar a URL da foto
  return fotoDownloadURL;
};





  

 

   
   

      useEffect(() => {
        carregarDadosAtuais(itemId);
      }, [itemId]);

      
    return(
      
        <View 
        style={styles.container}>
                <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={28} color="rgba(25, 25, 27, 0.9)" onPress={()=>navigation.goBack()} />
                    <Text style={styles.Titulo}>Editar Perfil</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}  >
                  <View style={{alignItems:"center"}}>
                    <View style={{flexDirection:"row"}}>
                    <Image style={{width:100,height:100, borderRadius:8,padding:10,borderRadius:100}} resizeMode='contain' source={{uri:fotoURL}}></Image>
                    {loading2 && (
                        <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="rgba(0, 0, 0, 0.7)" />
                        </View>
                    )}
                    <TouchableOpacity style={{position:"absolute",marginTop:80,marginStart:80}} onPress={selecionarFoto}>
                      <AntDesign name="edit" size={24} color="black" />
                  </TouchableOpacity>
                    </View>
                  </View>
                
 
               
                <Text style={styles.Text}>Atualizar Nome</Text>
                 <TextInput
                placeholder='atualizar o seu nome'
                style={styles.input}
                value={nome}
                onChangeText={(text) => setNome(text)}
                />

                
        <Text style={styles.Text}>Seu contacto</Text>
        <TextInput
        placeholder='ex:8XXXXXXXX'
        style={styles.input}
        value={contacto}
        onChangeText={(text) => setContacto(text)}
        />

        <Text style={styles.Text}>Seu whatsapp(opcional)</Text>
        <TextInput
        placeholder='ex:8XXXXXXXX'
        style={styles.input}
        value={whatsapp}
        onChangeText={(text) => setWhatsapp(text)}
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

            </ScrollView>

                             
     </View>
    )
}