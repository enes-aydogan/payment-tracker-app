import React, { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  ListItem,
  Button,
  Dialog,
  DialogActions,
  DialogHeader,
  DialogContent,
  Stack,
  TextInput,
} from '@react-native-material/core';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';

import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../styles/metrics';
import { AuthContext } from '../../utils/AuthContext';
import * as AuthAction from '../../store/Actions/auth/AuthAction';
import * as OrgAction from '../../store/Actions/organization/OrgAction';

const AboutScreen = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const {
    authDispatch,
    authState: {},
    orgDispatch,
    orgState: {
      getCreateOrganization: {
        createOrganizationData,
        createOrganizationError,
        createOrganizationLoading,
      },
      getAddUserToOrg: {
        addUserToOrgData,
        addUserToOrgLoading,
        addUserToOrgError,
      },
    },
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

  const createOrganization = () => {
    let organization = {
      name: name,
      address: address,
    };

    Alert.alert('Uyarı!', 'Ev eklemek istediğinize emin misiniz?', [
      {
        text: 'İptal',
      },
      {
        text: 'Evet',
        onPress: () => {
          OrgAction.createOrganization(organization)(orgDispatch)(res => {
            if (res.success) {
              OrgAction.addUserToOrg({
                userID: res.data.ownerID,
                orgID: res.data._id,
              })(orgDispatch)(response => {
                if (response.success) {
                  setVisible(false);
                  setName('');
                  setAddress('');
                  Alert.alert(
                    'Başarılı!',
                    'Yeni ev başarılı birşekilde oluşturulmuştur.',
                  );
                }
              });
            }
          });
        },
      },
    ]);

    // alert atılacak, ve response a göre error alert or success alert will be shown for user
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
      <ListItem title="Ev Ekle" onPress={() => setVisible(true)} />
      <View style={styles.pressable}>
        <Text style={styles.pressable_text}>
          <Icon name="person-outline" size={moderateScale(22)} /> Ayarlar
        </Text>
      </View>
      <ListItem title="Bilgilerim" />
      <ListItem title="Çıkış Yap" onPress={() => logout()} />
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <DialogHeader title="Ev Ekle" />
        <DialogContent>
          <Stack spacing={2}>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              color="#717D84"
              label="İsim"
              variant="standard"
            />
            <TextInput
              value={address}
              onChangeText={text => setAddress(text)}
              color="#717D84"
              label="Adres"
              variant="standard"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancel"
            compact
            loading={addUserToOrgLoading}
            disabled={addUserToOrgLoading}
            variant="text"
            color="#717D84"
            onPress={() => setVisible(false)}
          />
          <Button
            title="Ok"
            compact
            loading={addUserToOrgLoading}
            disabled={addUserToOrgLoading}
            variant="text"
            color="#717D84"
            onPress={() => createOrganization()}
          />
        </DialogActions>
      </Dialog>
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
