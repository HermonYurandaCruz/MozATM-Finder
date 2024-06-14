import React,{useEffect,useState} from "react";
import { TouchableOpacity,View,Text,Image,FlatList ,ScrollView} from "react-native";
import styles from './styles';
import { useNavigation,useRoute } from "@react-navigation/native";
import { Ionicons,Feather,MaterialIcons,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../services/firebaseConfig'

import imgGraphic from '../../assets/graphic-design.png';
import imgVideo from '../../assets/streaming.png'
import imgDoc from '../../assets/document.png'


export default function CourseDetails(){
 
    const [navTab,setNavtab]=useState(true)
    const [data,setData]= useState([]);
    const [dataLessons,setDataLessons]= useState([]);
    const [valor,setValor]= useState('Grátis');
    const [Metical,setMetica]= useState('');

    const [expandedId, setExpandedId] = useState(null);
    const [userId, setUserId] = useState('')

    const route = useRoute();
    const navigation = useNavigation();

    const { courseData } = route.params;
    const { id,whatToEarnt,description,name_course,author,img_course,payment_method,priceCourse,number_subject,likes,number_students,date_publication,receiver,
      requirements,} = courseData;


      

    async function loadPerguntas(){
        const malyRef = firebase.firestore().collection('Course').doc(id).collection('subjects');
        const querySnapshot = await malyRef
        .get();
        const perguntas = [];
      
        querySnapshot.forEach((doc) => {
          perguntas.push({ id: doc.id, ...doc.data() });
        });
        setData(perguntas)
      }


    async function loadLessons(idSubject){
        const malyRef = firebase.firestore().collection('Course').doc(id).collection('subjects').doc(idSubject).collection('lessons');
        const querySnapshot = await malyRef
        .get();
        const perguntas = [];
      
        querySnapshot.forEach((doc) => {
          perguntas.push({ id: doc.id, ...doc.data() });
        });
        setDataLessons(perguntas)
      }
    
    
      const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
        loadLessons(id)
      };

      const retrieveUserData = async () => {
        try {
          const storedUserData = await AsyncStorage.getItem('userData');
          if (storedUserData !== null) {
            const userData = JSON.parse(storedUserData);
            setUserId(userData.id); 
          }
        } catch (error) {
          console.error('Erro ao recuperar os dados do usuário:', error);
          // Tratar erros ao recuperar dados do AsyncStorage
        }
      };


      const handlerAddcurso = async (id) => {
        if (!id) {
          console.error("User ID is not defined");
          return;
        }
      
        try {
          await firebase
            .firestore()
            .collection('users')
            .doc(userId)
            .collection('myCourses')
            .doc(id)
            .set({ id_course: id });
      
          console.log("Course added successfully");
          navigation.navigate('Course',{courseData:courseData})
        } catch (error) {
          console.error("Error adding course: ", error);
        }
      };
      
    
      useEffect(() => {
        loadPerguntas()
        if(priceCourse!=0){
          setValor(priceCourse)
          setMetica('.00 Mt')
        }
      },[id]);


    const moreInfoRefactor=()=>{
        if(navTab){
            return(
                <View>
                    <Text style={styles.textTituloBlack}>O que você aprenderá</Text>
                    <Text style={{color:"rgba(0, 0, 0, 0.6)"}}>
                    <Feather name="check-square" size={16} color="rgba(0, 0, 0, 0.6" /> {whatToEarnt} Desenvolver projeto 2D no Autocad
                    </Text>


                    <Text style={styles.textTituloBlack}>Descrição</Text>
                    <Text  style={{color:"rgba(0, 0, 0, 0.8)", fontSize:14, fontWeight:"400",marginStart:4}}>{description}</Text>


                    <Text style={styles.textTituloBlack}>Requisitos</Text>
                    <View style={{flexDirection:"row", alignItems:"center",marginBottom:4, padding:12}}>
                        <Feather name="feather" size={14} color="rgba(0, 0, 0, 0.3" />                
                        <Text style={{color:"rgba(0, 0, 0, 0.3", fontSize:14, fontWeight:"500",marginStart:4}}> {requirements}</Text>
                    </View>
                </View>
            )
        }else{
            return(
                <View>
                     <Text style={styles.textTituloBlack}>Conteúdo do curso</Text>
                     <FlatList
                            data={data}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(perguntas) => String(perguntas.id)}
                            renderItem={({ item: perguntas }) => {
                                const isExpanded = expandedId === perguntas.id;

                                return (
                                <>
                                    <View style={styles.CardBank}>
                                    <View>
                                        <Text style={{fontSize:15, fontWeight:600,color:"rgba(0, 0, 0, 0.7)",width:300}}>{perguntas.subject}</Text>
                                        <Text style={{marginTop:2,color:"rgba(0, 0, 0, 0.5)"}}>{perguntas.number_lessons} Aulas</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => toggleExpand(perguntas.id)}>
                                        <MaterialIcons
                                        name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                        size={24}
                                        color="black"
                                        />
                                    </TouchableOpacity>
                                    </View>

                                    {isExpanded && (
                                    <View style={styles.expandedContent}>
                                         <FlatList
                                                    showsVerticalScrollIndicator={false}
                                                    data={dataLessons}
                                                    keyExtractor={users=> String(users.id)} 
                                                    renderItem={({item:users,index})=>(
                                                        
                                                        <View style={styles.CardBank2}>
                                                        <Image style={{width:24,height:24,marginEnd:6}}source={ imgVideo }/>
                                                        <Text style={{fontSize:14, fontWeight:600,color:"rgba(0, 0, 0, 0.7)"}}> {users.lesson}</Text>
                                                        </View>
                                                
                                                    )}
                                            ></FlatList>

                                        
                                    </View>
                                    )}
                                </>
                            
                                );
                            }}
                            />


                        <Text style={styles.textTituloBlack}>Para quem é este curso</Text>
                        <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}>
                        <Feather name="users" size={18} color="rgba(0, 0, 0, 0.8)" /> {receiver} 
                        </Text>

                </View>
            )
        }
    }

    useEffect(()=>{
        moreInfoRefactor()
        retrieveUserData()
    })

    
    return(
        <View style={styles.container}> 
            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
              <Feather onPress={()=>{navigation.goBack()}} name="arrow-left" size={24} color="rgba(0, 0, 0, 0.7)" />
              <Text style={styles.textTitulo}>Detalhes do Curso</Text>
              <Feather style={{paddingVertical:8,paddingHorizontal:10,backgroundColor:"rgba(255, 156, 160, 0.2)",borderRadius:500}} name="bookmark" size={22} color="rgba(0, 0, 0, 0.5)" />            
              </View>


<ScrollView showsVerticalScrollIndicator={false}>

            <View style={{width:"100%", marginTop:16}}>
                <Image style={{width:"100%", height:250,resizeMode:"cover"}} source={{uri:img_course}}/>
            </View>

            <Text style={styles.textSubTitulo}>{name_course}</Text>
                <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between"}}>
                    <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}>
                    <Feather name="users" size={18} color="rgba(0, 0, 0, 0.8)" /> {number_students} estudantes
                    </Text>

                    <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}>
                    <Feather name="thumbs-up" size={18} color="rgba(0, 0, 0, 0.8)" /> {likes}                     
                    </Text>
                </View>

                <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}>
                    <Feather name="calendar" size={18} color="rgba(0, 0, 0, 0.8)" /> Publicado:{date_publication}                     
              </Text>
                <Text style={{marginTop:4,fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)",marginTop:4}}>Autor:{author}</Text>
             


            
          <View style={styles.navStore}>
            <TouchableOpacity onPress={() => setNavtab(true)} style={[styles.tab, navTab === true && styles.selectedTab]}>
              <Text style={navTab === true ? styles.selectedText : styles.tabText}>Geral</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setNavtab(false)} style={[styles.tab, navTab === false && styles.selectedTab]}>
              <Text style={navTab === false ? styles.selectedText : styles.tabText}>Datalhes </Text>
            </TouchableOpacity>
          </View>
          {moreInfoRefactor()}

            



           








           
        

            </ScrollView>

            <View style={{flexDirection:"row", alignItems:"center", marginVertical:12}}>
                <Text style={{backgroundColor:"#FFFFFF", paddingVertical:16, borderRadius:8, color:"#rgba(106, 149, 255, 1)", fontWeight:"700",width:"24%", textAlign:"center"}} >{valor}{Metical}</Text>
                <TouchableOpacity onPress={()=>handlerAddcurso(id)} style={styles.button} >

                    <Text style={{color:"#FFFFFF",fontWeight:"600",textAlign:"center"}}>Iniciar Curso</Text>
                 </TouchableOpacity>

            </View>

        </View>
    )
}