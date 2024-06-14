import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
 
    container:{
      flex:1,
      paddingHorizontal:16,
      paddingTop:Constants.statusBarHeight + 24,
      backgroundColor:"#FFFFFF",
    },

    header:{
        flexDirection:"row",
        alignContent:"center"

    },

    quizzDia:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"rgba(190, 208, 255, 0.2)", 
        paddingHorizontal:12,
        paddingVertical:18,
        borderRadius:8,
        marginBottom:8
    },
    textTitulo:{
        fontSize:16,
        fontWeight:"500",
        color:"#FFFFFF",
    },
    textSubTitulo:{
        fontSize:15,
        fontWeight:"600",
        color:"rgba(0, 0, 0, 0.7)"
    },
    textTituloBlack:{
        marginTop:22,
        marginBottom:6,
        fontSize:18,
        fontWeight:"700",
        color:"#063F51"
    },
    textNext:{
        fontSize:16,
        fontWeight:"500",
        color:"rgba(56, 153, 183, 0.8)",
    },
    textBack:{
        fontSize:15,
        fontWeight:"500",
        color:"rgba(252, 9, 9, 0.5)",
        marginStart:4
    },
    textHeadres:{
        marginBottom:6,
        fontSize:18,
        fontWeight:"700",
        color:"#063F51",
    },
});