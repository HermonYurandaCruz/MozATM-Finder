import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
 
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:Constants.statusBarHeight + 64,
    },
    containerLogo:{
      alignItems:"center"
    },
    formLogin:{
        paddingTop:8,
        justifyContent: 'space-between',
    },

    containerRecuperar:{
        marginTop:32,
        flexDirection:"row",
    },

    TextBold:{
        fontSize:26,
        fontWeight:"700",
        color:"#19191B"
    },
    TextBemVindo:{
        fontSize:18,
        fontWeight:"400",
        color:"#19191B"
    },
    TextForm:{
        fontSize:16,
        fontWeight:"400",
        marginTop:32,
        color:"#606060"
      },
    input: {
        marginTop:12,
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: '#254E46', // Define a cor da linha
        marginBottom: 20,
        paddingBottom: 12, // Espaçamento entre o texto e a linha
        fontSize:16
      },
      Text:{
        fontSize:16,
        fontWeight:"400",
        marginTop:6,
        color:"#606060"
      },

      TextRecuperar:{
        textAlign:"right",
        fontSize:16,
        fontWeight:"400",
        marginTop:4,
        color:"#606060",
        marginBottom:8
      },
      button: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#254E46',
      },

      buttonGoogle:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(41, 82, 74, 0.15)',
      },
      buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold",

      },
      textGoogle:{
        color: '#254E46',
        textAlign: 'center',
        marginLeft: 35, 
        fontWeight:"bold",
      },
      Text2:{
        fontSize:16,
        fontWeight:"400",
        marginTop:6,
        color:"#0F5257", 
        marginStart:4,
        fontWeight:"500"
      },
      Text3:{
        fontSize:16,
        fontWeight:"400",
        marginTop:22,
        marginBottom:22,
        color:"#606060", 
        textAlign:"center"
      },

      icon: {
        width: 24,
        height: 24,
      },
      errorText:{
        color:"#DD5757",
        marginTop:4,
        fontWeight:"600"
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        marginTop:"90%",
        marginHorizontal:32,

      },
      titlePopUp: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:4
      },
      sim:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginEnd:4,
        marginTop:4,
        backgroundColor:"rgba(99, 181, 71, 1)"
      },
      textButton:{
        color:"#FFFFFF"
     },
     inputPopUp: {
      marginTop:8,
      borderBottomWidth: 2, // Define a largura da linha na parte inferior
      borderBottomColor: '#254E46', // Define a cor da linha
      marginBottom: 20,
      paddingBottom: 12, // Espaçamento entre o texto e a linha
      fontSize:16
    },

    botoes:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:4
  },
  nao:{
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop:4,
    backgroundColor:"#DD5757"
  },

});