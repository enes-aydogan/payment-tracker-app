import {View, Dimensions, ScrollView, FlatList, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Text,
  HStack,
  Flex,
  Dialog,
  DialogActions,
  DialogHeader,
  DialogContent,
  VStack,
  Surface,
  Stack,
  TextInput,
  Switch,
} from '@react-native-material/core';

import store from '../../store/store';
import * as UserAction from '../../store/Actions/user/UserAction';
import * as OrgAction from '../../store/Actions/organization/OrgAction';
import * as PeriodAction from '../../store/Actions/period/PeriodAction';

const OrganizationSetting = ({
  item,
  users,
  buttonTitle,
  labelOrgname,
  lablelAddress,
}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [errorDialogVisible, setErrorDialogVisible] = useState(false);
  const [mail, setMail] = useState();
  const [dialogMessage, setDialogMessage] = useState('');
  const [periodStatus, setPeriodStatus] = useState(
    item.orgID.periods.slice(-1)[0].status,
  );

  orgUser = () => {
    store.dispatch(UserAction.isUserExist(mail)).then(res => {
      if (res.data) {
        const orgUser = {
          orgID: item.orgID._id,
          userID: res.data,
        };
        store.dispatch(OrgAction.addUserToOrg(orgUser)).then(res => {
          if (res != null) {
            setDialogVisible(false);
            setDialogMessage('Kullanıcı başarıyla eklenmiştir!');
            setErrorDialogVisible(true);
          } else {
            setDialogVisible(false);
            setDialogMessage('Kullanıcı bu organizasyonda kayıtlı!');
            setErrorDialogVisible(true);
          }
        });
      } else {
        setDialogVisible(false);
        setDialogMessage('Bu mail ile bir kullanıcı bulunmamaktadır!');
        setErrorDialogVisible(true);
      }
    });
  };

  function renderUsers() {
    return users.map((obj, index) => {
      const key = index;
      return (
        <Text key={key}>
          {obj.userID.firstName + ' ' + obj.userID.lastName}
        </Text>
      );
    });
  }

  function finalizePeriod() {
    Alert.alert('Uyarı!', 'Periodu sonlandırmak istediğinize emin misiniz?', [
      {
        text: 'İptal',
      },
      {
        text: 'Evet',
        onPress: () => {
          store
            .dispatch(PeriodAction.finalizePeriod(item.orgID._id))
            .then(res => {
              if (res) {
                setPeriodStatus(!periodStatus);
                Alert.alert(
                  'Başarılı!',
                  'Period başarıyla sonlandırılmıştır, harcama kaydetebilmek için yeni bir period oluşturunuz.',
                );
              }
            });
        },
      },
    ]);
  }

  return (
    <Flex
      style={{
        margin: 3,
        marginTop: 3,
        backgroundColor: '#ecf0f1',
        height: Dimensions.get('window').height,
      }}>
      <VStack spacing={5}>
        <Surface
          elevation={2}
          style={{margin: 12, borderRadius: 10, maxHeight: 320}}>
          <Flex style={{margin: 15, marginTop: 20}}>
            <HStack spacing={5}>
              <Text variant="h7">{labelOrgname}</Text>
              <Text variant="h7">{item.orgID.name}</Text>
            </HStack>
            <HStack spacing={80} style={{marginTop: 10, width: 220}}>
              <Text variant="h7">{lablelAddress}</Text>
              <Text variant="h7">{item.orgID.address}</Text>
            </HStack>
            <HStack spacing={75} style={{marginTop: 10, width: 320}}>
              <Text variant="h7">Üyeler: </Text>
              <VStack spacing={3} style={{maxHeight: 200}}>
                <FlatList
                  data={renderUsers()}
                  renderItem={({item}) => (
                    <Surface
                      style={{backgroundColor: '#ecf0f1', borderRadius: 20}}>
                      <Text style={{margin: 3, marginLeft: 3, marginRight: 3}}>
                        {item}
                      </Text>
                    </Surface>
                  )}
                />
              </VStack>
            </HStack>
            <Button
              style={{margin: 40}}
              onPress={() => setDialogVisible(true)}
              color="#717D84"
              variant="outlined"
              title={'Üye Ekle'}
            />
          </Flex>
        </Surface>
        <Surface
          elevation={2}
          style={{margin: 12, borderRadius: 10, maxHeight: 320}}>
          <Flex style={{margin: 15, marginTop: 20}}>
            <VStack spacing={10}>
              <HStack spacing={77}>
                <Text>Period: </Text>
                <Text>{item.orgID.periods.slice(-1)[0].periodName}</Text>
              </HStack>
              <HStack spacing={77}>
                <Text>Durum: </Text>
                <Switch
                  value={periodStatus}
                  onValueChange={() => finalizePeriod()}
                />
              </HStack>
            </VStack>
          </Flex>
        </Surface>
      </VStack>
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <DialogHeader title="Üye Ekle" />
        <DialogContent>
          <Stack spacing={2}>
            <Text>Ekleyeceğiniz üyenin mail adresini giriniz.</Text>
            <TextInput
              value={mail}
              onChangeText={text => setMail(text)}
              style={{marginTop: 10}}
              color="#717D84"
              label="Email"
              variant="standard"
              autoCapitalize="none"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            title="İptal"
            compact
            color="#717D84"
            variant="text"
            onPress={() => setDialogVisible(false)}
          />
          <Button
            title="Ekle"
            compact
            color="#717D84"
            variant="text"
            onPress={() => orgUser()}
          />
        </DialogActions>
      </Dialog>
      <Dialog
        visible={errorDialogVisible}
        onDismiss={() => setErrorDialogVisible(false)}>
        <DialogHeader title="Uyarı" />
        <DialogContent>
          <Text>{dialogMessage}</Text>
        </DialogContent>
        <DialogActions>
          <Button
            title="Ok"
            compact
            variant="text"
            onPress={() => setErrorDialogVisible(false)}
          />
        </DialogActions>
      </Dialog>
    </Flex>
  );
};
export default OrganizationSetting;
/**
 * <HStack spacing={5}>
        <Text variant="h7">{labelOrgname}</Text>
        <Text variant="h7">{item.orgID.name}</Text>
      </HStack>
      <HStack spacing={80} style={{marginTop: 10, width: 250}}>
        <Text variant="h7">{lablelAddress}</Text>
        <Text variant="h7">{item.orgID.address}</Text>
      </HStack>
      <HStack spacing={75} style={{marginTop: 10, width: 250}}>
        <Text variant="h7">Üyeler: </Text>
        <View>{renderUsers()}</View>
      </HStack>
      <Button
        style={{margin: 40}}
        onPress={() => setDialogVisible(true)}
        color="#717D84"
        variant="outlined"
        title={buttonTitle}
      />
 */
