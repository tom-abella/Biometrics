import React, { useState } from "react"
import { SafeAreaView, Text, View, TouchableOpacity, Image, StyleSheet } from "react-native"
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'

import LocalAuthentication from 'rn-local-authentication';
export default function App(){

  const [biometrics, setBiometrics] = useState(false)
  const [biometricType, setBiometricTypes] = useState('')

  const LoginWithBiometrics = () => {
    // Login(email, password);
    LocalAuthentication.authenticateAsync({
      reason: 'Please authenticate.',
      fallbackToPinCodeAction: true,
    }).then(async response => {
      if (response.success) {
       console.log(response)
      }
    });
  };

  const rnBiometrics = new ReactNativeBiometrics()
  rnBiometrics.isSensorAvailable()
  .then((resultObject) => {
    const { available, biometryType } = resultObject

    
    if(available){
      setBiometrics(true)
      if (biometryType === BiometryTypes.TouchID) {
        setBiometricTypes('Touch ID')
        console.log('TouchID is supported')
      } else if (biometryType === BiometryTypes.FaceID) {
        setBiometricTypes("Face ID")
        console.log('FaceID is supported')
      } else if (biometryType === BiometryTypes.Biometrics) {
        setBiometricTypes('Biometrics')
        console.log('Biometrics is supported')
      }
    }
    else {
      setBiometrics(false)
      console.log('Biometrics not supported')
    }
  })


  
  return(
    
    <SafeAreaView style={styles.container}>
      <View style={{alignSelf:"center",justifyContent:'center'}}>
      {!biometrics ? (
        <TouchableOpacity onPress={LoginWithBiometrics}>
          <View>
            <Image source={require('./src/pattern-lock.png')} style={styles.image} />
            <Text style={styles.text}>Tap to Use PIN/Pattern</Text>
          </View>
        </TouchableOpacity>
      ):''}
      {biometricType == "Biometrics" ? (
        <TouchableOpacity onPress={LoginWithBiometrics}>
          <View>
            <Image source={require('./src/biometrics.png')} style={styles.image} />
            <Text style={styles.text}>Tap to Use PIN/Pattern</Text>
          </View>
        </TouchableOpacity>
      ):''}
        {biometricType == "Face ID" ? (
        <TouchableOpacity onPress={LoginWithBiometrics}>
          <View>
            <Image source={require('./src/face-detection.png')} style={styles.image} />
            <Text style={styles.text}>Face ID</Text>
          </View>
        </TouchableOpacity>
      ):''}
        {biometricType == "Touch ID" ? (
        <TouchableOpacity onPress={LoginWithBiometrics}>
          <View>
            <Image source={require('./src/biometrics.png')} style={styles.image} />
            <Text style={styles.text}>Touch ID</Text>
          </View>
        </TouchableOpacity>
      ):''}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    height:'100%',
    width:'100%',
    color:'#161616',
  },
  text:{
    color:'#161616',
    width:'100%'
  },
  image:{
    width: 100, 
    height: 100,
    alignSelf:'center',
    marginBottom:10
  }

});