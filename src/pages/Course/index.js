import React,{useEffect,useState} from "react";
import { TouchableOpacity,View,Text,Image,FlatList ,ScrollView} from "react-native";
import styles from './styles';
import { useNavigation,useRoute } from "@react-navigation/native";
import { Ionicons,Feather,MaterialIcons,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'

import imgVideo from '../../assets/streaming.png'


export default function Course(){
 
    const [navTab,setNavtab]=useState(true)
    const [data,setData]= useState([]);
    const [dataLessons,setDataLessons]= useState([]);
    const [dataCourse,setDataCourse]= useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [idSubject,setIdSubjectBd]=useState('')
    const route = useRoute();
    const { courseData } = route.params;
    const { id,whatToEarnt,description,name_course,author,img_course,payment_method,priceCourse,number_subject,likes,number_students,date_publication,receiver,
      requirements,} = courseData;

    const navigation = useNavigation();



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
        const malyRef = firebase.firestore().collection('Course').doc(id).collection('subjects').doc(idSubject).collection('lessons');t
        const querySnapshot = await malyRef
        .get();
        const perguntas = [];
      
        querySnapshot.forEach((doc) => {
          perguntas.push({ id: doc.id, ...doc.data() });
        });
        setDataLessons(perguntas)
      }
    
    
      const toggleExpand = (idSubject) => {
        setExpandedId(expandedId === idSubject ? null : idSubject);
        setIdSubjectBd(idSubject)
        loadLessons(idSubject)
      };
    
      useEffect(() => {
        loadPerguntas()

      },[courseData]);


    const moreInfoRefactor=()=>{
        if(!navTab){
            return(
                <View>
                      <View style={{width:"100%", marginTop:16}}>
                          <Image style={{width:"100%", height:250,resizeMode:"cover"}} source={{uri:img_course}}/>
                      </View>

                <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between", marginTop:8}}>
                    <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}>
                    <Feather name="users" size={18} color="rgba(0, 0, 0, 0.8)" /> {number_students} 
                    </Text>

                    <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}>
                    <Feather name="thumbs-up" size={18} color="rgba(0, 0, 0, 0.8)" /> {likes}                     
                    </Text>
                </View>

                <View style={{flexDirection:"row",alignItems:"center", justifyContent:"space-between", marginTop:16}}>
                    
                    <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}>
                    <Feather name="book" size={18} color="rgba(0, 0, 0, 0.8)" /> {number_subject} Aulas                    
                    </Text>
                    
                    <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}> {priceCourse} .00 Mt
                    </Text>

                </View>
             
                <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}>
                 <Feather name="calendar" size={18} color="rgba(0, 0, 0, 0.8)" />{date_publication}                     
                 </Text>

                 <Text style={{fontSize:15, fontWeight:600,color:"rgba(0, 0, 0, 0.7)",marginTop:4,marginBottom:8}}>
                <Feather name="award" size={18} color="rgba(0, 0, 0, 0.8)"/>Autor: {author}</Text>


                    <Text style={styles.textTituloBlack}>O que você aprenderá</Text>
                    <Text style={{color:"rgba(0, 0, 0, 0.6)"}}>
                    <Feather name="check-square" size={16} color="rgba(0, 0, 0, 0.6" /> {whatToEarnt}
                    </Text>


                    <Text style={styles.textTituloBlack}>Descrição</Text>
                    <Text  style={{color:"rgba(0, 0, 0, 0.8)", fontSize:14, fontWeight:"400",marginStart:4}}>{description}</Text>


                    <Text style={styles.textTituloBlack}>Requisitos</Text>
                    <View style={{flexDirection:"row", alignItems:"center",marginBottom:4}}>
                        <Feather name="feather" size={14} color="rgba(0, 0, 0, 0.3" />                
                        <Text style={{color:"rgba(0, 0, 0, 0.3", fontSize:14, fontWeight:"500",marginStart:4}}> {requirements}</Text>
                    </View>

                    <Text style={styles.textTituloBlack}>Para quem é este curso</Text>
                        <Text style={{fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}>{receiver} 
                    </Text>

                    

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
                                        <Text style={{width:300,fontSize:15, fontWeight:600,color:"rgba(0, 0, 0, 0.7)"}}>{perguntas.subject}</Text>
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
                                                        
                                                      <TouchableOpacity onPress={()=>navigation.navigate('Lesson',{lessonData:users})} style={styles.CardBank2} >

                                                          <Image style={{width:24,height:24,marginEnd:6}}source={imgVideo}/>
                                                          <Text style={{width:300,fontSize:14, fontWeight:500,color:"rgba(0, 0, 0, 0.5)"}}> {users.lesson}</Text>
                                                      </TouchableOpacity>

                                                    )}
                                            ></FlatList>

                                        
                                    </View>
                                    )}
                                </>
                            
                                );
                            }}
                            />


                     

                </View>
            )
        }
    }

    useEffect(()=>{
        moreInfoRefactor()
    })

    
    return(
        <View style={styles.container}> 
            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
              <Feather onPress={()=>{navigation.goBack()}} name="arrow-left" size={24} color="rgba(0, 0, 0, 0.7)" />
              <Text style={styles.textTitulo}>{name_course}</Text>
              <Feather style={{paddingVertical:8,paddingHorizontal:10,borderRadius:500}} name="bookmark" size={22} color="#FFFFFF" />            
              </View>


<ScrollView showsVerticalScrollIndicator={false}>

   
            
          <View style={styles.navStore}>
            <TouchableOpacity onPress={() => setNavtab(true)} style={[styles.tab, navTab === true && styles.selectedTab]}>
              <Text style={navTab === true ? styles.selectedText : styles.tabText}>Aulas</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setNavtab(false)} style={[styles.tab, navTab === false && styles.selectedTab]}>
              <Text style={navTab === false ? styles.selectedText : styles.tabText}>Datalhes </Text>
            </TouchableOpacity>
          </View>
          {moreInfoRefactor()}

            



           








           
        

            </ScrollView>

        </View>
    )
}