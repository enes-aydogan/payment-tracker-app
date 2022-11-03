import {
  View,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {
  Text,
  ListItem,
  Backdrop,
  BackdropSubheader,
  Pressable  
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';

import store from '../../../store/store';
import * as AuhtAction from '../../../store/Actions/auth/AuthAction';
import * as OrgAction from '../../../store/Actions/organization/OrgAction';
import * as PaymentAction from '../../../store/Actions/payment/PaymentAction';
import OrganizationSetting from '../../../components/molecules/OrganizationSetting';
import PaymentTabView from '../../../components/molecules/PaymentTabView';

const OrganizationProcess = ({route, navigation}) => {
  const {item} = route.params;
  const [revealed, setRevealed] = useState('menu');
  const [selectedtItem, setSelectedtItem] = useState('');
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState({});
  const [ownPayments, setOwnPayments] = useState([]);
  const [ownDebt, setOwnDebt] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [show, setShow] = useState(false);

  function setPaymentStates(type) {
    console.log("set payments precess")
    setShow(true);
    setSelectedtItem(type);
    setAllPayments(item.orgID.periods.slice(-1));

    store.dispatch(PaymentAction.getOwnPayments(item.orgID._id)).then(res => {
      setOwnPayments(res.data);
      console.log("set payments precess-own")
      setShow(false);
    });
    store.dispatch(PaymentAction.getOwnDebt()).then(res => {
      setOwnDebt(res.data);
    });

    store.dispatch(AuhtAction.getMe()).then(res => {
      setMe(res.data);
    });
    store.dispatch(OrgAction.getUsersByOrgID(item.orgID._id)).then(res => {
      setUsers(res.data);
    });
    setRevealed(prevState => !prevState);
  }
  //console.log(item.orgID.periods.slice(-1)[0].payments[0].partnerPays)
  // [{"PartnerId": "6346a155eeefa37c936365e2", "PartnerPrice": 50, "_id": "634ea09fef1ed44c3c311dd1"}]
  function setSettingState(type) {
    setShow(true);
    setSelectedtItem(type);
    setRevealed(prevState => !prevState);
    store.dispatch(OrgAction.getUsersByOrgID(item.orgID._id)).then(res => {
      setUsers(res.data);
      setShow(false);
    });
  }

  return (
    <Backdrop
      style={{backgroundColor: '#FFFFFF'}}
      revealed={revealed}
      backLayer={
        <View style={{height: Dimensions.get('window').height + 100}}>
          <View style={styles.pressable}>
            <Text style={styles.pressable_text}><Icon name="wallet-outline" size={22} /> Ödeme</Text>
          </View>
          <ListItem
            title="Güncel Ödemeler"
            onPress={() => setPaymentStates('payments')}
          />
          <ListItem
            title="Geçmiş Ödemeler"
            onPress={() =>
              navigation.navigate('PastPaymentList', {orgID: item.orgID._id})
            }
          />
          <View style={styles.pressable}>
            <Text style={styles.pressable_text}><Icon name="settings-outline" size={22} /> Ev Ayarları</Text>
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
        show ? (
          <View style={[styles.spinner, styles.horizontal]}>
            <ActivityIndicator
              size="large"
              visible={show}
              textContent={'Loading...'}
              style={styles.spinnerTextStyle}
            />
          </View>
        ) : (
          <OrganizationSetting
            item={item}
            users={users}
            buttonTitle="Üye Ekle"
            labelOrgname="Organizasyon Adı: "
            lablelAddress="Adres: "
          />
        )
      ) : selectedtItem == 'payments' ? (
        show ? (
          <View style={[styles.spinner, styles.horizontal]}>
            <ActivityIndicator
              size="large"
              visible={show}
              textContent={'Loading...'}
              style={styles.spinnerTextStyle}
            />
          </View>
        ) : (
          <PaymentTabView
            allPayments={allPayments}
            users={users}
            ownPayments={ownPayments}
            ownDebt={ownDebt}
            me={me}
            show={show}
          />
        )
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
    height: 35
  },
  pressable_text : {
    marginLeft: 10,
    fontSize: 16
  }
});
