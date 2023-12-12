

import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
 
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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
     fontWeight:"600"
  }
});