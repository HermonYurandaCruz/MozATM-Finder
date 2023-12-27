import {Linking,Image,View,ActivityIndicator,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {firebase} from '../../services/firebaseConfig'
import { Ionicons,Feather,MaterialCommunityIcons,Entypo  } from '@expo/vector-icons';
import styles from './styles';


const TextFirebase=()=>{
    const [users,setUsers]=useState([]);
    const listaRef = firebase.firestore().collection('lista');

useEffect(async()=>{
    listaRef
    .onSnapshot(
        querySnapshot =>{
            const users=[]
            querySnapshot.forEach((doc)=>{
                const{latitude,text}=doc.data()
                users.push({
                    id:doc.id,
                    titulo,
                    text,
                })
            })
            setUsers(users)
        }
    )
},[])

return(
    <View>
         <FlatList
          
          data={users}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=>(
           
            <TouchableOpacity style={styles.CardBank} >
           
              <View style={styles.infoBank}>
                <Text style={styles.TextNomeBank}>{item.titulo}</Text>
                <Text style={styles.TextTypoBank}> {item.text}</Text>

                           

          

              </View>

            </TouchableOpacity>
          )}
        >

         
            
          </FlatList>
    </View>
)

}
export default TextFirebase