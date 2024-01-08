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
        marginTop:22,
        marginBottom:8
    },
    UserNameAdd:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:2
    },
    dados:{
        flexDirection:"row",
        backgroundColor:"#FFFFFF",
        borderRadius:8,
        paddingVertical:6,
        paddingHorizontal:7,
        marginTop:12
    },
    gosto:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#FFF8E0",
        paddingHorizontal:10,
        paddingVertical:4,
        borderRadius:6,
        marginEnd:10,
        marginTop:4,
        marginBottom:4,
    },

    Hora:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#E2FCFB",
        paddingHorizontal:10,
        marginTop:4,
        marginBottom:4,
        borderRadius:6,
        marginEnd:10,

    },
    buttonDireção:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"rgba(0, 173, 181, 0.21)",
        paddingHorizontal:10,
        borderRadius:6,
        marginEnd:10,
        marginTop:4,
        marginBottom:4,

    },
    buttonMais:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"rgba(56, 253, 182, 0.5)",
        paddingHorizontal:10,
        borderRadius:6,
        marginEnd:8,
        marginTop:4,
        marginBottom:4,

    },
    Titulo:{
        fontSize:18,
        fontWeight:"600",
        color:"rgba(25, 25, 27, 0.9)"
    },
    Text:{
        fontSize:17,
        fontWeight:"600",
        marginTop:12,
        color:"rgba(25, 25, 27, 0.9)"
    },
    textDados:{
        fontSize:15,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.8)"
    },
    textBox:{
        fontSize:14,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.8)"
    },
    textCodigoAgente:{
        fontSize:15,
        fontWeight:"700",
        color:"rgba(37, 78, 70, 1)"
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
        fontSize:16,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.9)"
    },
    caixaComentario:{
        backgroundColor:"rgba(235, 235, 235, 1)",
        padding:8,
        borderRadius:8,
        marginEnd:42

    },

    conteudoComentario:{
        fontSize:15,
        fontWeight:"400",
        color:"rgba(25, 25, 27, 0.9)"
    },
    Data:{
        fontSize:13,
        fontWeight:"500",
        marginStart:8,
        color:"rgba(25, 25, 27, 0.5)"

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
        padding: 16, // Adicione o padding desejado para o conteúdo na parte inferior
        backgroundColor:"#FFFFFF",
        width:"86%",
        borderRadius:8,
        minHeight: 42,
        fontSize:16
        
    },
    Enviar:{
   
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
      buttonPopUP:{
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#254E46',
        marginTop:8
      },
      sim:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginEnd:4,
        marginTop:4,
        backgroundColor:"rgba(99, 181, 71, 1)"
      },
      nao:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop:4,
        backgroundColor:"#DD5757"
      },
      textButton:{
         color:"#FFFFFF"
      },
      botoes:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:4
    },

    img:{
        width:42,
        height: 42,
        borderRadius: 100,
        
    },


});