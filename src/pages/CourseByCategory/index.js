import React,{useState,useEffect} from "react";
import { TouchableOpacity,View,Text,TextInput,Image,ScrollView ,FlatList} from "react-native";
import styles from './styles';
import { Foundation ,Ionicons,Feather,FontAwesome5,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../services/firebaseConfig'

export default function CourseByCategory(){
  const [pesquisa, setPesquisa] = useState('')
  const [skillsData,setSkillsData]= useState([])
  const navigation = useNavigation();
  const route = useRoute();
  const {categoria}=route.params;



  const searchFilter = (text) => {
    const filtered = skillsData.filter((item) =>
      item.name_course.toLowerCase().includes(text.toLowerCase())
    );
    setPesquisa(text);
    if (text === '') {
      loadSkills();
    } else {
      setSkillsData(filtered);
    }
    };

  useEffect(() => {
    console.log('categoria:',categoria)
    const loadSkills = async () => {
      const cacheSkills = await AsyncStorage.getItem('Course');
    
      const skillsRef = firebase.firestore().collection('Course').where('estado_public','==',true).where('category','==',categoria);
    
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
  }, [categoria]);

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
  

    return(
        <View style={styles.container}>
              <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
              <Feather onPress={()=>{navigation.goBack()}} name="arrow-left" size={24} color="rgba(0, 0, 0, 0.7)" />
              <Text style={styles.textTitulo}>Detalhes do Curso</Text>
              </View>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.inputPesquisa}>
            <Feather name="search" size={24} color="rgba(0, 0, 0, 0.5)" />
            <TextInput
                style={styles.input}
                placeholder='Pesquisar Skills'
                value={pesquisa}
                onChangeText={(text) => searchFilter(text)}
                />
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