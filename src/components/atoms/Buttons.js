import React from 'react';
import {HStack, Button} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';

const Buttons = () => {
  return (
    <HStack center spacing={25}>
      <Button color="#717D84" variant="outlined" title="Temizle" />
      <Button color="#717D84" variant="outlined" title="Kaydet" />
    </HStack>
  );
};

const LoginButtons = ({screenName}) => {
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => navigation.navigate(screenName)}
      color="#717D84"
      variant="outlined"
      title={screenName}></Button>
  );
};

export {Buttons, LoginButtons};
