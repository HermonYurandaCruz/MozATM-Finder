import React, { useEffect, useState } from 'react';
import {Image,View,ScrollView,Text,TextInput,TouchableOpacity} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons,Feather,MaterialCommunityIcons,Entypo  } from '@expo/vector-icons';

import imgATM from '../../../src/assets/ATM.png'
import imgBank from '../../../src/assets/Bank.png'
import bankInfra from '../../../src/assets/bankInfra.png'

import perfilImg from '../../../src/assets/perfil.png'

import { useNavigation } from '@react-navigation/native';


export default function Home(){
  
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const [userName, setUserName] = useState(null);


  const handleLoginPress = () => {
    navigation.navigate('InfoATM');
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.nome); // Supondo que o ID do usuário esteja em 'user.id'
        }
      } catch (error) {
        // Tratamento de erro ao recuperar os dados do usuário
      }
    };

    getUserData();
  }, []);



    return(
        <View style={styles.container}>

          <View style={styles.header}>
            <Image style={styles.logoImag} source={perfilImg}/>
            <Text style={styles.TextOla}>Olá,</Text>
            <Text style={styles.UserName}>{userName}</Text>
            <Ionicons style={styles.iconNotification} name="notifications-outline" size={24} color="black" />
          </View>

          <View style={styles.inputPesquisa}>
            <Feather name="search" size={20} color="#19191B" />
            <TextInput
                  placeholder='Pesquisar Banco ou ATM'
                  style={styles.input}
                  />
          </View>

          <Text style={styles.Text}>Localize ATMs e Bancos com Facilidade</Text>
          <View style={styles.containerATM}>
            <View>
            <TouchableOpacity style={styles.buttonATM}>
                    <View style={styles.buttonContent} >
                        <Image 
                        source={imgATM} 
                        />
                    </View>
                    <Text style={styles.TextMedio}>Encontre ATM/Banco</Text>

                </TouchableOpacity>
            </View>

            <View>

            <TouchableOpacity style={styles.buttonATM}>
                    <View  style={styles.buttonContent}>
                        <Image 
                        source={imgBank} 
                        />
                    </View>
                    <Text style={styles.TextMedio}>Encontre Agentes</Text>

                </TouchableOpacity>
            </View>

          </View>

          <Text style={styles.TextLista}>Perto de si</Text>

          <ScrollView style={styles.ListCardBank}
          showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity style={styles.CardBank}  onPress={handleLoginPress}>
              <Image style={styles.imgBank} source={bankInfra}/>

              <View style={styles.infoBank}>
                <Text style={styles.TextNomeBank}>Nome do Banco</Text>
                <Text style={styles.TextTypoBank}> Atm ou Bank</Text>

                <Text style={styles.TextAndereco}> 
                <Ionicons name="md-location-outline" size={16} color="black" />
                Endereco</Text>

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

                <TouchableOpacity style={styles.buttonDireção}>
                    <View style={styles.buttonContentCard}>
                        <MaterialCommunityIcons name="directions" size={15} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Direção</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDireção}>
                    <View style={styles.buttonContentCard}>
                    <Ionicons name="call-sharp" size={15} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Contacto</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDireção}>
                    <View style={styles.buttonContentCard}>
                        <Entypo name="share" size={15} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Partilhar</Text>
                    </View>
                </TouchableOpacity>


                </View>

              </View>

            </TouchableOpacity>

            <View style={styles.CardBank}>
              <Image style={styles.imgBank} source={bankInfra}/>

              <View style={styles.infoBank}>
                <Text style={styles.TextNomeBank}>Nome do Banco</Text>
                <Text style={styles.TextTypoBank}> Atm ou Bank</Text>

                <Text style={styles.TextAndereco}> 
                <Ionicons name="md-location-outline" size={16} color="black" />
                Endereco</Text>

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

                <TouchableOpacity style={styles.buttonDireção}>
                    <View style={styles.buttonContentCard}>
                        <MaterialCommunityIcons name="directions" size={15} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Direção</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDireção}>
                    <View style={styles.buttonContentCard}>
                    <Ionicons name="call-sharp" size={15} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Contacto</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDireção}>
                    <View style={styles.buttonContentCard}>
                        <Entypo name="share" size={15} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Partilhar</Text>
                    </View>
                </TouchableOpacity>


                </View>

              </View>

            </View>


            <View style={styles.CardBank}>
              <Image style={styles.imgBank} source={bankInfra}/>

              <View style={styles.infoBank}>
                <Text style={styles.TextNomeBank}>Nome do Banco</Text>
                <Text style={styles.TextTypoBank}> Atm ou Bank</Text>

                <Text style={styles.TextAndereco}> 
                <Ionicons name="md-location-outline" size={16} color="black" />
                Endereco</Text>

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

                <TouchableOpacity style={styles.buttonDireção}>
                    <View style={styles.buttonContentCard}>
                        <MaterialCommunityIcons name="directions" size={15} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Direção</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDireção}>
                    <View style={styles.buttonContentCard}>
                    <Ionicons name="call-sharp" size={15} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Contacto</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDireção}>
                    <View style={styles.buttonContentCard}>
                        <Entypo name="share" size={15} color="rgba(25, 25, 27, 1)" />
                        <Text style={styles.textButton}>Partilhar</Text>
                    </View>
                </TouchableOpacity>


                </View>

              </View>

            </View>


          </ScrollView>



          






          
        </View>
    )
}