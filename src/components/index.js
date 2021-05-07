import React, { Component,useState } from 'react';
import { useEffect } from 'react';
import { View, Text, SafeAreaView,Pressable,Image, Alert,Platform, } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { styles, wp, hp } from "_styles/";
import FingerprintScanner from 'react-native-fingerprint-scanner';

import { AuthContext } from '../global/AuthContext';



export function LoginTitle() {
    return (
        <View
            style={styles.loginTitleContainer}
        >
            <Text
                style={styles.bigTxt}
            >
                LOGIN
            </Text>
            <Text
                style={styles.smallTxt}
            >
                You can login with any of your choice
            </Text>
        </View>
    )
}
function AuthButtonText({
    txt
}) {
    return (
        <Text
            style={styles.authTxt}
        >
            {txt}
        </Text>
    )
}
export function AuthContainer({
    navigation
}) {
    const [errorMessageLegacy,setError]=useState(null);
    const [biometricLegacy,setBio]=useState(null);
    const [isSensorAvailable,setSensor]=useState(false);
    const { signIn } = React.useContext(AuthContext);
    const requiresLegacyAuthentication=()=> {
        return Platform.Version < 23;
        }
       const  authCurrent=()=> {
            FingerprintScanner
                .authenticate({ title: 'Log in with Biometrics' })
                .then(() => {
                    alert("onAuthenticated success")
                });
        }
        const authLegacy=()=> {
            FingerprintScanner
              .authenticate({ onAttempt:handleAuthenticationAttemptedLegacy })
              .then(() => {
                
                Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
              })
              .catch((error) => {
                  alert(error)
                  setBio(error.biometric);
                  setError(error.message);
              });
        }
        const handleAuthenticationAttemptedLegacy = (error) => {
            return error;
        };
    useEffect(()=>{
        FingerprintScanner
        .isSensorAvailable()
        .then(biometryType => {
            setSensor(()=>true);
           
        }).catch(error => {
            setSensor(false)
        });
        return FingerprintScanner.release();
    })
    
    return (
        
        <View
            style={styles.authContainer}
        >
            <Pressable
                style={[styles.authBtn, { backgroundColor: "rgba(107,97,139,1)", marginVertical: 15 }]}
                onPress={()=>signIn('google_login')}
            >
                <Image
                    source={{ uri: 'https://img.icons8.com/officel/2x/google-logo.png' }}
                    style={styles.authBtnLogo}
                />
                <AuthButtonText
                    txt={'Sign In With Google'}
                />
            </Pressable>
            {
                isSensorAvailable &&
                <Pressable
                    style={[styles.authBtn, { backgroundColor: "rgba(107,97,139,1)" }]}
                    onPress={()=>{
                        signIn('finger_Login')
                    }}
                >
                    <Image
                        source={{ uri: 'https://image.flaticon.com/icons/png/512/125/125503.png' }}
                        style={[styles.authBtnLogo, {
                            tintColor: 'white'
                        }]}
                    />
                    <AuthButtonText
                        txt={'User Your Finger ID'}
                    />
                </Pressable>
            }
            <Pressable
                style={[styles.authBtn, { marginVertical: 15 ,borderWidth:1,borderColor:'white'}]}
            >

                <AuthButtonText
                    txt={'Not now'}
                />
            </Pressable>
        </View>
    )
}