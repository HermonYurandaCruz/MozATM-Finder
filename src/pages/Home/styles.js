import { StyleSheet } from "react-native";
import Constants from 'expo-constants';


export default StyleSheet.create({

    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:Constants.statusBarHeight +16 ,
    },
    header:{
        flexDirection:"row",
        alignItems:"center"
    },
    iconNotification:{
    position:"absolute",
    right: 0
    },
    TextOla:{
        fontSize:15,
        fontWeight:"500",
        marginStart:6,
        color:"rgba(25, 25, 27, 0.7)"
        },
    UserName:{
        fontSize:18,
        fontWeight:"600",
        color:"#254E46",
        marginStart:6
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
    Text:{
        marginTop:18,
        fontSize:18,
        fontWeight:"600",
        color:"rgba(25, 25, 27, 0.9)"
    },
    containerATM:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:8
    },
    buttonContent:{
        borderRadius:8,
        paddingVertical: 16,
        paddingHorizontal: 5,
        backgroundColor:"rgba(41, 82, 74, 0.15)",
    },
    TextMedio:{
        textAlign:"center",
        fontSize:14,
        fontWeight:"500",
        marginTop:4,
        color:"rgba(25, 25, 27, 0.7)"
    },
    TextLista:{
        fontSize:18,
        fontWeight:"600",
        color:"rgba(25, 25, 27, 0.9)"
    },
    estiloRefre:{
        marginTop:18,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    
    loadingLista:{
        paddingBottom:"50%",


    },

    infoBank:{
        marginStart:6
    },
    CardBank:{
        flexDirection:"row",
        backgroundColor:"#FFFFFF",
        borderRadius:8,
        paddingVertical:8,
        paddingHorizontal:8,
        marginTop:8
    },
  
    Hora:{
        flexDirection:"row",
        alignItems:"center", 
        fontSize:15,
        fontWeight:"400",
    },

    buttonsCard:{
        flexDirection:"row"
    },

    buttonContentCard:{
        borderWidth:1,
        flexDirection:"row",
        backgroundColor:"FFFFFF",
        borderColor:"#0F5257",
        borderRadius:8,
        paddingVertical:2,
        paddingHorizontal:4,
        marginEnd:4,
        marginTop:4
    },
    imgBank:{
        marginTop:18,
        width: 68,
        height: 68,
        borderRadius:8
    },
    textButton:{
        fontSize:13,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.9)"
    },
    TextNomeBank:{
        fontSize:16,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.9)"
    },
        loadingIndicator:{
        position:"absolute",
        paddingTop:"100%",
        paddingStart:"80%"
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

    img:{
        width:42,
        height: 42,
        borderRadius: 100,

        
    },

});
