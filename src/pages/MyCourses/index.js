import React, { useEffect,useState } from "react";
import { TouchableOpacity,View,Text,Image,FlatList } from "react-native";
import styles from './styles';
import { MaterialCommunityIcons ,Ionicons,Feather,FontAwesome5,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useRoute } from "@react-navigation/native";

import imgMan from '../../assets/man.png';
import imgWoman from '../../assets/woman.png';


import imgRanking from '../../assets/ranking.png';
export default function MyCourses(){
    const [userId, setUserId] = useState('')
    const [dataCourse,setDataCourse]= useState([]);
    const navigation = useNavigation();


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

      const loadFavoriteCars = async () => {
        try {
          const favoritosRef = firebase.firestore().collection('users').doc(userId).collection('myCourses');
          const querySnapshot = await favoritosRef.get();
      
          const courseIds = querySnapshot.docs.map((doc) => doc.data().id_course).filter(id_course => id_course); // Filtra IDs válidos (não vazios/indefinidos)
      
          const coursePromises = courseIds.map(id_course => 
            firebase.firestore().collection('Course').doc(id_course).get()
          );
      
          const courseDocs = await Promise.all(coursePromises);
      
          const courseData = courseDocs.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }));
      
          setDataCourse(courseData);
        } catch (error) {
          console.error('Erro ao carregar cursos:', error);
        }
      };
      
      
      useEffect(()=>{
        retrieveUserData()
        if(userId){
            loadFavoriteCars()

        }
        

      })
  

    return(
        <View style={styles.container}>

            <TouchableOpacity style={{flexDirection:"row",marginBottom:8,justifyContent:"space-between",alignItems:"center"}}>
                 <Text style={styles.textHeadres}>Meus Cursos </Text>
                 <Text style={styles.textNext}></Text>
            </TouchableOpacity>


            <FlatList
                     showsVerticalScrollIndicator={false}
                      data={dataCourse}
                      keyExtractor={users=> String(users.id)} 
                      renderItem={({item:users,index})=>(
                        <TouchableOpacity style={styles.quizzDia}>
                            <View style={{flexDirection:"row",alignItems:"center"}}>
                                    <Image style={{width:64,height:64, marginEnd:6, borderRadius:8}} source={{uri:users.img_course}}/>
                                    
                                    <View >
                                        <Text style={styles.textTitulo}>{users.name_course}</Text>
                                        <Text style={{fontSize:14, color:"rgba(0, 0, 0, 0.7)",marginTop:2}}>{users.number_lissons} Aulas</Text>
                                        <Text style={{fontSize:12, color:"rgba(0, 0, 0, 0.5)",marginTop:2}}>Autor: {users.author}</Text>
                                    </View>

                            </View>
                        
                        <Feather onPress={()=>navigation.navigate('Course',{courseData:users})} name="chevron-right" size={24} color="rgba(0, 0, 0, 0.7)" />
                        </TouchableOpacity>   
                        
                      )}
            ></FlatList>
          

           


         


        

             
           

            
        </View>


    )
}