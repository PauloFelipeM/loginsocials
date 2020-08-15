import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';

export default class FacebookLogin extends Component {
    _handleFacebookLogin = async () => {
        try {
            const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                '465638704005663',
                { permissions: ['public_profile','email']}
            );

            switch (type) {
                case 'success': {                  
                  const response = await fetch(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`);
                  const profile = await response.json();
                  
                  console.log(response);                  
                  console.log(profile);
                  Alert.alert(
                    'Logged in!',
                    `Hi ${profile.name}!`,
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
            
        } catch (error) {
            Alert.alert(
              'Oops!',
              'Login failed!',
            );
        }
    };

    render(){
        return (
            <View style={styles.container}>  
                <Button
                    title="Login with Facebook"
                    onPress={this._handleFacebookLogin}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    }
});