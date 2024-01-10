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
        alignItems:"center",
    },
    scrollView:{
      marginBottom:24
    },
    TextHeade:{
        fontSize:18,
        fontWeight:"600",
        color:"rgba(25, 25, 27, 0.9)",
    },
    Titulo:{
      fontSize:16,
      fontWeight:"500",
      marginTop:8,
      color:"rgba(25, 25, 27, 0.9)"
    },
    TituloATM:{
        fontSize:16,
        fontWeight:"500",
        marginTop:22,
        color:"rgba(25, 25, 27, 0.9)"
    },
    camera:{
        alignItems:"center",
        backgroundColor:"#FFFFFF",
        paddingVertical:30,
        borderRadius:8,
        marginTop:24,

    },
    termosCondi:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:16
    },
    termos:{
        fontSize:14,
        fontWeight:"500",
    },
    termosLink:{
        fontSize:14,
        fontWeight:"500",
        color:"#0F5257"
    },
    button: {
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(41, 82, 74, 0.9)',
        marginTop:18
      },
      text: {
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold",

      },

      dropdown: {
        height: 50,
        borderColor: '#254E46',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      
      input: {
        marginTop:12,
        borderBottomWidth: 2, // Define a largura da linha na parte inferior
        borderBottomColor: 'rgba(41, 82, 74, 0.9)', // Define a cor da linha
        marginBottom: 20,
        paddingBottom: 12, // Espaçamento entre o texto e a linha
        fontSize:16
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Define um fundo escuro transparente
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
      checkView:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:16
      },
      Text:{
        fontSize:15,
        fontWeight:"300",
        marginStart:4

      },
      TextLer:{
        fontSize:15,
        marginStart:2,
        color:"#0F5257",
        fontWeight:"700"
      }
});