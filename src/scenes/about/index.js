import React, { useContext } from 'react';
import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, ListItem, Button } from '@react-native-material/core';
import * as AuthAction from '../../store/Actions/auth/AuthAction';
import { AuthContext } from '../../utils/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../styles/metrics';
const AboutScreen = () => {
  const {
    authDispatch,
    authState: {},
  } = useContext(AuthContext);

  /*   const logout = async () => {
    dispatch(AuthAction.logOut('asd'));
    authContext.setAuthState({
      accessToken: null,
      authenticated: false,
    });
  }; */

  const logout = () => {
    AuthAction.logOut()(authDispatch);
  };

  return (
    <View
      style={{
        height: Dimensions.get('window').height + verticalScale(100),
        backgroundColor: 'white',
      }}>
      <View style={styles.pressable}>
        <Text style={styles.pressable_text}>
          <Icon name="wallet-outline" size={moderateScale(22)} /> Ev Ayarları
        </Text>
      </View>
      <ListItem title="Ev Ekle" />
      <View style={styles.pressable}>
        <Text style={styles.pressable_text}>
          <Icon name="person-outline" size={moderateScale(22)} /> Ayarlar
        </Text>
      </View>
      <ListItem title="Bilgilerim" />
      <ListItem title="Çıkış Yap" onPress={() => logout()} />
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: moderateScale(10),
  },
  pressable: {
    margin: moderateScale(5),
    backgroundColor: '#ecf0f1',
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    height: verticalScale(35),
  },
  pressable_text: {
    marginLeft: horizontalScale(10),
    fontSize: moderateScale(16),
  },
});
