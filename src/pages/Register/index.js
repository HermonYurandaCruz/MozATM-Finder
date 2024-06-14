import React, { useState } from 'react';
import {View,ActivityIndicator,TouchableOpacity ,Image, Linking, TextInput,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons,Octicons,MaterialCommunityIcons  } from '@expo/vector-icons';
import {firebase} from '../../services/firebaseConfig'
import Checkbox from 'expo-checkbox';

import styles from './styles';
 import imgMan from '../../assets/man.png';
 import imgWoman from '../../assets/woman.png';



export default function Login(){

    const navigation = useNavigation();

    const [nome, setNome] = useState('')
    const [sexoSelecionado, setSexoSelecionado] = useState(null);

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setconfirmarSenha] = useState('')
   
    const [loading, setLoading] = useState(false);
    const [showText, setShowText] = useState(true);
    const [errorText, setErrorText] = useState('');
    const [isChecked, setChecked] = useState(false);


    const handleLogin = () => {
        navigation.replace('Login');
      };

    const handleRegister = async () => {

        if (!nome || !sexoSelecionado || !email || !senha || !confirmarSenha) {
            setErrorText('Por favor, preencha todos os campos.');
            return;
          }

        if (senha !== confirmarSenha) {
        setErrorText('As senhas não coincidem.');
        setLoading(false);
        setShowText(true);
        return;
        }

        if (!isChecked) {
            setErrorText('Por favor, aceite os termos e Condicoes .');
            return;
          } 
        
    try {
        setLoading(true);
        setShowText(false);
        setErrorText(''); // Limpa qualquer mensagem de erro anterior

        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, senha);
        const { user } = userCredential;

        await user.sendEmailVerification();

        console.log("user:",user)
        console.log("user id:",user.uid)
          await firebase.firestore().collection('users').doc(user.uid).set({
            nome: nome,
            email: email,
            sexo:sexoSelecionado,
            statusTeachers:false,
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
    
      const openURLServicos=async()=>{
        const url = 'https://malyspot.netlify.app/termos.html'; // TERMOS DE USO URL que deseja abrir
        
        const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            console.error('Não é possível abrir o link:', url);
          }
      }

  

    return(
        <View style={styles.container}>
                    <Ionicons style={{marginBottom:24}} name="arrow-back-outline" size={24} color="rgba(25, 25, 27, 0.9)" onPress={handleLogin} />
                    <Text style={styles.Titulo}>Registrar uma conta</Text>

         
                <Text style={styles.Text}>Como você se identifica?</Text>
                <View style={styles.dadosNome}>
                
                <View style={styles.dadosNome}>
        <TouchableOpacity
          style={[
            styles.viewSexo,
            sexoSelecionado === 'masculino' ? { backgroundColor: 'rgba(138, 216, 246, 0.74)' } : null,
          ]}
          onPress={() => setSexoSelecionado('masculino')}
        >
          <Image style={{ width: 120, height: 120 }} source={imgMan} />
          <Text style={styles.Text}>Masculino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.viewSexo,
            sexoSelecionado === 'feminino' ? { backgroundColor: 'pink' } : null,
          ]}
          onPress={() => setSexoSelecionado('feminino')}
        >
          <Image style={{ width: 120, height: 120 }} source={imgWoman} />
          <Text style={styles.Text}>Feminino</Text>
        </TouchableOpacity>
      </View>

                </View>
   
                <Text style={styles.Text}>Nome</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o seu Nome'
                                value={nome}
                                onChangeText={(text) => setNome(text)}

                            />

                <Text style={styles.Text}>Seu e-mail</Text>
                
                <TextInput
                placeholder='exemplo@gmail.com'
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                />


            

                <Text style={styles.Text}>Senha</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite a sua senha'
                secureTextEntry={true}
                value={senha}
                onChangeText={(text) => setSenha(text)}
                />
          
          <Text style={styles.Text}>Senha</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite a sua senha'
                secureTextEntry={true}
                value={confirmarSenha}
                onChangeText={(text) => setconfirmarSenha(text)}
                />

                    <View style={styles.checkView}>                         
                             <Checkbox
                              style={styles.checkbox}
                              value={isChecked}
                              onValueChange={setChecked}
                              color={isChecked ? '#4177FF' : undefined}
                            />
                            <Text style={styles.Textcheck}>
                            Concordo com os termos e condições.
                            </Text>
                            <Text style={styles.TextLer} onPress={openURLServicos}>
                              Ler   
                            </Text>

                          </View>
          

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {showText && <Text style={styles.text}>Registrar Agora</Text>}

            {loading && (
                <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#ffffff" />
                </View>
            )}
            </TouchableOpacity>
            {errorText !== '' && <Text style={styles.errorText}>{errorText}</Text>}

                    

                <View style={styles.containerRecuperar}>
                <Text style={styles.Textm}>Tem uma conta?</Text>
                <Text style={styles.Text2} onPress={handleLogin}>Iniciar agora</Text>
                </View>

                             
     </View>
    )
}