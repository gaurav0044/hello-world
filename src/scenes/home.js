import React from "react";
import {  View,Text, SafeAreaView} from "react-native";
class Home extends React.Component{
    render(){
        return (
            <SafeAreaView
                style={{
                    flex:1,
                    backgroundColor:'white'
                }}
            >
                <Text>
                    Home
                </Text>
            </SafeAreaView>
        )
    }
}
export default Home;