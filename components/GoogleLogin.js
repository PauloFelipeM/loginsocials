import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';

import { Google } from "expo";

export default class GoogleLogin extends Component {
  _handleGoogleLogin = async () => {
    try {
      const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidClientId: '619972048930-0cav6e3gq05oo9osvif624ovotlf98i9.apps.googleusercontent.com',
        iosClientId: '619972048930-itsiornvktbve98okqmhh4ucuefsvfkd.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      switch (type) {
        case 'success': {
          console.log(user);
          Alert.alert(
            'Logged in!',
            `Hi ${user.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    } catch (e) {
      Alert.alert(
        'Oops!',
        'Login failed!',
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        
        <Button
          title="Login with Google"
          onPress={this._handleGoogleLogin}
        />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});