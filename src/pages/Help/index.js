import React, {useEffect,useState} from "react";
import {Image,View,Text,TextInput,TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import { MaterialIcons, Ionicons  } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import {firebase} from '../../services/firebaseConfig'



export default function Help(){
  const navigation = useNavigation();
  const [data,setData]= useState([]);

  const [expandedId, setExpandedId] = useState(null);



  const enviarEmailBox = async () => {
    // Define os parâmetros do e-mail
    let mailOptions = {
      recipients: ['malyfinder@gmail.com'], // Lista de destinatários
      subject: 'Reportar um problema', // Assunto do e-mail
      body: 'Escreva aqui o seu problema', // Corpo do e-mail
      isHtml: false, // Define se o e-mail é em HTML ou não
    };

    // Verifica se o dispositivo pode enviar e-mails
    let canSendMail = await MailComposer.isAvailableAsync();
    if (canSendMail) {
      // Abre a caixa de e-mail com o e-mail já definido
      await MailComposer.composeAsync(mailOptions);
    } else {
      // Mostra uma mensagem de erro
      alert('Não é possível enviar e-mails neste dispositivo.');
    }
  };



  async function loadPerguntas(){
    const malyRef = firebase.firestore().collection('helps');
    const querySnapshot = await malyRef
    .get();
    const perguntas = [];
  
    querySnapshot.forEach((doc) => {
      perguntas.push({ id: doc.id, ...doc.data() });
    });
    setData(perguntas)
  }


  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  useEffect(() => {
    loadPerguntas()
  });




    return(
      <View style={styles.container}>
        <View style={styles.heade}>
          <Ionicons name="arrow-back-outline" size={28} color="black" onPress={()=>navigation.goBack()} />
          <Text style={styles.Titulo}>Obter ajuda</Text>
        </View>

        <Text style={styles.texto}>Perguntas mais Frequentes</Text>
      
        <FlatList
  data={data}
  showsVerticalScrollIndicator={false}
  keyExtractor={(perguntas) => String(perguntas.id)}
  renderItem={({ item: perguntas }) => {
    const isExpanded = expandedId === perguntas.id;

    return (
      <>
        <View style={styles.CardBank}>
          <Text style={styles.questao}>{perguntas.pergunta}</Text>
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
            <Text style={styles.resposta}>{perguntas.resposta}</Text>
            {perguntas.imagemHelp && <Image source={{ uri: perguntas.imagemHelp }} style={styles.image} />}
          </View>
        )}
      </>
  
    );
  }}
/>
<View style={styles.enviarEmailBox}>
<Text style={styles.textoEmail}>Não teve uma resposta satisfatória?</Text>
<Text style={styles.textoEnviarEmail} onPress={enviarEmailBox}> Reportar.</Text>

</View>


  </View>

  );
}