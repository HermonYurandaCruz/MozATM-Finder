import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
 
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:Constants.statusBarHeight + 24,
        backgroundColor:"#FFFFFF"
    },
    logoImag:{
      justifyContent:"center",
      width:160,
      height:150,
      marginTop:32
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
        fontWeight:"800",
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
        marginTop:18,
        color:"rgba(25, 25, 27, 0.7)"
      },
    input: {
        marginTop:8,
        backgroundColor:"#F8F8F6",
        fontSize:16,
        padding:16,
        borderRadius: 8,
        outlineStyle: "none",

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
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#4177FF',
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
        color:"#4177FF",    
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
      checkView:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:8,
        marginTop:12
      },
      titlePopUp: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:4
      },
      sim:{
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginEnd:4,
        marginTop:4,
        backgroundColor:"#4177FF",
        width:"100%"
      },
      textButton:{
        color:"#FFFFFF"
     },
     inputPopUp: {
      marginTop:8,
      marginBottom: 20,
      paddingBottom: 12, // Espaçamento entre o texto e a linha
      fontSize:16,
      fontWeight:"500",
      outlineStyle:"none",
      backgroundColor:"#F8F8F6",
      width:'100%'
    },

    botoes:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:4
  },
  nao:{
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop:4,
    width:"100%"

  },

});