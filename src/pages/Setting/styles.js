import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:16,
        paddingTop:8,
        
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
        borderRadius:12,
    },
    botoes:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:3
    },
    botoes73:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:8
  },
    separator: {
        borderBottomColor: 'rgba(41, 82, 74, 0.22)', 
        borderBottomWidth: 0.7,     
        marginStart:24,
        marginBottom:12,
        marginTop:8
      },
      texto:{
        marginStart:4,
        fontSize:16,
        fontWeight:"normal",
      },
      textoSair:{
        fontSize:16,
        fontWeight:"normal",
        color:"#F23232",

      },
      Titulo:{
        fontSize:16,
        fontWeight:"bold",
        marginTop:8,
        marginBottom:4,
        color:"rgba(25, 25, 27, 0.9)"
        
    },
    textoNome:{
        fontSize:18,
        fontWeight:"normal",
    },
    textoEmail:{
        fontSize:16,
        fontWeight:"normal",
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
        fontWeight:"bold",
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
        marginTop:"auto",
        marginHorizontal:16,
        marginBottom:"auto"
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
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginEnd:4,
        marginTop:4,
        backgroundColor:"#F8F8F8",
        alignItems:"center",
        width:"100%",
      },
      nao:{
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginTop:4,
        backgroundColor:"#4177FF",
        alignItems:"center",
        width:"100%",

      },
      textButton:{
         color:"#FFFFFF"
      },

      UserName:{
        fontSize:25,
        fontWeight:"bold",
        color:"rgba(25, 25, 27, 0.9)",
        marginBottom:8
    },
})