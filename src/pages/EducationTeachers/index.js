import React,{useEffect,useState} from "react";
import { TouchableOpacity,View,Text,Image,FlatList } from "react-native";
import styles from './styles';
import { useNavigation,useRoute } from "@react-navigation/native";
import { Ionicons,Feather,FontAwesome5,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../services/firebaseConfig'


import imgBook from '../../assets/education.png';

export default function EducationTeachers(){

    const navigation = useNavigation();
    const route = useRoute();
    
    const [skillsData,setSkillsData]= useState([])

    const {idUser} =route.params;


    const openQuestoes = async (skills) => {
      navigation.navigate('Subject', { skills });
    };
    const AddSkills = () => {
        navigation.navigate('AddCourse');
      };


      useEffect(() => {
        const loadMalyProximos = () => {
          console.log("UserId Qr", idUser);
    
          const malyRef = firebase.firestore().collection('Course').where('idUserCourse', '==', idUser);
    
          const unsubscribe = malyRef.onSnapshot((querySnapshot) => {
            const malys = [];
    
            querySnapshot.forEach((doc) => {
              malys.push({ id: doc.id, ...doc.data() });
            });
    
            setSkillsData(malys);
          });
    
          // Clean up the subscription on unmount
          return () => unsubscribe();
        };
    
        loadMalyProximos();
    
      }, [idUser]);
  

      const publicStatus=(estado)=>{
        if(estado==true){
          return(
            <View>
              <Feather name="eye" size={16} color="rgba(106, 149, 255, 1)" />
            </View>
          )
        }else{
          return(
            <View>
              <Feather name="eye-off" size={16} color="rgba(254, 107, 113, 1)" />
            </View>
          )
        }

      }
      

    return(
        <View style={styles.container}>

            <TouchableOpacity style={{flexDirection:"row",marginBottom:32,justifyContent:"space-between",alignItems:"center"}}>
                 <Ionicons name="chevron-back-outline" size={24} color="#063F51" onPress={()=>navigation.goBack()} />
                 <Text style={styles.textHeadres}>Cursos que sou Intrutor </Text>
                 <Feather name="plus" size={28} color="#063F51"  onPress={AddSkills}/>
            </TouchableOpacity>
          
         
 
           

            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={skillsData}
                    initialNumToRender={18}
                    keyExtractor={skills=> String(skills.id)} 
                    renderItem={({item:skills,index})=>(
                      
                        <View style={styles.quizzDia} >
                                <View style={{flexDirection:"row"}}>
                                    <View style={{marginEnd:8}}>
                                        <Image style={{width:64,height:64}} source={{uri:skills.img_course}}/>
                                    </View>

                                    <View>
                                      <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between",width:'100%'}}>
                                          <Text style={styles.textTitulo}>{skills.name_course}</Text>
                                          <View>
                                             {publicStatus(skills.estado_public)}
                                          </View>
                                      </View>
                                            <Text style={styles.textSubTitulo}>{skills.number_students} Alunos </Text>
                                            <Text style={styles.textSubTitulo}>{skills.number_subject} Temas</Text>
                                    </View>
                                </View>
                                
                                    <TouchableOpacity onPress={()=>openQuestoes(skills)}>
                                        <SimpleLineIcons style={{marginStart:28}} name="arrow-right" size={22} color="rgba(0, 0, 0, 0.7)" />
                                    </TouchableOpacity>
    
                           </View>

                    )}
          ></FlatList>


            
        </View>


    )
}