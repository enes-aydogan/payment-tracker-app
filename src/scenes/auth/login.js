import React, { useState, useContext } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  Stack,
  TextInput,
  HStack,
  Flex,
} from '@react-native-material/core';

import * as AuthAction from '../../store/Actions/auth/AuthAction';
import { AuthContext } from '../../utils/AuthContext';
import store from '../../store/store';

const LoginScreen = ({ navigation }) => {
  const [mail, setmail] = useState('enes.aydogan@gmail.com');
  const [password, setPassword] = useState('12qw34er');
  //const [_, setUser] = useAuth();
  const {
    authDispatch,
    authState: { authData, authError, authLoading, isLoggedIn },
  } = useContext(AuthContext);

  const logIn = async () => {
    let user = {
      mail: mail,
      password: password,
    };

    if (user.mail != undefined && user.password != undefined) {
      AuthAction.logIn(user)(authDispatch);
      /* store.dispatch(AuthAction.logIn(user)).then(res => {
        if (store.getState().authReducer.isLoggedIn) {
          authContext.setAuthState({
            accessToken: res.data.token,
            authenticated: true,
            user: {
              mail: user.mail,
              password: user.password,
              id: res.data.id,
            },
          });
        }
      }); */
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
      }}>
      <Stack style={{ alignItems: 'center', marginTop: 30 }}>
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/logo/PT-Logo.png')}
          />
        </View>
      </Stack>
      <Stack spacing={2} style={{ margin: 20, marginTop: 30 }}>
        <TextInput
          color="#717D84"
          variant="outlined"
          label="Mail adresi"
          value={mail}
          onChangeText={text => setmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          color="#717D84"
          variant="outlined"
          label="Şifre"
          style={{ marginTop: 20 }}
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
        />
      </Stack>
      <View style={{ alignItems: 'flex-end', marginRight: 20 }}>
        <Text style={{ color: '#717D84' }}>Şifremi unuttum!</Text>
      </View>
      <Button
        style={{ margin: 20, marginTop: 60 }}
        onPress={() => logIn()}
        color="#717D84"
        variant="outlined"
        title={'Giriş Yap'}></Button>
      <View style={{ flex: 0, justifyContent: 'flex-end', marginTop: 60 }}>
        <HStack style={{ margin: 20 }}>
          <Text style={{ color: '#717D84' }}>Henüz hesabın yok mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: '#717D84',
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}>
              Kayıt Ol!
            </Text>
          </TouchableOpacity>
        </HStack>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 200,
    height: 200,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
