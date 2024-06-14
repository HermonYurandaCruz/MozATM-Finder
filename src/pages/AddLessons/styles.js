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

    quizzDia:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"#3899B7",
        paddingHorizontal:12,
        paddingVertical:22,
        borderRadius:8,
        marginBottom:8
    },
    input: {
        marginBottom: 20,
        backgroundColor:"rgba(34, 122, 149, 0.2)",
        fontSize:16,
        padding:16,
        borderRadius: 8,
        outlineStyle: "none",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"

        

      },

      inputDescricao: {
        backgroundColor:"#F8F8F6",
        fontSize:16,
        padding:16,
        borderRadius: 8,
        outlineStyle: "none",
        height:150

      },


      button: {
        borderRadius: 8,
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(65, 119, 255, 1)',
      },
      text: {
        color: 'white',
        textAlign: 'center',
        fontWeight:"bold",

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
        marginTop:22,
        marginBottom:6,
        fontSize:18,
        fontWeight:"700",
        color:"#063F51"
    },
    textNext:{
        fontSize:15,
        fontWeight:"500",
        color:"rgba(0, 0, 0, 0.5)",
    },
    textBack:{
        fontSize:15,
        fontWeight:"500",
        color:"rgba(252, 9, 9, 0.5)",
        marginStart:4
    },
    textHeadres:{
        marginBottom:6,
        fontSize:18,
        fontWeight:"700",
        color:"#063F51",
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Define um fundo escuro transparente
    },
    modalView: {
      backgroundColor:"rgba(232, 238, 255, 1)",
      borderRadius: 10,
        padding: 16,
        elevation: 5,
        marginHorizontal:16,
        marginVertical:24,
        marginBottom:"auto",
        marginTop:"auto"

      },
    titlePopUp: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom:4
    },
    buttonPopUP:{
      borderRadius: 8,
      paddingHorizontal:16,
      paddingVertical:16,
      backgroundColor: '#4177FF',
      marginTop:16,
      width:'100%'
    },
    input: {
      marginBottom: 20,
      backgroundColor:"rgba(232, 238, 255, 0.4)",
      fontSize:16,
      padding:16,
      borderRadius: 8,
      outlineStyle: "none",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"

      

    },
});