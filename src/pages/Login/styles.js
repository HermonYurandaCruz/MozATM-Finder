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
        marginTop:14,
        flexDirection:"row",
    },

    TextBold:{
        fontSize:24,
        fontWeight:"700",
        color:"rgba(41, 82, 74, 0.9)"
    },
    TextBemVindo:{
        fontSize:18,
        fontWeight:"400",
        color:"#19191B"
    },
    TextForm:{
        fontSize:16,
        fontWeight:"500",
        marginTop:32,
        color:"rgba(25, 25, 27, 0.9)"
      },
    input: {
        marginTop:12,
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: 'rgba(41, 82, 74, 0.9)', // Define a cor da linha
        marginBottom: 20,
        paddingBottom: 12, // Espaçamento entre o texto e a linha
        fontSize:16
      },
      
      Text:{
        fontSize:16,
        fontWeight:"500",
        marginTop:6,
        color:"rgba(25, 25, 27, 0.9)"
      },

      TextRecuperar:{
        textAlign:"right",
        fontSize:15,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.6)",
        marginBottom:8
      },
      Textm:{
        fontSize:15,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.8)",
      },

      button: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(41, 82, 74, 0.9)',
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
  
      Text2:{
        fontSize:15,
        fontWeight:"700",
        marginStart:4,
        color:"rgba(41, 82, 74, 0.9)",    
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