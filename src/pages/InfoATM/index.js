import React from "react";
import {View,KeyboardAvoidingView,Text,Image,TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { Ionicons,Octicons,MaterialCommunityIcons  } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


import bankInfra from '../../../src/assets/imagem.png';
import perfilImg from '../../../src/assets/perfil.png'



export default function InfoATM(){
  const navigation = useNavigation();

    return(
      <View style={styles.container}>
       <View style={styles.heade}>
          <Ionicons name="arrow-back-outline" size={24} color="black" onPress={()=>navigation.goBack()} />
          <Text style={styles.Titulo}>Nome do Banco</Text>
          <Octicons style={styles.iconARch} name="archive" size={20} color="black" />
       </View>
       <Image style={styles.ImagemBank} source={bankInfra}></Image>
        
        <View style={styles.UserNameAdd}>
          <Text>Adicioado Por:</Text>
          <Text>Nome de Usuario</Text>
        </View>

        <View style={styles.dados}>
          <TouchableOpacity style={styles.gosto}>
          <MaterialCommunityIcons name="cards-heart-outline" size={16} color="black" />
            <Text>
              250
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

        <View style={styles.comentario}>
          <Image source={perfilImg}/>
          <View style={styles.dadosComentario}>
            <Text style={styles.NomeUser}>Nome de Usuario</Text>
            <View style={styles.caixaComentario}>
            <Text style={styles.conteudoComentario} >Conteudo do comentario</Text>
            </View>
            <Text style={styles.Data}>Data</Text>
          </View>
        </View>

       <KeyboardAvoidingView
       style={styles.escreverComentario}
       behavior="padding" >
        <TextInput
                  placeholder='Adicionar comentario'
                  style={styles.input}
                  />
         <TouchableOpacity style={styles.Enviar}>
             <MaterialCommunityIcons name="send-outline" size={24} color="black" />
          </TouchableOpacity>
       </KeyboardAvoidingView>

      </View>
    )
}