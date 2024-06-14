import React,{useEffect,useState} from "react";
import { TouchableOpacity,View,Text,TextInput,Image,FlatList,ActivityIndicator ,Modal} from "react-native";
import styles from './styles';
import { useNavigation,useRoute } from "@react-navigation/native";
import { Ionicons,Feather,FontAwesome5,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../services/firebaseConfig'


import imgBook from '../../assets/education.png';

export default function Subject(){

    const navigation = useNavigation();
    const route = useRoute();
    
    const [skillsData,setSkillsData]= useState([])
    const [subject, setSubject] = useState('');
    const [mensagemButao, setMensabem] = useState('Publicar Curso');


    const { skills } = route.params;
    const { id,number_subject,estado_public,name_course} = skills;
    const [showPopup, setShowPopup] = useState(false);

    const [showPopup2, setShowPopup2] = useState(false);


    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);

    const openQuestoes = async (dataSubject) => {
      navigation.navigate('ListLessonTeachers', { dataSubject });
    };
   


 
    useEffect(() => {
      const malyRef = firebase.firestore().collection('Course').doc(id).collection('subjects');
  
      const unsubscribe = malyRef.onSnapshot((querySnapshot) => {
        const malys = [];
  
        querySnapshot.forEach((doc) => {
          malys.push({ id: doc.id, ...doc.data() });
        });
  
        setSkillsData(malys);
      });
  
      // Clean up the subscription on unmount
      return () => unsubscribe();
  
    }, [id,skills]);
      

    const PublicarCurso= async()=>{
      setShowPopup2(false)
      if(estado_public==false){
        const userRefUser = firebase.firestore().collection('Course').doc(id);
        await userRefUser.update({
          estado_public: true,
        });
      }else{
        const userRefUser = firebase.firestore().collection('Course').doc(id);
        await userRefUser.update({
          estado_public: false,
        });
      }
      navigation.goBack();

    }


    const SubmeterQuestao=async()=>{

      if(!subject){
        return
      }
  
      try{
        setShowPopup(false)
        setSubject('')

          await firebase.firestore().collection('Course').doc(id).collection('subjects').add({
              idCourse:id,
              subject:subject,
              numberSubject:1+number_subject
            });



      }catch (error){
          console.error('Erro ao registrar Questao:', error);
      }finally {

          const userRefUser = firebase.firestore().collection('Course').doc(id);
          await userRefUser.update({
              number_subject: 1 + number_subject,
          });
          setShowPopup(false)
        }
  }

  useEffect(()=>{
    if(estado_public==true){
      setMensabem('Ocultar Curso')
    }
  })


    return(
        <View style={styles.container}>

            <TouchableOpacity style={{flexDirection:"row",marginBottom:32,justifyContent:"space-between",alignItems:"center"}}>
                 <Ionicons name="chevron-back-outline" size={24} color="#063F51" onPress={()=>navigation.goBack()} />
                 <View style={{alignItems:"center"}}>
                     <Text style={styles.textHeadres}>Temas do curso</Text>
                     <Text style={styles.textHeadres2}>{name_course}</Text>

                 </View>
                 <Feather name="plus" size={28} color="#063F51"  onPress={()=>setShowPopup(true)}/>
            </TouchableOpacity>
          
         
 
           

            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={skillsData}
                    initialNumToRender={18}
                    keyExtractor={skills=> String(skills.id)} 
                    renderItem={({item:skills,index})=>(
                      
                        <View style={styles.quizzDia}>
                                <View style={{flexDirection:"row"}}>
                                    <View style={{marginEnd:8}}>
                                        <Image style={{width:64,height:64}} source={imgBook}/>
                                    </View>

                                    <View>
                                            <Text style={styles.textTitulo}>{skills.subject}</Text>
                                            <Text style={styles.textSubTitulo}>{skills.number_lessons} Aulas </Text>
                                    </View>
                                </View>
                                
                                    <TouchableOpacity  onPress={()=>openQuestoes(skills)}>
                                        <SimpleLineIcons style={{marginStart:28}} name="arrow-right" size={22} color="rgba(0, 0, 0, 0.7)" />
                                    </TouchableOpacity>
    
                           </View>

                    )}
          ></FlatList>

            <TouchableOpacity style={styles.button} onPress={()=>setShowPopup2(true)}>
            {showText && <Text style={styles.text}>{mensagemButao} </Text>}

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
                                    <Text style={styles.titlePopUp}>Adicionar Tema</Text>

                                        <TextInput
                                        placeholder='Adicione o Tema da Aula...'
                                        style={styles.input}
                                        value={subject}
                                        onChangeText={(text) => setSubject(text)}
                                        />
                                    
                                    <TouchableOpacity style={styles.buttonPopUP} onPress={()=>SubmeterQuestao()} >
                                      <Text style={{fontSize:15,color:"#FFFFFF", fontWeight:"500",textAlign:"center"}}>Concluir</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{paddingVertical:16,textAlign:"center"}} onPress={()=>setShowPopup(false)} >
                                      <Text  style={{fontSize:15,fontWeight:"500",textAlign:"center", color:"rgba(255, 73, 80, 1)"}}>Cancelar</Text>
                                    </TouchableOpacity>
                                  </View>
                            </Modal>  





                            <Modal
                                  animationType="slide"
                                  transparent={true}
                                  visible={showPopup2}
                                  style={styles.modalContainer}
                                  presentationStyle="overFullScreen"
                                  onRequestClose={() => setShowPopup2(false)}
                                >
                                  <View style={styles.modalView}>
                                    <Text style={styles.titlePopUp}>Deseja {mensagemButao} </Text>

                                    <TouchableOpacity style={styles.buttonPopUP} onPress={()=>PublicarCurso()} >
                                      <Text style={{fontSize:15,color:"#FFFFFF", fontWeight:"500",textAlign:"center"}}>Sim</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{paddingVertical:16,textAlign:"center"}} onPress={()=>setShowPopup2(false)} >
                                      <Text  style={{fontSize:15,fontWeight:"500",textAlign:"center", color:"rgba(255, 73, 80, 1)"}}>Cancelar</Text>
                                    </TouchableOpacity>
                                  </View>
                            </Modal>  







            
        </View>


    )
}