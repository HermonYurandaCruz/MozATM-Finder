import React,{useEffect,useState} from "react";
import { TouchableOpacity,View,Text,Image,FlatList } from "react-native";
import styles from './styles';
import { useNavigation,useRoute } from "@react-navigation/native";
import { Ionicons,Feather,FontAwesome5,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../services/firebaseConfig'


import imgQuestion from '../../assets/question.png';

export default function Questions(){

    const navigation = useNavigation();
    const route = useRoute();

    const [skillsData,setSkillsData]= useState([])
    const [questionData,setQuestionData]= useState([])


    const { skills } = route.params;
    const { id,nivelSkill, tituloSkill } = skills;


    const openQuestoes =(id)=>{
        console.log("id:",skills)
    }
        
    const AddQuestions = async (skills) => {
        navigation.navigate('AddQuestions',{skills});
      };


      useEffect(() => {

      const loadUserData = () => {
        const UsersRef = firebase.firestore().collection('Questions').where('idSkill', '==', id);
      
        const unsubscribe = UsersRef.onSnapshot((querySnapshot) => {
          const questionData = [];
      
          querySnapshot.forEach((doc) => {
            questionData.push({ id: doc.id, ...doc.data() });
          });
      
          setQuestionData(questionData);
        });
      
        return unsubscribe;
      };
      loadUserData();
       
      }, []);
      


      useEffect(()=>{

      },[skills])
    return(
        <View style={styles.container}>

            <TouchableOpacity style={{flexDirection:"row",marginBottom:32,justifyContent:"space-between",alignItems:"center"}}>
                 <Ionicons name="chevron-back-outline" size={24} color="#063F51" onPress={()=>navigation.goBack()} />
                 <View style={{alignItems:"center"}}>
                    <Text style={styles.textHeadres}>{tituloSkill}</Text>
                    <Text>{nivelSkill}</Text>
                 </View>
                
                 <Feather name="plus" size={28} color="#063F51"  onPress={()=>AddQuestions(skills)}/>
            </TouchableOpacity>
          
         
 
           

            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={questionData}
                    initialNumToRender={18}
                    keyExtractor={questions=> String(questions.id)} 
                    renderItem={({item:questions,index})=>(
                      
                        <TouchableOpacity style={styles.quizzDia} >
                                <View style={{flexDirection:"row", width:'80%'}}>
                                    <View style={{marginEnd:8}}>
                                        <Image style={{width:64,height:64}} source={imgQuestion}/>
                                    </View>

                                    <View style={{width:'100%'}}>
                                            <Text style={styles.textTitulo}>{questions.questao}</Text>
                                            <Text style={styles.textSubTitulo}>{questions.alternativaCerta} </Text>
                                    </View>
                                </View>
                                
                                    <View>
                                    </View>
    
                           </TouchableOpacity>

                    )}
          ></FlatList>


            
        </View>


    )
}