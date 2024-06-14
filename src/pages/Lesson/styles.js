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
        color:"rgba(0, 0, 0, 0.8)"
    },
    textSubTituloDodia:{
        fontWeight:"500",
        color:"#FFFFFF",
    },
    textSubTitulo:{
        fontSize:18,
        fontWeight:"600",
        color:"rgba(0, 0, 0, 0.7)",
        marginTop:4
    },
    textTituloBlack:{
        fontSize:15,
        fontWeight:"600",
        color:"rgba(0, 0, 0, 0.7)",
        marginTop:16,
        marginBottom:6
    },

    button: {
        borderRadius: 8,
        paddingVertical: 16,
        backgroundColor: '#4177FF',
        textAlign:"center",
        marginStart:4,
        width:"100%",
        marginBottom:8
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
    navStore:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop:12,
        justifyContent:"center"
        },

    tab: {
        paddingHorizontal: 64,
        paddingVertical: 12,
        borderRadius: 2,
      },
      selectedTab: {
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: 'rgba(106, 149, 255, 1)', // Define a cor da linha
      },
      tabText: {
        color: 'rgba(0, 0, 0, 0.5)',
        fontWeight:"500"
      },
      selectedText: {
        fontSize:15,
        color: 'rgba(106, 149, 255, 1)',
        fontWeight:"600"
      },

      CardBank: {
        flexDirection:"row",
        justifyContent: 'space-between',
        backgroundColor:"rgba(190, 208, 255, 0.3)",
        paddingStart:24,
        paddingEnd:12,
        paddingVertical:12,
        marginTop:6
      },
      CardBank2: {
        flexDirection:"row",
        backgroundColor:"rgba(190, 208, 255, 0.2)",
        paddingStart:24,
        paddingEnd:12,
        paddingVertical:12,
        marginStart:3
      },
});