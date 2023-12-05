import React from 'react';
import {View,Button, Image, TextInput,Text} from 'react-native';
import styles from './styles';

import logoImg from '../../../src/assets/logo.png'
export default function Login(){
   
   


    return(
        <View style={styles.container}>
            <Image source={logoImg}/>
            <View style={styles.formLogin}>
                <Text>Seja bem vindo </Text>
                <TextInput
                placeholder='Digite o seu e-mail'
                />

                 <TextInput
                placeholder='Digite a sua senha'
                secureTextEntry={true}
                />
                <Text>Recuperar a senha</Text>
                <Button
                title="Login"
                />
                <Text>Inicie sessão com</Text>
                <Button
                title="Iniciar sessão com Google"
                />
                <Text>Não tem uma conta?criar agora</Text>


                
            </View>
        </View>
    )
}