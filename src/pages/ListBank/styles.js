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
        fontWeight:600,
        color:"rgba(25, 25, 27, 0.9)"
        },
    loadingIndicator:{
        position:"absolute",
        paddingTop:"100%",
        paddingStart:"65%"
    },

    inputPesquisa:{
        marginTop:22,
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
 

    TextMedio:{
        textAlign:"center",
        fontSize:14,
        fontWeight:400,
        marginTop:4
    },
    TextLista:{
        marginTop:16,
        fontSize:17,
        fontWeight:500,
        color:"#19191B",
    },



    infoBank:{
        marginStart:12,
        marginTop:4
    },
    ListCardBank:{
        marginTop:4
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
        fontSize:15,
        fontWeight:300,
        marginStart:2,
        color:"rgba(25, 25, 27, 0.7)"
    },

    buttonsCard:{
        flexDirection:"row"
    },


    imgBank:{
        marginTop:4,
        width: 48,
        height: 48,
        borderRadius:4
    },
    
    TextNomeBank:{
        fontSize:16,
        fontWeight:500,
    },
    TextTypoBank:{
        fontSize:14,
        fontWeight:400,
    },
    TextAndereco:{
        marginTop:2
    },


    TextHeade:{
        fontSize:18,
        fontWeight:"600",
    },
    TextNomeBank:{
        fontSize:16,
        fontWeight:"500",
        color:"rgba(25, 25, 27, 0.9)"
    },

});
