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
    input: {
        marginTop:12,
        marginBottom: 12,
        backgroundColor:"#F8F8F6",
        fontSize:16,
        padding:16,
        borderRadius: 8,
        outlineStyle: "none",

      },

      inputQuestao: {
        marginTop:12,
        marginBottom: 20,
        backgroundColor:"#F8F8F6",
        fontSize:16,
        padding:16,
        borderRadius: 8,
        outlineStyle: "none",

      },

      inputDescricao: {
        backgroundColor:"#F8F8F6",
        fontSize:16,
        padding:16,
        borderRadius: 8,
        outlineStyle: "none",
        height:180

      },


      button: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#357184',
      },
      text: {
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold",

      },
    textTitulo:{
        fontSize:16,
        fontWeight:"500",
        color:"#FFFFFF",
    },
    textSubTitulo:{
        fontWeight:"500",
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

    inputDescricao: {
      backgroundColor:"#F8F8F6",
      fontSize:16,
      padding:16,
      borderRadius: 8,
      outlineStyle: "none",
      height:150

    },
});