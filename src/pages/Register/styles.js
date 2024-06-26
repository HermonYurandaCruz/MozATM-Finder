import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
 
    container:{
      flex:1,
      paddingHorizontal:24,
      paddingTop:Constants.statusBarHeight + 32,
      backgroundColor:"#FFFFFF"
    },
    heade:{
    flexDirection: "row",
    alignItems:"center"
    },

    Titulo:{
        fontSize:22,
        fontWeight:"600",
        marginBottom:16
    },

    dadosNome: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop:12,
        marginBottom:12
      },
      viewSexo: {
        paddingHorizontal:26,
        paddingVertical:8,
        flexDirection:"center",
        backgroundColor:"#F8F8F6",
        alignItems:"center",
        borderRadius:8

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
        fontWeight:"500",
        marginTop:8,
        color:"rgba(25, 25, 27, 0.9)"
      },
    input: {
      marginTop:12,
      marginBottom: 20,
      backgroundColor:"#F8F8F6",
      fontSize:16,
      padding:16,
      borderRadius: 8,
      outlineStyle: "none",


      },
      Text:{
        fontSize:16,
        fontWeight:"500",
        marginTop:4,
        color:"rgba(25, 25, 27, 0.5)"
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
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#4177FF',
        marginTop:4
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

      Textm:{
        fontSize:15,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.8)",
      },
      errorText:{
        color:"#DD5757",
        marginTop:4,
        fontWeight:"600"
      },

      icon: {
        width: 24,
        height: 24,
      },
      checkView:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:8
      },
      Textcheck:{
        fontSize:15,
        marginStart:4,
        fontWeight:"400"
      },
      TextLer:{
        fontSize:15,
        marginStart:2,
        color:"#4177FF",
        fontWeight:"900"
      }

});