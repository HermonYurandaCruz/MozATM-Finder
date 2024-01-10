import React, { useState,useEffect } from 'react';
import {View,Linking,ActivityIndicator,Button,TouchableOpacity ,Image,Modal, TextInput,Text, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { Ionicons,AntDesign,Octicons,MaterialCommunityIcons  } from '@expo/vector-icons';
import { format } from 'date-fns';
import {Dropdown} from 'react-native-element-dropdown'
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {firebase} from '../../services/firebaseConfig'
import * as ImagePicker from 'expo-image-picker';



export default function AddBank(){

    const navigation = useNavigation();

    
    const [userData, setUserData] = useState([]);

    const [instituicoes, setInstituicoes] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [imagemURI, setImagemURI] = useState(null);

  
    const [estado, setEstado] = useState('0');
    const [curtidas, setCurtidas] = useState(0);
    const [numeroCancela, setNumeroCancela] = useState(0)


    const [userId, setUserId] = useState('')

    const [endereco, setEndereco] = useState('')
    const [contacto, setContacto] = useState('')
    const [nomePropretario, setNomePropretario] = useState('')
    const [codigoAgente, setCodigoAgente] = useState('')
    const [data, setData] = useState('')
    const [idInstituicao, setIdInstituicao] = useState('');
    const [nomeInstituicao, setNomeInstituicao] = useState('')
    const [userName, setUserName] = useState('')
    const [foto_urlInstituicao, setfoto_urlInstituicao] = useState('')
    const [foto_urlMaly, setFoto_urlMaly] = useState('')
    const [fotoURL,setFotoURL]= useState('')
    const [isChecked, setChecked] = useState(false);


    
    const [tipoMaly, setTipoMaly] = useState('');
    const [tipoMalyName, setNameTipoMaly] = useState('');

    
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');


    const openURLServicos=async()=>{
      const url = 'https://malyspot.netlify.app/termos.html'; // TERMOS DE USO URL que deseja abrir
      
      const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.error('Não é possível abrir o link:', url);
        }
    }

    const retrieveUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData !== null) {
          setUserData(JSON.parse(storedUserData));
          console.log('Dados:',userData);
  
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do usuário:', error);
        // Tratar erros ao recuperar dados do AsyncStorage
      }
    };

    async function loadInstituicoes() {

        try {
          const malyRef = firebase.firestore().collection('instituicoes');
          const querySnapshot = await malyRef
          .where('tipoInstituicao', '==', tipoMalyName)
          .get();
          const malys = [];
          
          querySnapshot.forEach((doc) => {
            malys.push({ id: doc.id, ...doc.data() });
          });
          setInstituicoes(malys)
          console.log('dados da instituicao', malys)

    
        } catch (error) {
          console.error('Erro ao carregar instituições:', error);
        }
      }
    


      async function loadTipo() {
        try {
          const tipoInst = firebase.firestore().collection('tipoInstituicao');
          tipoInst.onSnapshot(
            querySnapshot=>{
              const tipoInstLIst=[]
              querySnapshot.forEach((doc)=>{
                const{nome}=doc.data()
                tipoInstLIst.push({
                  id:doc.id,
                  nome,
                
                })
              })
              setTipo(tipoInstLIst)
              console.log('Tipo maly name', tipoMalyName)
        
            }
            
          )

        } catch (error) {
          console.error('Erro ao carregar tipo:', error);
        }

      }


      const handleTipoChange = (selectedType) => {
        // Atualize o tipo selecionado
        setNameTipoMaly(selectedType);
      
        // Atualize as instituições baseadas no novo tipo selecionado
        loadInstituicoes();
      }

   


    function getCurrentDate() {
        const currentDate = new Date();
        return format(currentDate, 'dd/MM/yyyy');
      }


      const handleSelectOption = (option) => {
        setSelectedOption(option);
      };


    const handleRegister = async () => {
        const today = getCurrentDate();
        setData(today)

        setUserId(userData.id)
        setUserName(userData.nome);

    
        if (!foto_urlInstituicao || !foto_urlMaly) {
          // Se fotoUrlInstituicao for undefined ou null, defina um valor padrão ou trate isso conforme necessário
          console.log('sem foto ');
          setfoto_urlInstituicao('');
          setFoto_urlMaly('')

        }

        if(tipoMalyName=="Agente"){
            if (!contacto || !codigoAgente || !nomePropretario) {
                setErrorText('Por favor, preencha todos os do Agente.');
                setShowPopup(true);

                return;

              }
        }

        if (!nomeInstituicao|| !tipoMalyName|| !endereco) {
            setErrorText('Por favor, preencha todos os campos.');
            return;

          }

          if (!data || !longitude || !latitude|| !userName) {
            setErrorText('Por favor, aguarde um momento.');
            return;
          }

          if (!isChecked) {
            setErrorText('Por favor, aceite os termos e Condicoes .');
            return;
          } 

    
    try {
        setLoading(true);
        setShowText(false);
        setErrorText(''); // Limpa qualquer mensagem de erro anterior

      

        await firebase.firestore().collection('maly').add({
          idInstituicao: idInstituicao,
          nomeInstituicao: nomeInstituicao,
          idUser:userId,
          userNomeAdd:userName,
          tipoMaly: tipoMalyName,
          endereco: endereco,
          latitude: latitude,
          longitude: longitude,
          contacto: contacto,
          nomePropretario: nomePropretario,
          codigoAgente: codigoAgente,
          curtidas: curtidas,
          estado:estado,
          data: data, 
          foto_urlInstituicao: foto_urlInstituicao,
          foto_urlMaly:foto_urlMaly,
          numeroCancela:numeroCancela,
        });
          setShowPopup(true);

        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
      
            setErrorText('Erro ao criar usuário. Por favor, tente novamente.');
        } finally {
            setLoading(false);
            setShowText(true);
          }
      };

      const getLocation = async () => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permissão para acessar a localização negada');
            return;
          }
      
          let location = await Location.getCurrentPositionAsync({});
          if (location) {
            const { latitude, longitude } = location.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          }
        } catch (error) {
          console.error('Erro ao obter localização:', error);
        }
      };

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
            const idFoto = `${idInstituicao}_${numeroAleatorio}`;
      
        
            if (selectedImage && selectedImage.uri) {
              const response = await fetch(selectedImage.uri);
              const blob = await response.blob();
        
              const storageRef = firebase.storage().ref().child(`fotos_maly/${idFoto}`);
              await storageRef.put(blob);
              const fotoURL = await storageRef.getDownloadURL();
        
              setImagemURI(selectedImage.uri);
              setFotoURL(fotoURL);
              setFoto_urlMaly(fotoURL)
            }
          }
        } catch (error) {
          console.error('Erro ao selecionar a foto:', error);
        }
      };

      const handleCheckBoxChange = () => {
        setIsChecked(!isChecked);
      };
      
    

      
  useEffect(() => {
    loadInstituicoes();
    loadTipo();
    getLocation();
    retrieveUserData();

  }, [tipoMalyName]);

  
    return(
        <View style={styles.container}>
                <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={24} color="rgba(25, 25, 27, 0.9)" onPress={()=>navigation.goBack()} />
                    <Text style={styles.TextHeade}>Registrar</Text>
                </View>
         <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
                   >
         <View style={styles.dadosNome}>
        <Text style={styles.TituloATM} >Escolha o Estabelecimento</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'rgba(37, 78, 70, 1)' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={tipo}
          search
          maxHeight={300}
          labelField="nome"
          valueField="id"
          placeholder={tipoMalyName }
          searchPlaceholder="Pesquisar..."
          value={tipoMaly}
          onFocus={() => setIsFocus2(true)}
          onBlur={() => setIsFocus2(false)}
          onChange={item => {
            setTipoMaly(item.value);
            setNameTipoMaly(item.nome)
            handleSelectOption(item.nome)
            setIsFocus2(false);
          }}
          handleRegister
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'rgba(37, 78, 70, 1)' : 'rgba(37, 78, 70, 1)'}
              name="Safety"
              size={20}
            />
          )}
        />   


        <Text style={styles.Titulo}>Nome do Banco</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'rgba(41, 82, 74, 0.9)' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={instituicoes}
          search
          maxHeight={300}
          labelField="nome"
          valueField="id"
          placeholder={nomeInstituicao}
          searchPlaceholder="Pesquisar..."
          value={nomeInstituicao}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setNomeInstituicao(item.value);
            setIdInstituicao(item.id);
            setNomeInstituicao(item.nome);
            setfoto_urlInstituicao(item.foto_urlInstituicao);
            setContacto(item.contacto);
            setFoto_urlMaly(item.foto_urlMaly)
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'rgba(37, 78, 70, 1)' : 'rgba(37, 78, 70, 1)'}
              name="bank"
              size={20}
            />
          )}
        />  

                         <Text style={styles.Titulo}>Endereço</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Avenida ou Rua'
                                value={endereco}
                                onChangeText={(text) => setEndereco(text)}

                            />

                        {selectedOption === 'Agente' && (
                                <View>
                                      <Text style={styles.Titulo}>Nome do Propretario</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o Nome do Proprietario'
                                value={nomePropretario}
                                onChangeText={(text) => setNomePropretario(text)}
                            />

                             <Text style={styles.Titulo}>Contacto</Text>
                                    <TextInput
                                    placeholder='exemplo:8600000'
                                    style={styles.input}
                                    value={contacto}
                                    onChangeText={(text) => setContacto(text)}
                                    keyboardType='numeric'

                                    />

                           <Text style={styles.Titulo}>Cogigo do Agente</Text>
                                <TextInput
                                style={styles.input}
                                placeholder='Digite o codigo'
                                keyboardType='numeric'

                                value={codigoAgente}
                                onChangeText={(text) => setCodigoAgente(text)}
                                />
                                  {imagemURI ? (
                                  <Image source={{ uri: imagemURI }} style={{ width: 200, height: 200 }} />
                                ) : (
                                  
                                  <TouchableOpacity onPress={selecionarFoto}>
                                  <Ionicons name="images-outline" size={64} color="rgba(41, 82, 74, 0.85)" />
                                  <Text style={styles.Titulo}>Adicionar uma foto da Banca</Text>

                                </TouchableOpacity>
                                )}


                                </View>
                            )}  

                           <View style={styles.checkView}>                         
                             <Checkbox
                              style={styles.checkbox}
                              value={isChecked}
                              onValueChange={setChecked}
                              color={isChecked ? '#254E46' : undefined}
                            />
                            <Text style={styles.Text}>
                            Concordo com os termos e condições.
                            </Text>
                            <Text style={styles.TextLer} onPress={openURLServicos}>
                              Ler   
                            </Text>

                          </View>
                         

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={showPopup}
                                style={styles.modalContainer}
                                presentationStyle="overFullScreen"
                                onRequestClose={() => setShowPopup(false)}
                              >
                                <View style={styles.modalView}>
                                  <Ionicons name="checkmark-done-circle" size={42} color="rgba(41, 82, 74, 0.68)" />
                                  <Text style={styles.titlePopUp}>Registro enviado!</Text>
                                  <Text>Estamos revisando suas informações. Se estiverem corretas, logo estarão no mapa. Obrigado pela colaboração!</Text>
                                  <Button style={styles.buttonPopUP} title="Fechar" onPress={()=>navigation.goBack()} />
                                </View>
                          </Modal>          
                      
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

          
         </ScrollView>
       
          

                             
     </View>
    )
}