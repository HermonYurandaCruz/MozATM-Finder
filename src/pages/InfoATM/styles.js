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
        paddingHorizontal:16,
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
        backgroundColor:"rgba(221, 87, 87, 0.4)",
        paddingHorizontal:10,
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