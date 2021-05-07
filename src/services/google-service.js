import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure();
  

export const onGoogleLogin= async  ()=> {
    return await GoogleSignin.signIn();
};
export const onGoogleLogout = async ()=>{
    return await GoogleSignin.signOut();
}