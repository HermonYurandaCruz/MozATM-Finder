import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";
import styles from './styles';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { firebase } from '../../services/firebaseConfig';

export default function Lesson() {

  const route = useRoute();
  const navigation = useNavigation();
  const {lessonData} = route.params;
  const { description,id_video,lesson}=lessonData;



  useEffect(() => {
    console.log('dados lesson', lessonData)
  }, [lessonData]);



  return (
    <View style={styles.container}> 
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Feather onPress={() => { navigation.goBack() }} name="arrow-left" size={24} color="rgba(0, 0, 0, 0.7)" />
        <Text style={styles.textTitulo}></Text>
        <Feather style={{ paddingVertical: 8, paddingHorizontal: 10, borderRadius: 500 }} name="bookmark" size={22} color="#FFFFFF" />            
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: "100%", marginTop: 4 }}>
            <iframe
              width="100%"
              height="270"
              src={`https://www.youtube.com/embed/${id_video}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
 
        </View>

          <>
            <Text style={styles.textTituloBlack}>{lesson}</Text>
            <Text style={{ fontSize: 14, fontWeight: 500, color: "rgba(0, 0, 0, 0.5)" }}>{description}</Text>
            <Text style={styles.textTituloBlack}>Documentos de apoio</Text>
            <Text style={{borderRadius:8,paddingHorizontal:16,width:100, paddingVertical:10, backgroundColor:"rgba(232, 238, 255, 05)"}}><Feather name="file" size={14} color="rgba(0, 0, 0, 0.5)" /> pdf
            </Text>
          </>
      </ScrollView>

        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.button}>
          <Text style={{ color: "#FFFFFF", fontWeight: "600", textAlign: "center" }}>Concluir Aula</Text>
        </TouchableOpacity>
    </View>
  );
}
