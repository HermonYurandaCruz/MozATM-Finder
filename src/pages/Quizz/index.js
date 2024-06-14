import React, { useEffect,useState } from "react";
import { TouchableOpacity,View,Text,Modal } from "react-native";
import styles from './styles';
import { useNavigation,useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons ,Ionicons,Feather,FontAwesome5,SimpleLineIcons,FontAwesome  } from '@expo/vector-icons';
import ProgressBar from '../components/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '../../services/firebaseConfig'

export default function Quizz(){

    const navigation = useNavigation();
    const route = useRoute();
    const [showPopup, setShowPopup] = useState(false);
    const [userId, setUserId] = useState('');
    const [userPontos, setUserPontos] = useState('');

    const [questionData, setQuestionData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [resposta,setResposta]=useState('');
    const [pontos, setPontos] = useState(0);

    

    const retrieveUserData = async () => {
        try {
          const storedUserData = await AsyncStorage.getItem('userData');
          if (storedUserData !== null) {
            const userData = JSON.parse(storedUserData);
            setUserId(userData.id); 
          }
        } catch (error) {
          console.error('Erro ao recuperar os dados do usuário:', error);
        }
      };



        const carregarDadosAtuais = () => {
      
          if (userId) {
            const userRef = firebase.firestore().collection('users').doc(userId);
      
            userRef.onSnapshot((userDoc) => {
              if (userDoc.exists) {
                const userData = userDoc.data();
                setUserPontos(userData.userPontos);
              }
            });
          } else {
            console.error('userId é indefinido ou nulo. Verifique a fonte de dados.');
          }
        };
      
   
    const handleTimePassed = (timePassed) => {
        if (timePassed) {
            setShowPopup(true);
            console.log("resultado asdafajdnfaldnflj",userId)
        }
      };

      useEffect(()=>{
        retrieveUserData()
        carregarDadosAtuais()
      })

      useEffect(() => {
        const loadQuestions = async () => {
          const questionRef = firebase.firestore().collection('Questions');
          const querySnapshot = await questionRef.get();
          const questions = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setQuestionData(questions);
        };
    
        loadQuestions();
      }, []);
    
      const handleNextQuestion = async() => {
        if (currentQuestionIndex < questionData.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);


          if(questionData[currentQuestionIndex].alternativaCerta==resposta){
             setPontos(pontos+1)
            const userRefUser = firebase.firestore().collection('users').doc(userId);
            await userRefUser.update({
              userPontos: 1 + userPontos,
            });
        }else{
            console.log("resposta errada")
        }

        } else {
            setShowPopup(true);
          console.log('Você chegou ao fim das perguntas.Somou ', pontos);
        }
      };

      const resultQuestion=(result) =>{
        setResposta(result)
      }
    
      return (
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginBottom: 32,
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color="#063F51"
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.textHeadres}>Tema do Quizz</Text>
            <Text onPress={handleNextQuestion} style={styles.textNext}>
              Próximo
            </Text>
          </TouchableOpacity>
    
          <View style={{ width: '100%' }}>
            <ProgressBar onTimePassed={handleTimePassed} />
            <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 6 }}>
              {currentQuestionIndex + 1}/{questionData.length} questões
            </Text>
          </View>
    
          <View>
            <Text style={styles.textTituloBlack}>
              {questionData.length > 0 &&
                questionData[currentQuestionIndex].questao}
            </Text>
          </View>
    
          <TouchableOpacity
          style={[
            styles.quizzDia,
            resposta === questionData[currentQuestionIndex]?.alternativaA && {
            borderColor: 'rgba(99, 246, 96, 0.8)',
            borderWidth: 6
            }
             ]}
            onPress={() => resultQuestion(questionData[currentQuestionIndex].alternativaA)}
            >
            <View style={{ width: 320 }}>
                <Text style={styles.textTitulo}>
                {questionData.length > 0 && questionData[currentQuestionIndex].alternativaA}
                </Text>
            </View>
            <View>
                <SimpleLineIcons name="arrow-right" size={18} color="#FFFFFF" />
            </View>
            </TouchableOpacity>


          <TouchableOpacity style={[
            styles.quizzDia,
            resposta === questionData[currentQuestionIndex]?.alternativaB && {
            borderColor: 'rgba(99, 246, 96, 0.8)',
            borderWidth: 6
            }
             ]}
            onPress={() => resultQuestion(questionData[currentQuestionIndex].alternativaB)}
          >
            <View style={{ width: 320 }}>
              <Text style={styles.textTitulo}>
                {questionData.length > 0 &&
                  questionData[currentQuestionIndex].alternativaB}
              </Text>
            </View>
            <View>
              <SimpleLineIcons name="arrow-right" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>


          <TouchableOpacity 
          style={[
            styles.quizzDia,
            resposta === questionData[currentQuestionIndex]?.alternativaC && {
            borderColor: 'rgba(99, 246, 96, 0.8)',
            borderWidth: 6
            }
             ]}
                      onPress={() => resultQuestion(questionData[currentQuestionIndex].alternativaC)}
                      >
            <View style={{ width: 320 }}>
              <Text style={styles.textTitulo}>
                {questionData.length > 0 &&
                  questionData[currentQuestionIndex].alternativaC}
              </Text>
            </View>
            <View>
              <SimpleLineIcons name="arrow-right" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>


          <TouchableOpacity 
          style={[
            styles.quizzDia,
            resposta === questionData[currentQuestionIndex]?.alternativaD && {
            borderColor: 'rgba(99, 246, 96, 0.8)',
            borderWidth: 6
            }
             ]}
                      onPress={() => resultQuestion(questionData[currentQuestionIndex].alternativaD)}
                      >
            <View style={{ width: 320 }}>
              <Text style={styles.textTitulo}>
                {questionData.length > 0 &&
                  questionData[currentQuestionIndex].alternativaD}
              </Text>
            </View>
            <View>
              <SimpleLineIcons name="arrow-right" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
    
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
            <Ionicons name="exit-outline" size={22} color="rgba(252, 9, 9, 0.5)" />
            <Text style={styles.textBack}>Sair do Quizz</Text>
          </View>




          <Modal
                                  animationType="slide"
                                  transparent={true}
                                  visible={showPopup}
                                  style={styles.modalContainer}
                                  presentationStyle="overFullScreen"
                                  onRequestClose={() => setShowPopup(false)}
                                >
                                  <View style={styles.modalView}>
                                    <Text style={styles.titlePopUp}>🎉Parabéns!</Text>
                                    <Text>Você concluiu o quizz com sucesso!</Text>
                                    <Text> 🎯 Respostas corretas:{pontos}</Text>
                                    <Text> 💯 Pontos conquistados:{pontos *7}</Text>
                                    <Text>Ótimo trabalho! Continue assim!</Text>

                                    <TouchableOpacity style={styles.buttonPopUP} onPress={()=>navigation.goBack()} >
                                      <Text style={styles.text}>Fechar</Text>
                                    </TouchableOpacity>
                                  </View>
                            </Modal>  
    




        </View>



      );
    }