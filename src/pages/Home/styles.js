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
        fontSize:14,
        fontWeight:"400",
        color:"rgba(147, 147, 147, 1)",
        marginStart:6
        },
    UserName:{
        fontSize:18,
        fontWeight:"500",
        color:"#19191B",
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
        marginTop:24,
        fontSize:17,
        fontWeight:"500",
        color:"#19191B",
    },
    containerATM:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:16
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
        fontWeight:"400",
        marginTop:4
    },
    TextLista:{
        fontSize:17,
        fontWeight:"500",
        color:"#19191B",
    },
    estiloRefre:{
        marginTop:16,
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
        paddingVertical:12,
        paddingHorizontal:12,
        marginTop:8
    },
  
    Hora:{
        flexDirection:"row",
        alignItems:"center"
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
        marginTop:12,
        width: 64,
        height: 64,
        borderRadius:8
    },
    
    TextNomeBank:{
        fontSize:15,
        fontWeight:"600",

    },
        loadingIndicator:{
        position:"absolute",
        paddingTop:"100%",
        paddingStart:"80%"
    },
    TextTypoBank:{
        fontSize:14,
        fontWeight:"400",
    },
    TextAndereco:{
        marginTop:2
    },

    img:{
        width:42,
        height: 42,
        borderRadius: 100,

        
    },

});
