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
        marginTop:16,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"rgba(56, 153, 183, 1)",
        paddingHorizontal:22,
        paddingVertical:28,
        borderRadius:8,
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
        fontSize:16,
        fontWeight:"500",
        color:"rgba(56, 153, 183, 0.8)",
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
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        marginHorizontal:16,
        paddingVertical:24,
        paddingHorizontal:16,
        marginBottom:"auto",
        marginTop:"auto"

      },
      titlePopUp: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom:4,
        alignItems:"center",
        textAlign:"center"
      },
      buttonPopUP:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: "10%",
        backgroundColor: '#357184',
        marginTop:8
      },
      text: {
        color:"#FFFFFF",
        textAlign: 'center',
        fontWeight:"normal",
        fontSize:16,
        width:'100%'
      },
  
});