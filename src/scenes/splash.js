import React from "react";
import { SafeAreaView ,Text} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
class Splash extends React.Component{
    render(){
        return (
            <SafeAreaView
                style={{
                    flex:1,
                    backgroundColor:'rgb(58,44,108)',
                    alignItems:"center",
                    justifyContent:"center"
                }}
            >
                <Text
                    style={{
                        fontFamily:'Roboto',
                        fontSize:RFValue(30),
                        fontWeight:'bold',
                        color:'white'
                    }}
                >
                    Welcome 
                </Text>
            </SafeAreaView>
        );
    }
}

export default Splash;