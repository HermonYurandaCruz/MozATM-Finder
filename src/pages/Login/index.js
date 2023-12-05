import React from 'react';
import {View,TouchableOpacity , Image, TextInput,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import logoImg from '../../../src/assets/logo.png'
import logoGoogle from '../../../src/assets/google.png'


export default function Login(){

    const navigation = useNavigation();
   
    const handleLoginPress = () => {
        navigation.navigate('TabScreen');
      };
    

    return(
        <View style={styles.container}>
        
        <View style={styles.containerLogo}>
            <Image style={styles.logoImag} source={logoImg}/>
            <Text style={styles.TextBemVindo}>Seja bem vindo ao</Text>
            <Text style={styles.TextBold}>MozATM Finder</Text>
        </View>
         
            <View style={styles.formLogin}>
               
             
                <Text style={styles.TextForm}>Endereço de e-mail</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite o seu e-mail'
                />


                <Text style={styles.Text}>Senha</Text>
                 <TextInput
                placeholder='Digite a sua senha'
                style={styles.input}
                secureTextEntry={true}
                />

                
                <Text style={styles.TextRecuperar}>Recuperar a senha</Text>

                <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
               

               
           
                <Text style={styles.Text3}>Inicie sessão com</Text>
                <TouchableOpacity style={styles.buttonGoogle}>
                    <View style={styles.buttonContent}>
                        <Image
                        source={logoGoogle} // Substitua pelo caminho do seu ícone
                        style={styles.icon}
                        />
                        <Text style={styles.textGoogle}>Iniciar sessão com Google</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.containerRecuperar}>
                <Text style={styles.Text}>Não tem uma conta?</Text>
                <Text style={styles.Text2}>criar agora</Text>
                </View>

                        


               

                
            </View>
        </View>
    )
}