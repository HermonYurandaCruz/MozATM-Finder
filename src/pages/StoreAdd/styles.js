import { StyleSheet } from "react-native";
import Constants from 'expo-constants';


export default StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:Constants.statusBarHeight +16 ,
    },
    Text:{
        fontSize:18,
        fontWeight:"600",
        color:"rgba(25, 25, 27, 0.9)"
    },
    loadingIndicator:{
        position:"absolute",
        paddingTop:"100%",
        paddingStart:"65%"
    },

    inputPesquisa:{
        marginTop:16,
        flexDirection:"row",
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
    },
    input:{
        fontSize:14,
        color:"#19191B",
        marginStart:24
    },

    navStore:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop:8
        },

    tab: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 10,
      },
      selectedTab: {
        backgroundColor: 'rgba(41, 82, 74, 0.85)', // Estilo quando selecionado
      },
      tabText: {
        color: 'black',
      },
      selectedText: {
        color: 'white',
      },
    
 

    TextMedio:{
        textAlign:"center",
        fontSize:14,
        fontWeight:"400",
        marginTop:4
    },
    TextLista:{
        marginTop:16,
        fontSize:17,
        fontWeight:"500",
        color:"#19191B",
    },



    infoBank:{
        marginStart:12,
        marginTop:8
    },
    ListCardBank:{
        marginTop:8
    },
    CardBank:{
        flexDirection:"row",
        backgroundColor:"#FFFFFF",
        borderRadius:8,
        paddingVertical:12,
        paddingHorizontal:12,
        marginTop:8
    },
    Hora:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:4,
    },
    curtidasText:{
        fontSize:14,
        fontWeight:700,
        marginStart:2
    },
    heade:{
        flexDirection: "row",
        alignItems:"center"
        },

    buttonsCard:{
        flexDirection:"row",
    },


    imgBank:{
        marginTop:4,
        width: 64,
        height: 64,
        borderRadius:4
    },
    
    TextNomeBank:{
        fontSize:16,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.9)"
    },
    TextTypoBank:{
        fontSize:15,
        fontWeight:"400",
    },
    TextAndereco:{
        marginTop:2,
        fontSize:15,
        fontWeight:"400",
    },
    buttonDireção:{
        marginEnd:8
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
      botoes:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:4
    },
      sim:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginEnd:4,
        marginTop:4,
        backgroundColor:"#DD5757"
      },
      nao:{
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop:4,
        backgroundColor:"#F8F8F8"
        
      },
      textButton:{
         color:"#FFFFFF"
      }


});
