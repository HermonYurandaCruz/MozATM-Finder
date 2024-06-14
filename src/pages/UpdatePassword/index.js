import React, { useState,useEffect } from 'react';
import {View,ActivityIndicator,TouchableOpacity , Image, TextInput,Text} from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import { Ionicons,Octicons,MaterialCommunityIcons  } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'

import styles from './styles';


export default function UpdatePassword(){

    const navigation = useNavigation();
    const route = useRoute();

    const { itemId } = route.params;

    const [senha, setSenha] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
  
   
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');

      


      const handleChangePassword = async () => {

        if (!senha || !novaSenha) {
          setErrorText('Por favor, preencha todos os campos.');
          return;
        }

        try {

          const user = firebase.auth().currentUser;
      
          if (!user) {
            setErrorText('Usuário não autenticado');
            throw new Error('Usuário não autenticado');
          }
      
          await user.updatePassword(novaSenha);
          navigation.goBack()          
      
        } catch (error) {
          console.error('Erro ao alterar senha:', error);
          
          return false; 
        }
      };
      

    return(
        <View style={styles.container}>
                <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={28} color="rgba(25, 25, 27, 0.9)" onPress={()=>navigation.goBack()} />
                    <Text style={styles.Titulo}>Mudar senha</Text>
                </View>
 
               

                <Text style={styles.Text}>Senha Anterior</Text>
                 <TextInput
                placeholder='Digite a sua senha Anterior'
                style={styles.input}
                value={senha}
                onChangeText={(text) => setSenha(text)}
                />

                <Text style={styles.Text}>Atualizar Apelido</Text>
                 <TextInput
                placeholder='Digite a nova Senha'
                style={styles.input}
                value={novaSenha}
                onChangeText={(text) => setNovaSenha(text)}
                />
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}


          <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={loading}>
            {showText && <Text style={styles.text}>Atualizar senha </Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>

                    

               
           
                

                             
     </View>
    )
}