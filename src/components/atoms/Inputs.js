import React, {useState} from 'react';
import {Stack, TextInput} from '@react-native-material/core';

const FormInputs = () => {
  return (
    <Stack spacing={2} style={{margin: 20, marginTop: 45}}>
      <TextInput color="#717D84" variant="outlined" label="Masraf giriniz" />
      <TextInput
        color="#717D84"
        variant="outlined"
        label="Masraf açıklaması giriniz"
        style={{marginTop: 20}}
      />
    </Stack>
  );
};

const LoginInputs = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  let user = {
    username: username,
    password: password,
  };
  return (
    <Stack spacing={2} style={{margin: 20, marginTop: 45}}>
      <TextInput
        color="#717D84"
        variant="outlined"
        label="Kullanıcı adı"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        color="#717D84"
        variant="outlined"
        label="Şifre"
        style={{marginTop: 20}}
        value={password}
        onChangeText={text => setPassword(text)}
      />
    </Stack>
  );
};

export {FormInputs, LoginInputs};
