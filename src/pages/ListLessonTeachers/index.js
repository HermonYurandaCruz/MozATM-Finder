import React,{useEffect,useState} from "react";
import { TouchableOpacity,View,Text,Image,FlatList } from "react-native";
import styles from './styles';
import { useNavigation,useRoute } from "@react-navigation/native";
import { Ionicons,Feather,FontAwesome5,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../services/firebaseConfig'


import imgVideo from '../../assets/streaming.png';

export default function ListLessonTeachers(){

    const navigation = useNavigation();
    const route = useRoute();
    
    const [skillsData,setSkillsData]= useState([])


    const { dataSubject } = route.params;
    const { id,idCourse,subject} = dataSubject;

  
    const AddSkills = () => {
        navigation.navigate('AddLessons',{idCourse:idCourse,idSubject:id});
      };


      useEffect(() => {
        const malyRef = firebase.firestore()
          .collection('Course')
          .doc(idCourse)
          .collection('subjects')
          .doc(id)
          .collection('lessons');
    
        const unsubscribe = malyRef.onSnapshot((querySnapshot) => {
          const malys = [];
    
          querySnapshot.forEach((doc) => {
            malys.push({ id: doc.id, ...doc.data() });
          });
    
          setSkillsData(malys);
        });
    
        // Clean up the subscription on unmount
        return () => unsubscribe();
    
      }, [dataSubject,idCourse, id]);
    
      

    return(
        <View style={styles.container}>

            <TouchableOpacity style={{flexDirection:"row",marginBottom:32,justifyContent:"space-between",alignItems:"center"}}>
                 <Ionicons name="chevron-back-outline" size={24} color="#063F51" onPress={()=>navigation.goBack()} />
                 <Text style={styles.textHeadres}>{subject}</Text>
                 <Feather name="plus" size={28} color="#063F51"  onPress={AddSkills}/>
            </TouchableOpacity>
          
         
 
           

            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={skillsData}
                    initialNumToRender={18}
                    keyExtractor={skills=> String(skills.id)} 
                    renderItem={({item:skills,index})=>(
                      
                        <TouchableOpacity style={styles.quizzDia} >
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                    <View style={{marginEnd:8}}>
                                        <Image style={{width:64,height:64}} source={imgVideo}/>
                                    </View>

                                    <View>
                                            <Text style={styles.textSubTitulo}>{skills.lesson} </Text>
                                    </View>
                                </View>
                                
                             
    
                           </TouchableOpacity>

                    )}
          ></FlatList>


            
        </View>


    )
}