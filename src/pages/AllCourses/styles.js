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
    boxskills:{
        borderRadius:8,
        width: '49%', // Cada item ocupa metade da largura da tela
        backgroundColor:"rgba(232, 232, 232, 0.5)",
        alignItems:"center",
        paddingHorizontal:12,
        paddingVertical:16,
        marginEnd:8,
        marginTop:8
    },
    inputPesquisa:{
        flexDirection:"row",
        alignItems:"center",
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 22,
        backgroundColor: '#F8F8F6',
        marginBottom:12
    },
    input: {
        fontSize:16,
        outlineStyle: "none",
        marginStart:8,
        fontWeight:"500",
        color:"rgba(0, 0, 0, 0.5)"

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
        marginTop:12,
        fontSize:16,
        fontWeight:"600",
        color:"#063F51",
        alignItems:"center"
    },
    textTitulo2:{
        marginTop:4,
        fontSize:15,
        fontWeight:"500",
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
        fontSize:20,fontWeight:"700", color:"rgba(0, 0, 0, 0.7)"
    },
    boxMaisLidos:{
        borderRadius:8,
        width: '49%', // Cada item ocupa metade da largura da tela
        backgroundColor:"#F8F8F6",
        marginEnd:8,
        marginTop:8
    },
    dadosLivroMais:{
        padding:10
    },
     capaMais:{
        width:"100%",
        height:170,
        borderTopLeftRadius:8,
        borderTopRightRadius:8
    },
});