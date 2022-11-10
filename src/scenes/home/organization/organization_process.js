import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import React, { useState, useContext } from 'react';
import {
  Text,
  ListItem,
  Backdrop,
  BackdropSubheader,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../../utils/AuthContext';
import * as OrgAction from '../../../store/Actions/organization/OrgAction';
import * as UserAction from '../../../store/Actions/user/UserAction';
import OrganizationSetting from '../../../components/molecules/OrganizationSetting';
import PaymentTabView from '../../../components/molecules/PaymentTabView';
import { useEffect } from 'react';

const OrganizationProcess = ({ route, navigation }) => {
  const { item } = route.params;
  const [revealed, setRevealed] = useState('menu');
  const [selectedtItem, setSelectedtItem] = useState('');
  const [allPayments, setAllPayments] = useState([]);
  const [orgID, setOrgID] = useState('');
  const {
    orgDispatch,
    orgState: {
      getUsersByOrgID: { usersData, usersError, usersLoading },
    },
    userDispatch,
    userState: {
      getMe: { getMeData, getMeError, getMeLoading },
    },
  } = useContext(AuthContext);

  useEffect(() => {
    OrgAction.getUsersByOrgID(item.orgID._id)(orgDispatch);
    UserAction.getMe()(userDispatch);
  }, []);

  function setPaymentStates(type) {
    setSelectedtItem(type);
    setAllPayments(item.orgID.periods.slice(-1));
    setOrgID(item.orgID._id);
    setRevealed(prevState => !prevState);
  }
  //console.log(item.orgID.periods.slice(-1)[0].payments[0].partnerPays)
  // [{"PartnerId": "6346a155eeefa37c936365e2", "PartnerPrice": 50, "_id": "634ea09fef1ed44c3c311dd1"}]
  function setSettingState(type) {
    setShow(true);
    setSelectedtItem(type);
    setRevealed(prevState => !prevState);
    setShow(false);
  }

  return (
    <Backdrop
      style={{ backgroundColor: '#FFFFFF' }}
      revealed={revealed}
      backLayer={
        <View style={{ height: Dimensions.get('window').height + 100 }}>
          <View style={styles.pressable}>
            <Text style={styles.pressable_text}>
              <Icon name="wallet-outline" size={22} /> Ödeme
            </Text>
          </View>
          <ListItem
            title="Güncel Ödemeler"
            onPress={() => setPaymentStates('payments')}
          />
          <ListItem
            title="Geçmiş Ödemeler"
            onPress={() =>
              navigation.navigate('PastPaymentList', { orgID: item.orgID._id })
            }
          />
          <View style={styles.pressable}>
            <Text style={styles.pressable_text}>
              <Icon name="settings-outline" size={22} /> Ev Ayarları
            </Text>
          </View>
          <ListItem
            title="Üye İşlemleri"
            onPress={() => setSettingState('settings')}
          />
          <ListItem title="Period İşlemleri" />
        </View>
      }>
      <BackdropSubheader
        title={item.orgID.name}
        leading={<Icon name="home" size={22} />}
        center
        trailing={props => (
          <Icon
            name={'close'}
            {...props}
            onPress={() => setRevealed(prevState => !prevState)}
            {...props}
          />
        )}
      />
      {selectedtItem == 'settings' ? (
        <OrganizationSetting
          item={item}
          users={usersData.data}
          buttonTitle="Üye Ekle"
          labelOrgname="Organizasyon Adı: "
          lablelAddress="Adres: "
        />
      ) : selectedtItem == 'payments' ? (
        <PaymentTabView
          allPayments={allPayments}
          users={usersData.data}
          me={getMeData.data}
          orgID={orgID}
        />
      ) : selectedtItem == 'test' ? (
        <Text>Test-1</Text>
      ) : (
        <Text>Test-2</Text>
      )}
    </Backdrop>
  );
};

export default OrganizationProcess;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  pressable: {
    margin: 5,
    backgroundColor: '#ecf0f1',
    borderRadius: 20,
    justifyContent: 'center',
    height: 35,
  },
  pressable_text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
