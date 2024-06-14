import React, { useEffect, useState, useRef } from 'react';
import {Linking,Image,View,ActivityIndicator,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useRoute } from '@react-navigation/native';

import { Foundation ,Ionicons,MaterialCommunityIcons,FontAwesome5,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';

import {firebase} from '../../services/firebaseConfig'

import imgMan from '../../assets/man.png';
import imgWoman from '../../assets/woman.png';

import imgAprenderHoje from '../../assets/Telecommuting-rafiki.png';
import imgGraphic from '../../assets/graphic-design.png';
import imgCoding from '../../assets/coding.png';
import imgContent from '../../assets/content-strategy.png';
import imgBrand from '../../assets/brand.png'
import imgCooking from '../../assets/cooking.png'

import { ScrollView } from 'react-native-web';




export default function Home(){

    const navigation = useNavigation();
    const [skillsData,setSkillsData]= useState([])
    const[nameUser, setNomeUser]=useState('');
    const[genero, setGenero]=useState('')
    const[imagem, setImagem]=useState('')


    const [search,setSearch]=useState('')
    const scrollViewRef = useRef();


    const dataCategoria = [
      { id: 1, nome: 'Design', value: 'Design', image: imgGraphic, numeberCourse:'3' },
      { id: 2, nome: 'Programacao', value: 'Programacao', image:imgCoding, numeberCourse:'2' },
      { id: 3, nome: 'Marketing', value: 'Marketing', image:imgContent  ,numeberCourse:'1'},
      { id: 4, nome: 'Moda', value: 'Moda', image: imgBrand , numeberCourse:'2'},
      { id: 5, nome: 'Culinaria', value: 'Culinaria', image: imgCooking , numeberCourse:'3'},

    ];
    

    const searchFilter = (text) => {
      const filtered = skillsData.filter((item) =>
        item.name_course.toLowerCase().includes(text.toLowerCase())
      );
      setSearch(text);
      if (text === '') {
        loadSkills();
      } else {
        setSkillsData(filtered);
      }
    }



    const retrieveUserData = async () => {
        try {
          const storedUserData = await AsyncStorage.getItem('userData');
          if (storedUserData !== null) {
            const userData = JSON.parse(storedUserData);
            setNomeUser(userData.nome)
            setGenero(userData.sexo)
          }
        } catch (error) {
          console.error('Erro ao recuperar os dados do usuário:', error);
          // Tratar erros ao recuperar dados do AsyncStorage
        }
      };

      const loadSkills = async () => {
        const cacheSkills = await AsyncStorage.getItem('Course');
      
        const skillsRef = firebase.firestore().collection('Course').where('estado_public','==',true);
      
        const unsubscribe = skillsRef.onSnapshot(async (querySnapshot) => {
          const skillsData = [];
      
          querySnapshot.forEach((doc) => {
              skillsData.push({ id: doc.id, ...doc.data() });
          });
      
          // Atualizar os dados em cache apenas se houver uma diferença
          if (JSON.stringify(skillsData) !== cacheSkills) {
            await AsyncStorage.setItem('Course', JSON.stringify(skillsData));
          }
      
          setSkillsData(skillsData);
        });
      
        // Carregar os dados do cache se existirem
        if (cacheSkills) {
          setSkillsData(JSON.parse(cacheSkills));
        }
      
        return unsubscribe;
      };


      useEffect(() => {
        const loadSkills = async () => {
          const cacheSkills = await AsyncStorage.getItem('Course');
        
          const skillsRef = firebase.firestore().collection('Course').where('estado_public','==',true);
        
          const unsubscribe = skillsRef.onSnapshot(async (querySnapshot) => {
            const skillsData = [];
        
            querySnapshot.forEach((doc) => {
                skillsData.push({ id: doc.id, ...doc.data() });
            });
        
            // Atualizar os dados em cache apenas se houver uma diferença
            if (JSON.stringify(skillsData) !== cacheSkills) {
              await AsyncStorage.setItem('Course', JSON.stringify(skillsData));
            }
        
            setSkillsData(skillsData);
          });
        
          // Carregar os dados do cache se existirem
          if (cacheSkills) {
            setSkillsData(JSON.parse(cacheSkills));
          }
        
          return unsubscribe;
        };
        
        loadSkills();
        retrieveUserData();
      }, []);

      useEffect(()=>{
        if(genero=='masculino'){
            setImagem(imgMan)
        }
        if(genero=='feminino'){
            setImagem(imgWoman)
        }
      })


    return(
        <View style={styles.container}>
            
                <View style={styles.header}>
                    <View style={{flexDirection:"row", alignItems:"center", marginStart:8}}> 
                        <Image style={{width:54, height:54}}  source={imagem}/>
                        <View style={{marginStart:8}}>
                            <Text style={{fontSize:20,fontWeight:"700", color:"rgba(0, 0, 0, 0.7)"}} >Olá, {nameUser}</Text>
                            <Text style={{fontSize:14,fontWeight:"400", color:"rgba(0, 0, 0, 0.5)"}}>É bom voltar a ver-te!</Text>
                        </View>
                    </View>
                    <Ionicons name="notifications-outline" size={32} color="rgba(0, 0, 0, 0.7)" />
                </View>

            <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>

                <View style={styles.inputPesuisar}>  
                    <Ionicons name="search-outline" size={24} color="rgba(0, 0, 0, 0.7)" />
                    <TextInput
                                style={styles.input}
                                placeholder='Pesquisar curso'
                                placeholderTextColor={"rgba(0, 0, 0, 0.6)"}
                                value={search}
                                onChangeText={(text) => searchFilter(text)}

                            />
                </View>





                <View style={styles.detalhesjogador}> 
                    <View style={{width:200}}>
                        <Text style={styles.textTitulo}>O que queres aprender Hoje?</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{textAlign:"center",fontWeight:"600",color:"rgba(0, 0, 0, 0.7)"}}>Começar</Text>
                        </TouchableOpacity>
                    </View>
                    <Image style={{width:150,height:150}} source={imgAprenderHoje}/>
                </View>




                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingTop:16, marginBottom:8}}>
                    <Text style={styles.textTituloBlack}>Categorias</Text>
                    <Text style={{fontSize:14,fontWeight:"400", color:"rgba(0, 0, 0, 0.5)"}}>Ver mais</Text>
                </View>

                
                <FlatList           
                 showsHorizontalScrollIndicator={false}
            initialNumToRender={18}
            data={dataCategoria}
            horizontal={true}
            keyExtractor={marcas=> String(marcas.id)} 
            renderItem={({item:marcas,index})=>(
                  <TouchableOpacity onPress={()=>navigation.navigate('CourseByCategory',{categoria:marcas.nome})} style={styles.category} >
                      <Image style={{width:64,height:64}} source={marcas.image}/>
                      <Text style={{fontSize:15,fontWeight:"500", color:"rgba(0, 0, 0, 0.7)", width:110, textAlign:"center"}}>{marcas.nome}</Text>
                    <Text style={{fontSize:13,fontWeight:"400", color:"rgba(0, 0, 0, 0.4)"}}>{marcas.numeberCourse} Cursos</Text>
                  </TouchableOpacity>
              

           
            )}


            ></FlatList>




                    <View style={{marginTop:12,marginBottom:6}}>
                    <Text style={styles.textTituloBlack}>Cursos mais populares</Text>
                    </View>
                   


                     <FlatList
                    showsVerticalScrollIndicator={false}
                    data={skillsData}
                    initialNumToRender={18}
                    numColumns={2} // Defina o número de colunas
                    keyExtractor={cars=> String(cars.id)} 
                    renderItem={({item:cars,index})=>(
                      
                      <TouchableOpacity onPress={()=>navigation.navigate('CourseDetails',{courseData:cars})} style={styles.boxMaisLidos} >
                        <View>
                            <Image style={styles.capaMais} resizeMode='cover' source={{ uri: cars.img_course }} />
                        </View>
                              <View style={styles.dadosLivroMais}>
                                <Text style={{fontSize:18, fontWeight:"600",color:"rgba(0, 0, 0, 0.7)"}}>{cars.name_course}</Text>
                                <Text style={{fontSize:14, fontWeight:"500",color:"rgba(0, 0, 0, 0.5)"}}>{cars.number_lessons} Aulas</Text>
                                <Text style={{fontSize:14, fontWeight:"500",color:"rgba(0, 0, 0, 0.5)"}}>Autor: {cars.author}</Text>

                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:8}}>
                                     <Text style={{fontSize:16, fontWeight:"600",color:"rgba(0, 0, 0, 0.8)"}}>{cars.payment_method} </Text>
                                     <Text style={{fontSize:14, fontWeight:"500",color:"rgba(0, 0, 0, 0.5)", alignItems:"center"}}>
                                    <Foundation name="like" size={22} color="rgba(21, 83, 237, 0.6)" /> {cars.likes} </Text>
                                </View>

                              
                                                  
                            </View>
                      </TouchableOpacity>
                    )}
          ></FlatList>



</ScrollView>

          
        </View>
    )
}