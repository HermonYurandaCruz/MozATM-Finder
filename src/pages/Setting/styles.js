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
    perfil:{
        alignItems:"center"
    },
 
    box:{
        paddingVertical: 12,
        paddingHorizontal: 8,
        backgroundColor:"#FFFFFF",
        borderRadius:8,
    },
    botoes:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:4
    },
    separator: {
        borderBottomColor: 'rgba(41, 82, 74, 0.22)', 
        borderBottomWidth: 0.7,     
        marginStart:24,
        marginBottom:12,
        marginTop:3
      },
      texto:{
        marginStart:4,
        fontSize:16,
        fontWeight:"400",
      },
      textoSair:{
        fontSize:16,
        fontWeight:"500",
        color:"#F23232",
        fontWeight:"500",

      },
      Titulo:{
        fontSize:15,
        fontWeight:"500",
        marginTop:12,
        marginBottom:4,
        color:"rgba(147, 147, 147, 1)",

        
    },
    textoNome:{
        fontSize:18,
        fontWeight:"500",
    },
    textoEmail:{
        fontSize:16,
        fontWeight:"500",
        color:"rgba(147, 147, 147, 1)",

    },
    img:{
        width:82,
        height: 82,
        marginTop:16,
        borderRadius: 100,

        
    },
    TextHeade:{
        fontSize:18,
        fontWeight:"600",
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
        marginTop:"50%",
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
        backgroundColor:"#F8F8F8"
      },
      nao:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop:4,
        backgroundColor:"rgba(41, 82, 74, 0.9)"

      },
      textButton:{
         color:"#FFFFFF"
      }


})