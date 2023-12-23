import { StyleSheet } from "react-native";
import Constants from 'expo-constants';


export default StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:24,
        paddingTop:Constants.statusBarHeight +16 ,
    },
    Text:{
        marginTop:24,
        fontSize:17,
        fontWeight:"700",
        color:"#19191B",
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
        fontSize:15,
        fontWeight:"600",
    },
    TextTypoBank:{
        fontSize:14,
        fontWeight:"400",
    },
    TextAndereco:{
        marginTop:2
    },
    buttonDireção:{
        marginEnd:8
    }


});
