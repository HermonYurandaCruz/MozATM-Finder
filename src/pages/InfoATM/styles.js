import { StyleSheet } from "react-native";
import Constants from 'expo-constants';


export default StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:Constants.statusBarHeight+16 ,
    },
    heade:{
        flexDirection:"row",
        alignItems:"center"
    },
    iconARch:{
        position:"absolute",
        right:0
    },
    loadingIndicator:{
        position:"absolute",
        paddingTop:200,
        paddingStart:"65%"
    },
    ImagemBank:{
        width:"100%",
        height: "30%",
        borderRadius:8,
        marginTop:16,
        marginBottom:8
    },
    UserNameAdd:{
        flexDirection:"row"
    },
    dados:{
        flexDirection:"row",
        backgroundColor:"#FFFFFF",
        borderRadius:8,
        paddingVertical:6,
        paddingHorizontal:4,
        marginTop:12
    },
    gosto:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#FFF8E0",
        paddingHorizontal:8,
        paddingVertical:4,
        borderRadius:6,
        marginEnd:8,
        marginStart:4,
        marginTop:4,
        marginBottom:4,
    },

    Hora:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#E2FCFB",
        paddingHorizontal:8,
        marginTop:4,
        marginBottom:4,
        borderRadius:6,
        marginEnd:8,

    },
    buttonDireção:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"rgba(0, 173, 181, 0.21)",
        paddingHorizontal:8,
        borderRadius:6,
        marginEnd:8,
        marginTop:4,
        marginBottom:4,

    },
    buttonMais:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"rgba(0, 183, 40, 0.21)",
        paddingHorizontal:8,
        borderRadius:6,
        marginEnd:8,
        marginTop:4,
        marginBottom:4,

    },
    Titulo:{
        fontSize:18,
        fontWeight:"600"
    },
    Text:{
        fontSize:16,
        fontWeight:"600",
        marginTop:8,
        marginTop:16
    },
    comentario:{
        flexDirection:"row",
        marginTop:16,
    },
    caixaComentarios:{
        marginBottom:100
    },
    dadosComentario:{
        marginStart:6
    },
    NomeUser:{
        fontSize:14,
        fontWeight:"600"
    },
    caixaComentario:{
        backgroundColor:"rgba(235, 235, 235, 1)",
        padding:8,
        borderRadius:8,
        marginEnd:42

    },

    conteudoComentario:{
        fontSize:14,
        fontWeight:"400",
    },
    Data:{
        fontSize:12,
        fontWeight:"400",
        marginStart:8
    },
    escreverComentario:{
        flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    padding: 16, 
    },
    input:{
        padding: 12, // Adicione o padding desejado para o conteúdo na parte inferior
        backgroundColor:"#FFFFFF",
        width:"80%",
        borderRadius:8
    },
    Enviar:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#FFFFFF",
        padding:16,
        borderRadius:6,

    }

});