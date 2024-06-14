import React, { useState, useEffect} from "react";
import { TouchableOpacity,View,Text,TextInput,Modal,ActivityIndicator } from "react-native";
import styles from './styles';
import { useNavigation,useRoute} from "@react-navigation/native";
import { Ionicons,Feather,Foundation,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import {Dropdown} from 'react-native-element-dropdown'
import {firebase} from '../../services/firebaseConfig'
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';


import imgBook from '../../assets/education.png';

export default function AddLessons(){

    const navigation = useNavigation();
    const route = useRoute();

    const [showPopup, setShowPopup] = useState(false);

    const [id_video,setId_video]= useState('')
    const [descricao,setDescricao]= useState('');
    const [lesson, setLesson]= useState('')

    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);


    const { idCourse,idSubject } = route.params;


    useEffect(()=>{
    })

    const CleanInput=()=>{
        setDescricao('')
        setId_video('')
        setLesson('')
        setShowPopup(false)
    }
 

    const SubmeterQuestao=async()=>{
        setLoading(true)
        setShowText(false)

        if(!lesson || !id_video ||!descricao){
          setLoading(false)
          setShowText(true)
          return
        }

        try{

            await firebase.firestore().collection('Course').doc(idCourse).collection('subjects').doc(idSubject).collection('lessons').add({
                lesson:lesson,
                id_video:id_video,
                description:descricao,
              });
              setShowPopup(true);
              setLoading(false)
              setShowText(true)

        }catch (error){
            setLoading(false)
            setShowText(true)
            console.error('Erro ao registrar Questao:', error);
        }
    }



      useEffect(()=>{


      },[idCourse,idSubject])

      const validarVideou=()=>{
        return(

          <View style={{ width: "100%",marginBottom:16}}>
          <iframe
            width="100%"
            height="270"
            src={`https://www.youtube.com/embed/${id_video}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
    
            </View>

        )
      }

    return(
        <View style={styles.container}>

            <TouchableOpacity style={{flexDirection:"row",marginBottom:16,justifyContent:"space-between",alignItems:"center"}}>
                 <Ionicons name="chevron-back-outline" size={24} color="#063F51" onPress={()=>navigation.goBack()} />
                 <Text style={styles.textHeadres}>Adicionar Aula </Text>
                 <View></View>
            </TouchableOpacity>
            {validarVideou()}


            <Text style={styles.textNext}> Titulo da Aula </Text>
                <TextInput
                placeholder='Titulo...'
                style={styles.input}
                value={lesson}
                onChangeText={(text) => setLesson(text)}
                />

                <Text style={styles.textNext}> Descrição da Aula </Text>
                <TextInput
                placeholder='Descrição...'
                style={styles.input}
                value={descricao}
                onChangeText={(text) => setDescricao(text)}
                />

                    <Text style={styles.textNext}> Id do Video(YouTube) </Text>
                    <TextInput
                    placeholder='id...'
                    style={styles.input}
                    value={id_video}
                    onChangeText={(text) => setId_video(text)}
                    />



        



          <TouchableOpacity style={styles.button} onPress={SubmeterQuestao}>
            {showText && <Text style={styles.text}>Adicionar Aula</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>



                             <Modal
                                  animationType="slide"
                                  transparent={true}
                                  visible={showPopup}
                                  style={styles.modalContainer}
                                  presentationStyle="overFullScreen"
                                  onRequestClose={() => setShowPopup(false)}
                                >
                                  <View style={styles.modalView}>
                                    <Text style={styles.titlePopUp}>Deseja adicionar outra Aula?</Text>
                                    
                                    <TouchableOpacity style={styles.buttonPopUP} onPress={()=>CleanInput()} >
                                      <Text style={styles.text}>Sim</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{paddingVertical:16}}onPress={()=>navigation.goBack()} >
                                    <Text  style={{fontSize:15,fontWeight:"500",textAlign:"center", color:"rgba(255, 73, 80, 1)"}}>Cancelar</Text>
                                    </TouchableOpacity>
                                  </View>
                            </Modal>  


            
        </View>


    )
}