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
        backgroundColor:"rgba(190, 208, 255, 0.2)", 
        paddingHorizontal:12,
        paddingVertical:22,
        borderRadius:8,
        marginBottom:8
    },
    textTitulo:{
        fontSize:16,
        fontWeight:"500",
        color:"rgba(0, 0, 0, 0.7)",
    },
    textSubTitulo:{
        fontWeight:"500",
        color:"rgba(0, 0, 0, 0.7)"
    },
    textTituloBlack:{
        marginTop:22,
        marginBottom:6,
        fontSize:18,
        fontWeight:"700",
        color:"#063F51"
    },
    textNext:{
        fontSize:14,
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
    textHeadres2:{
      marginBottom:6,
      fontSize:14,
      fontWeight:"500",
      color:"#063F51",
  },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"rgba(232, 238, 255, 1)",
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
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:4,
        textAlign:"center"
      },
      buttonPopUP:{
        borderRadius: 8,
        paddingHorizontal:16,
        paddingVertical:16,
        backgroundColor: '#4177FF',
        marginTop:8,
        width:'100%'
      },
      input: {
        marginBottom: 8,
        backgroundColor:"#FFFFFF",
        fontSize:16,
        paddingHorizontal:8,
        paddingVertical:16,
        borderRadius: 8,
        outlineStyle: "none",
        flexDirection:"row",
        alignItems:"center",
        width:'100%',
        color:"rgba(0, 0, 0, 0.5)"

        

      },

      button: {
        marginVertical:12,
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
});