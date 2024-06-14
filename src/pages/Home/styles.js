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
        alignItems:"center",
        justifyContent:"space-between",

    },
    detalhesjogador:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"#4177FF",
        paddingHorizontal:12,
        borderRadius:12,
        marginTop:16
    },

    inputPesuisar:{
        backgroundColor:"#F8F8F6",
        paddingVertical:12,
        paddingHorizontal:12,
        borderRadius:12,
        flexDirection:"row",
        alignItems:"center",
        marginTop:16

        
    },
    input: {
        marginStart:12,
        fontSize:16,
        outlineStyle: "none",
        
        },

        category:{
                alignItems:"center", 
                backgroundColor:"rgba(190, 208, 255, 0.1)", 
                borderRadius:12,
                 width:116, 
                 paddingVertical:12,
                 paddingHorizontal:6,
                 marginEnd:6
        },
    quizzDia:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"#3899B7",
        paddingHorizontal:12,
        paddingVertical:22,
        borderRadius:12,
        marginBottom:8
    },
    imgperfil:{
        width:32,
        height:32,
        padding:6,
        borderRadius:500
    },
    barra:{
        backgroundColor:"rgba(232, 232, 232, 0.3)",
        width:5,
        height:"100%",
        borderRadius:100
    },
    imagenTrofeuSP:{
        width:74,
        height:74
    },
    textTitulo:{
        fontSize:18,
        fontWeight:"700",
        color:"#FFFFFF"
    },
    textSubTituloDodia:{
        fontWeight:"500",
        color:"#FFFFFF",
    },
    textSubTitulo:{
        fontWeight:"500",
        color:"#FFFFFF",
        marginTop:4
    },
    textTituloBlack:{
        fontSize:18,
        fontWeight:"700",
        color:"#063F51"
    },

    button: {
        borderRadius: 12,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        marginTop:16,
        textAlign:"center",
        width:130
      },

      boxMaisLidos:{
        borderRadius:8,
        width: '49%',
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