import * as React from 'react';
import {  AsyncStorage} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '_scenes/login';
import Splash from "_scenes/splash";
import Home from "_scenes/home";
import {onGoogleLogin,onGoogleLogout} from '_services/google-service';
import {  AuthContext} from "../global/AuthContext";
const Stack = createStackNavigator();


function App() {
// Auth Reducer
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_DATA':
          return {
            ...prevState,
            userData: action.data,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userData: action.data,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userData: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );


  React.useEffect(() => {
    // Fetch the data from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userData;

      try {
        userData = await AsyncStorage.getItem('userData');
      } catch (e) {
        alert("Restoring user data faild!")
      }
      console.log(userData);
      dispatch({ type: 'RESTORE_DATA', data: userData });
    };
    // wait for 1.5 second to visible splash
    setTimeout(bootstrapAsync,1500)
  }, []);




  const authContext = React.useMemo(
    () => ({
      signIn: async authType => {
        if(authType=='google_login'){
          onGoogleLogin().then(async res=>{
             AsyncStorage.setItem("userData",JSON.stringify(res))
             AsyncStorage.setItem('loginType','google');
            dispatch({ 
                type: 'SIGN_IN', 
                data:JSON.stringify(res)
            });
          }).catch(err=>{
            alert(err)
          })
        }else{
           AsyncStorage.setItem('loginType','finger');
           AsyncStorage.setItem("userData","youreLoggedInMyFriend")
          dispatch({ 
            type: 'SIGN_IN', 
            data:'loggedInUsingFingerId'
          });
        }
      },
      signOut: () => {
        onGoogleLogout().then(res=>{
          dispatch({ type: 'SIGN_OUT' })
        }).catch(err=>{
          alert('Something went wrong with!')
        })
      }
    }),[]);

    if (state.isLoading) {
      // We haven't finished checking for the data yet
      return <Splash />;
    }
    return (
      <NavigationContainer>
        <AuthContext.Provider
          value={authContext}
        >
          <Stack.Navigator>
            {
              state.userData == null ?(
                <Stack.Screen 
                  name="Login" 
                  component={Login} 
                  options={{
                      header:()=>null
                  }}
                />
              ):(
                <Stack.Screen 
                  name="Home" 
                  component={Home} 
                  options={{
                      header:()=>null
                  }}
                />
              )

            }
          </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    );
  }

  export default App;