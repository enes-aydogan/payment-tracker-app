import { View } from 'react-native';
import React, { useState } from 'react';
import { Stack, TextInput, Button, Text } from '@react-native-material/core';

const CreateOrganizationScreen = ({ navigation }) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const createOrg = async () => {
    let organization = {
      name: name,
      address: address,
    };

    navigation.navigate('Home');
  };
  return (
    <View style={{}}>
      <Stack spacing={2} style={{ margin: 20, marginTop: 30 }}>
        <TextInput
          color="#717D84"
          variant="outlined"
          label="Organizasyon adı"
          value={name}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
        />
        <TextInput
          color="#717D84"
          variant="outlined"
          label="Adres"
          style={{ marginTop: 20 }}
          value={address}
          onChangeText={text => setAddress(text)}
          autoCapitalize="none"
        />
      </Stack>
      <Button
        style={{ margin: 20 }}
        onPress={() => createOrg()}
        color="#717D84"
        variant="outlined"
        title={'Organizasyon Oluştur'}></Button>
    </View>
  );
};

export default CreateOrganizationScreen;
