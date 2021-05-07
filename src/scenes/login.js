    import React, { Component } from 'react';
    import {  View, Text, SafeAreaView,Image, DeviceEventEmitter, NativeModules, Alert,Platform, Pressable} from "react-native";
    import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
    import {styles,wp,hp} from "_styles";
    import { LoginTitle ,AuthContainer} from "_components";
    import FingerprintScanner from 'react-native-fingerprint-scanner';

    class  Login extends Component{
        constructor(props){
            super(props);
            this.state={
                errorMessageLegacy: undefined,
                biometricLegacy: undefined,
                isSensorAvailable:true,
            }

        }
        async componentDidMount(){
            // DeviceEventEmitter.addListener('FINGERPRINT_SCANNER_AUTHENTICATION',(msg)=>{
            //     alert(msg)
            // })
            // console.log(await NativeModules.ReactNativeFingerprintScanner.authenticate());
            // FingerprintScanner
            // .isSensorAvailable()
            // .then(biometryType => {
            //     if (this.requiresLegacyAuthentication()) {
            //         this.authLegacy();
            //       } else {
            //         this.authCurrent();
            //       }
            // }).catch(error => {
            //     this.setState({
            //         isSecureContext:false
            //     })
            //     alert(error)
            // });
           
            // FingerprintScanner
            // .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
            // .then(() => {
            //   alert("ok")
            // })
            // .catch((error) => {
            //     alert(error)
               
            // });
        }
        componentWillUnmount = () => {
            FingerprintScanner.release();
        }
        requiresLegacyAuthentication() {
        return Platform.Version < 23;
        }
        authCurrent() {
            FingerprintScanner
                .authenticate({ title: 'Log in with Biometrics' })
                .then(() => {
                    alert("onAuthenticated success")
                });
        }
        authLegacy() {
            FingerprintScanner
              .authenticate({ onAttempt: this.handleAuthenticationAttemptedLegacy })
              .then(() => {
                
                Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
              })
              .catch((error) => {
                  alert(error)
                this.setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
              });
        }
        handleAuthenticationAttemptedLegacy = (error) => {
            this.setState({ errorMessageLegacy: error.message });
          
        };
        render(){
            const {isSensorAvailable}=this.state
            return (
                <SafeAreaView
                    style={styles.container}
                >
                    <LoginTitle/>
                    <AuthContainer
                        navigation={this.props.navigation}
                    />
                </SafeAreaView>
            )
        }
    }
    export default Login;