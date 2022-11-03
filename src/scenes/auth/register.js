import React, {useState, useContext} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {Stack, TextInput, Button, Text} from '@react-native-material/core';

import store from '../../store/store';
import * as AuthAction from '../../store/Actions/auth/AuthAction';
import * as UserAction from '../../store/Actions/user/UserAction';

const RegisterScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mail, setmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserExist, setIsUserExist] = useState(false);

  const register = async () => {
    let user = {
      firstName: firstName,
      lastName: lastName,
      mail: mail,
      password: password,
    };

    if (
      user.mail != undefined &&
      user.password != undefined &&
      user.firstName != undefined &&
      user.lastName != undefined
    ) {
      store.dispatch(UserAction.isUserExist(user.mail)).then(res => {
        if (res.success) setIsUserExist(true);
      });

      if (!isUserExist) {
        store.dispatch(AuthAction.register(user)).then(res => {
          console.log('res: register => ', res);
          if (res.success) {
            navigation.goBack();
          }
        });
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Dimensions.get('screen').height,
      }}>
      <Stack style={{alignItems: 'center', marginTop: 30}}>
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={require('../../assets/logo/PT-Logo.png')}
          />
        </View>
      </Stack>
      <Stack spacing={10} style={{margin: 20, marginTop: 30}}>
        <TextInput
          color="#717D84"
          variant="outlined"
          label="İsim"
          value={firstName}
          onChangeText={text => setFirstName(text)}
          autoCapitalize="none"
        />
        <TextInput
          color="#717D84"
          variant="outlined"
          label="Soyisim"
          value={lastName}
          onChangeText={text => setLastName(text)}
          autoCapitalize="none"
        />
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
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
        />
      </Stack>
      <Button
        style={{margin: 20}}
        onPress={() => register()}
        color="#717D84"
        variant="outlined"
        title={'Kayıt Ol!'}></Button>
    </View>
  );
};

export default RegisterScreen;

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
