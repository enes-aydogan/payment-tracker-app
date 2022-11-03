import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {
  Text,
  ListItem,
  Backdrop,
  BackdropSubheader,
} from '@react-native-material/core';

import store from '../../../store/store';
import Icon from 'react-native-vector-icons/Ionicons';
import * as AuhtAction from '../../../store/Actions/auth/AuthAction';
import PaymentTabView from '../../../components/molecules/PaymentTabView';
import * as OrgAction from '../../../store/Actions/organization/OrgAction';
import * as PaymentAction from '../../../store/Actions/payment/PaymentAction';
import * as PeriodAction from '../../../store/Actions/period/PeriodAction';
import {horizontalScale, moderateScale, verticalScale} from '../../../styles/metrics'

const PastPaymentList = ({route}) => {
  const {orgID} = route.params;
  const [revealed, setRevealed] = useState('menu');
  const [pastPayments, setPastPayments] = useState([]);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedtItem, setSelectedtItem] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [ownPayments, setOwnPayments] = useState([]);
  const [ownDebt, setOwnDebt] = useState([]);
  const [summary, setSummary] = useState([]);

  store.dispatch(PaymentAction.getAllPastPayments(orgID)).then(res => {
    setPastPayments(res.data);
    setShow(false);
  });
  store.dispatch(AuhtAction.getMe()).then(res => {
    setMe(res.data);
  });
  store.dispatch(OrgAction.getUsersByOrgID(orgID)).then(res => {
    setUsers(res.data);
  });

  function setPaymentStates(item) {
    console.log("set payments")
    setSelectedtItem(item);
    setIsSelected(true);
    setLoading(true)
    setRevealed(!revealed);
    store.dispatch(PaymentAction.getOwnPastPayments(item._id)).then(res => {
      setOwnPayments(res.data);
    });
    store.dispatch(PaymentAction.getOwnPastDebt(item._id)).then(res => {
      setOwnDebt(res.data);
      console.log("set payments- owndebt final")
      setLoading(false)
    });
    store.dispatch(PeriodAction.getSummary(item._id)).then(res => {
      setSummary(res.data);
    });
  }

  return (
    <Backdrop
      style={{backgroundColor: '#FFFFFF'}}
      revealed={revealed}
      backLayer={
        <SafeAreaView style={{height: Dimensions.get('screen').height}}>
          {show ? (
            <View style={[styles.spinner, styles.horizontal]}>
              <ActivityIndicator
                size="large"
                visible={show}
                textContent={'Loading...'}
                style={styles.spinnerTextStyle}
              />
            </View>
          ) : (
            <FlatList
              data={pastPayments}
              renderItem={({item}) => (
                <ListItem
                  title={item.periodName}
                  onPress={() => setPaymentStates(item)}
                />
              )}
            />
          )}
        </SafeAreaView>
      }>
      <BackdropSubheader
        title={selectedtItem.periodName}
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
      <SafeAreaView style={{height: 676}}>
        {isSelected ? ( loading ? (
          <View style={[styles.spinner, styles.horizontal]}>
          <ActivityIndicator
            size="large"
            visible={show}
            textContent={'Loading...'}
            style={styles.spinnerTextStyle}
          />
        </View>
        ):(
          <PaymentTabView
            allPayments={selectedtItem}
            users={users}
            ownPayments={ownPayments}
            ownDebt={ownDebt}
            me={me}
            show={show}
            isPast={true}
            summary={summary}
          />
        )
        ) : (
          <View>
            <Text>Test</Text>
          </View>
        )}
      </SafeAreaView>
    </Backdrop>
  );
};

export default PastPaymentList;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
    height: Dimensions.get('window').height
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
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
});
