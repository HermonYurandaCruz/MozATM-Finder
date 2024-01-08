import { StyleSheet } from "react-native";
import Constants from 'expo-constants';


export default StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:Constants.statusBarHeight +16 ,
    },
    heade:{
        flexDirection:"row",
        alignItems:"center"
    },
    Titulo:{
        fontSize:18,
        fontWeight:"600",
        marginStart:4
    },
    texto:{
        fontSize:17,
        fontWeight:"600",
        marginTop:22,
        marginBottom:8
    },
    textoApela:{
        fontSize:15,
        fontWeight:"300",
        marginBottom:16
    },
    resposta:{
        fontSize:16,
        fontWeight:"400",
        marginBottom:16
    },
    textoEmail:{
        fontSize:15,
        fontWeight:"500",
        marginBottom:16 
    },
    textoEnviarEmail:{
        fontSize:15,
        fontWeight:"700",
        marginBottom:16,
        color:"#254E46"
    },
    questao:{
        fontSize:16,
        fontWeight:"500"
    },
 
    CardBank: {
        flexDirection:"row",
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        paddingBottom:5,
        marginTop:5
      },
      TextNomeBank: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      expandedContent: {
        paddingHorizontal: 5,
        paddingTop: 5,
      },
      image: {
        width: "100%",
        height: "80%",
        borderRadius:8,
      },
      enviarEmailBox:{
        flexDirection:"row",
        marginBottom:24
      }

});
