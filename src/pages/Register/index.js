import React, { useState } from 'react';
import {View,ActivityIndicator,TouchableOpacity , Image, TextInput,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons,MaterialCommunityIcons  } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'

import styles from './styles';


import logoGoogle from '../../../src/assets/google.png'


export default function Login(){

    const navigation = useNavigation();

    const [nome, setNome] = useState('')
    const [sobreNome, setSobreNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setconfirmarSenha] = useState('')
   
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');


    const handleRegister = async () => {

        if (!nome || !sobreNome || !email || !senha || !confirmarSenha) {
            setErrorText('Por favor, preencha todos os campos.');
            return;
          }

        if (senha !== confirmarSenha) {
        setErrorText('As senhas não coincidem.');
        setLoading(false);
        setShowText(true);
        return;
        }
        
    try {
        setLoading(true);
        setShowText(false);
        setErrorText(''); // Limpa qualquer mensagem de erro anterior

        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
        const { user } = userCredential;
          // Aqui você pode tratar a resposta da API conforme necessário
    
          await firebase.firestore().collection('users').doc(user.uid).set({
            nome: nome,
            sobreNome: sobreNome,
            email: email,
            // Adicione mais campos personalizados aqui, se necessário
          });

          navigation.navigate('Login');
          

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrorText('Este e-mail já está em uso. Tente outro endereço de e-mail.');
              } else {
                setErrorText('Erro ao registrar usuário. Por favor, tente novamente.');
              }
      
        } finally {
            setLoading(false);
            setShowText(true);
          }
      };
    

  

 

   
    const handleLoginPress = () => {
        navigation.navigate('TabScreen');
      };



    return(
        <View style={styles.container}>
                <View style={styles.heade}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" onPress={()=>navigation.goBack()} />
                    <Text style={styles.TextHeade}>Voltar</Text>
                </View>
                <Text style={styles.Titulo}>Registrar agora</Text>

         
                <View style={styles.dadosNome}>
                
                    <View style={styles.dadosNome}>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.Text}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o seu Nome'
                                value={nome}
                                onChangeText={(text) => setNome(text)}

                            />
                        </View>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.Text}>Apelido</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o seu Apelido'
                                value={sobreNome}
                                onChangeText={(text) => setSobreNome(text)}
                            />
                        </View>
                    </View>
                </View>
   
               

                <Text style={styles.Text}>Seu e-mail</Text>
                 <TextInput
                placeholder='exemplo@gmail.com'
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                />


            

                <Text style={styles.TextForm}>Senha</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite a sua senha'
                secureTextEntry={true}
                value={senha}
                onChangeText={(text) => setSenha(text)}
                />
          
          <Text style={styles.TextForm}>Senha</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite a sua senha'
                secureTextEntry={true}
                value={confirmarSenha}
                onChangeText={(text) => setconfirmarSenha(text)}
                />
          

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {showText && <Text style={styles.text}>Registrar Agora</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

                    

               
           
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
                <Text style={styles.Text}>Tem uma conta?</Text>
                <Text style={styles.Text2}>iniciar agora</Text>
                </View>

                             
     </View>
    )
}