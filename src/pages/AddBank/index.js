import React, { useState,useEffect } from 'react';
import {View,ActivityIndicator,Button,TouchableOpacity , Modal, TextInput,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons,AntDesign,Octicons,MaterialCommunityIcons  } from '@expo/vector-icons';
import { format } from 'date-fns';
import {Dropdown} from 'react-native-element-dropdown'
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {firebase} from '../../services/firebaseConfig'



export default function AddBank(){

    const navigation = useNavigation();

    
    const [userData, setUserData] = useState([]);

    const [instituicoes, setInstituicoes] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

  
    const [estado, setEstado] = useState('1');
    const [curtidas, setCurtidas] = useState('0');

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

    const [tipoMaly, setTipoMaly] = useState('');
    const [tipoMalyName, setNameTipoMaly] = useState('');

    
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');


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
    

      
  useEffect(() => {
    loadInstituicoes();
    loadTipo();
    getLocation();
    retrieveUserData();

  }, [tipoMalyName]);

  
    return(
        <View style={styles.container}>
                <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" onPress={()=>navigation.goBack()} />
                    <Text style={styles.TextHeade}>Registrar</Text>
                </View>
         
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


        <Text style={styles.TituloATM}>Nome do Banco</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'rgba(37, 78, 70, 1)' }]}
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

                         <Text style={styles.Text}>Endereço</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Avenida ou Rua'
                                value={endereco}
                                onChangeText={(text) => setEndereco(text)}

                            />

                        {selectedOption === 'Agente' && (
                                <View>
                                      <Text style={styles.Text}>Nome do Propretario</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o Nome do Proprietario'
                                value={nomePropretario}
                                onChangeText={(text) => setNomePropretario(text)}
                            />

                             <Text style={styles.Text}>Contacto</Text>
                                    <TextInput
                                    placeholder='exemplo:8600000'
                                    style={styles.input}
                                    value={contacto}
                                    onChangeText={(text) => setContacto(text)}
                                    />

                           <Text style={styles.TextForm}>Cogigo do Agente</Text>
                                <TextInput
                                style={styles.input}
                                placeholder='Digite o codigo'
                                value={codigoAgente}
                                onChangeText={(text) => setCodigoAgente(text)}
                                />
                                </View>
                            )}  

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

          

                             
     </View>
    )
}