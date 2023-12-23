

import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
  heade:{
    flexDirection:"row",
    alignItems:"center"
  },
  container: {
    flex:1,
    },
  map: {
    flex: 1,
    marginTop:4
  },
  voltar:{
      position: 'absolute',
      top:Constants.statusBarHeight+14,
      left: 24,
      padding: 10,
      backgroundColor:"rgba(202, 202, 202, 0.39)",
      borderRadius: 100,
      zIndex: 999, // Adicione essa propriedade se precisar ajustar o empilhamento de elementos
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right:10,
    padding: 15,
    borderRadius: 100,
  },
  buttonAdd: {
    position: 'absolute',
    bottom: 20,
    right:10,
    padding: 15,
    borderRadius: 100,
    marginBottom:60,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  textEspera:{
    justifyContent: 'center', 
    alignItems: 'center',
     fontWeight:"600",
     marginBottom:8

  }
});