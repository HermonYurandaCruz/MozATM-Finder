import React, { useState, useEffect} from "react";
import { TouchableOpacity,View,Text,TextInput,Image,ActivityIndicator,ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons,Feather,Foundation,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import {Dropdown} from 'react-native-element-dropdown'
import {firebase} from '../../services/firebaseConfig'
import * as ImagePicker from 'expo-image-picker';
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

import imgBook from '../../assets/education.png';

export default function AddCourse(){

    const navigation = useNavigation();
    const [nomeCurso, setNomeCurso]= useState('')
    const [descricao,setDescricao]= useState('')
    const [ destinatario , setDestinatario]=useState('')
    const [ requisitos, setRequisitos]=useState('')
    const [ aprender,setAprender ]=useState('')
    const [data, setData] = useState('')
    const [userId, setUserId] = useState('')

    const [categoria, setCategoria] = useState('');
    const [isFocusCategoria, setIsFocusCategoria] = useState(false);
    const [author,setAuthor]=useState('')

    const [img,setImg]=useState('')
    const [nivel, setNivel] = useState('');
    const [isFocusNivel, setIsFocusNivel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [price,setPrice]=useState(0)

    const dataNivel=[
      { id: 1, nome: 'Grátis', value: 'Grátis' },{ id: 2, nome: 'Pago', value: 'Pago' },
   
    ]

    const dataCategoria=[
      { id: 1, nome: 'Design', value: 'Design' },{ id: 2, nome: 'Programacao', value: 'Programacao' },
      { id: 1, nome: 'Marketing', value: 'Marketing' },{ id: 2, nome: 'Moda', value: 'Moda' },
    ]

    const retrieveUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData !== null) {
          const userData = JSON.parse(storedUserData);
          setUserId(userData.id); 
          setAuthor(userData.nome)
        }
      } catch (error) {
        console.error('Erro ao recuperar os dados do usuário:', error);
        // Tratar erros ao recuperar dados do AsyncStorage
      }
    };

    function getCurrentDate() {
      const currentDate = new Date();
      return format(currentDate, 'dd/MM/yyyy');
    }


    const addSkills=async()=>{
        setLoading(true)
        setShowText(false)

        if(!nomeCurso || !img || !author|| !nivel ||!categoria ||!descricao ||!aprender ||!data){
          setLoading(false)
          setShowText(true)
          return;
        }

        try{

            await firebase.firestore().collection('Course').add({
                name_course:nomeCurso,
                author:author,
                img_course: img,
                payment_method:nivel,
                priceCourse:price,
                number_lessons:0,
                number_subject:0,
                likes:0,
                number_students:0,
                date_publication:data,
                receiver:destinatario,
                requirements:requisitos,
                category:categoria,
                description:descricao,
                idUserCourse:userId,
                whatToEarnt:aprender,
                estado_public: false,
                estado_aceite:false,
                estadoConfirmadoAceite:false,
               
              });

        }catch (error){
            console.error('Erro ao registrar skill:', error);
        }finally {
            setLoading(false);
            setShowText(true);
            navigation.goBack();
          }
    }


    const inputPagamento=()=>{
      if(nivel=='Pago'){
        return(
          <View>
               <Text style={styles.Text}> Valor do Curso</Text>
                <TextInput
                placeholder='XXX.00 Mt...'
                style={styles.input}
                value={price}
                onChangeText={(text) => setPrice(text)}
                />

          </View>
        )
      }
    }

    const selecionarFoto = async () => {
        try {      
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*'; 
          input.multiple = false; 
      
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
      
        } catch (error) {
          console.error('Erro ao selecionar a foto:', error);
        }
      };
      
      const enviarImagemAoFirebase = async (selectedImage) => {
        const numeroAleatorio = Math.floor(Math.random() * 1000000);
        const numeroAleatorio1 = Math.floor(Math.random() * 1000000);

        const idFoto = `${numeroAleatorio1}_${numeroAleatorio}`;
      
        const fotoURL = URL.createObjectURL(selectedImage);
      
        const response = await fetch(fotoURL);
        const blob = await response.blob();
        const storageRef = firebase.storage().ref().child(`fotosSkiles/${idFoto}`);
        await storageRef.put(blob);
        const fotoDownloadURL = await storageRef.getDownloadURL();
      
        setImg(fotoDownloadURL);
        return fotoDownloadURL;
      };
      

      const renderaizerImg =()=>{
        if(img){
            return(
                <Image style={{width:150,height:150}} source={img} />
            )
        }
        return null
      }

      useEffect(()=>{
        const today = getCurrentDate();
        setData(today)
        retrieveUserData();
        inputPagamento();
      })


    return(
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>


            <TouchableOpacity style={{flexDirection:"row",marginBottom:32,justifyContent:"space-between",alignItems:"center"}}>
                 <Ionicons name="chevron-back-outline" size={24} color="#063F51" onPress={()=>navigation.goBack()} />
                 <Text style={styles.textHeadres}>Adicionar Curso </Text>
                 <View></View>
            </TouchableOpacity>


            <Text style={styles.Text}>Nome do Curso </Text>
                <TextInput
                placeholder='Nome do Curso'
                style={styles.input}
                value={nomeCurso}
                onChangeText={(text) => setNomeCurso(text)}
                />


            <Text style={styles.Text}>Categoria </Text>
            <Dropdown
            style={[styles.input]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataCategoria}
            search
            maxHeight={300}
            labelField="nome"
            valueField="id"
            placeholder={categoria}
            searchPlaceholder="Pesquisar..."
            value={categoria}
            onFocus={() => setIsFocusCategoria(true)}
            onBlur={() => setIsFocusCategoria(false)}
            onChange={item => {
              setCategoria (item.value);
              setIsFocusCategoria(false);
            }}
            renderLeftIcon={() => (
              <Feather 
                style={styles.icon}
                color={isFocusNivel ? 'rgba(106, 149, 255, 1)' : 'rgba(106, 149, 255, 1)'}
                name="briefcase"
                size={22}
              />
            )}
          /> 
        
            <Text style={styles.Text}> O que o aluno ira aprender? </Text>
                <TextInput
                placeholder='O aluno ira aprender...'
                style={styles.inputDescricao}
                multiline={true}
                numberOfLines={2}
                value={aprender}
                onChangeText={(text) => setAprender(text)}
                />

              <Text style={styles.Text}> Descrição do curso </Text>
                <TextInput
                placeholder='Descrição...'
                style={styles.inputDescricao}
                multiline={true}
                numberOfLines={2}
                value={descricao}
                onChangeText={(text) => setDescricao(text)}
                />

<Text style={styles.Text}>Pagamento </Text>
            <Dropdown
            style={[styles.input]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataNivel}
            search
            maxHeight={300}
            labelField="nome"
            valueField="id"
            placeholder={nivel}
            searchPlaceholder="Pesquisar..."
            value={nivel}
            onFocus={() => setIsFocusNivel(true)}
            onBlur={() => setIsFocusNivel(false)}
            onChange={item => {
              setNivel (item.value);
              setIsFocusNivel(false);
            }}
            renderLeftIcon={() => (
              <Feather 
                style={styles.icon}
                color={isFocusNivel ? 'rgba(106, 149, 255, 1)' : 'rgba(106, 149, 255, 1)'}
                name="dollar-sign"
                size={16}
              />
            )}
          /> 

          {inputPagamento()}

              <Text style={styles.Text}> Requisitos Basicos para fazer o curso </Text>
                <TextInput
                placeholder='Requisitos...'
                style={styles.inputDescricao}
                value={requisitos}
                multiline={true}
                numberOfLines={2}
                onChangeText={(text) => setRequisitos(text)}
                />


              <Text style={styles.Text}> Para quem é este curso</Text>
                <TextInput
                placeholder='Requisitos...'
                style={styles.inputDescricao}
                multiline={true}
                numberOfLines={2}
                value={destinatario}
                onChangeText={(text) => setDestinatario(text)}
                />

        



          <Text onPress={selecionarFoto}>Adicionar imagem</Text>
          {renderaizerImg()}
          <TouchableOpacity style={styles.button} onPress={addSkills} disabled={loading}>
            {showText && <Text style={styles.text}>Adicionar Curso</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>


            </ScrollView>

            
        </View>


    )
}