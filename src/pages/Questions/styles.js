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
        backgroundColor:"#3899B7",
        paddingHorizontal:12,
        paddingVertical:22,
        borderRadius:8,
        marginBottom:8
    },
    textTitulo:{
        fontSize:14,
        fontWeight:"500",
        color:"#FFFFFF",
    },
    textSubTitulo:{
        marginTop:12,
        fontSize:13,
        fontWeight:"400",
        color:"#FFFFFF"
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