import {  StyleSheet} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    loginTitleContainer:{
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    bigTxt:{
        fontFamily: 'System',
        fontWeight: 'bold',
        fontSize: RFValue(40),
        color: 'rgb(58,44,108)'
    },
    smallTxt:{
        fontFamily: 'System',
        fontSize: RFValue(17),
        color: 'rgba(58,44,108,0.5)',
        marginHorizontal: wp(20),
        textAlign: "center",
        marginVertical: wp(5)
    },
    authContainer:{
        flex:1,
        backgroundColor:'rgb(58,44,108)',
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        justifyContent:"center",
        alignItems:"center"
    },
    authBtn:{
        width:wp(70),
        padding:10,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:wp(2),
        flexDirection:'row',
        alignItems:"center",
        paddingHorizontal:wp(6),
        justifyContent:"space-around",
     
    },
    authBtnLogo:{
        height:wp(6),
        width:hp(6),
        resizeMode:'contain'
    },
    authTxt:{
        fontFamily:'sans-serif-light',
        fontSize:RFValue(20,750),
        fontWeight:'bold',
        color:'white'
    }
});
export {wp,hp}
