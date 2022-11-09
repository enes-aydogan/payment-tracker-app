import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  Text,
  ListItem,
  Backdrop,
  BackdropSubheader,
} from '@react-native-material/core';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import store from '../../../store/store';
import Icon from 'react-native-vector-icons/Ionicons';
import * as AuhtAction from '../../../store/Actions/auth/AuthAction';
import PastPaymentsTabView from '../../../components/molecules/PastPaymentsTabView';
import * as OrgAction from '../../../store/Actions/organization/OrgAction';
import * as PaymentAction from '../../../store/Actions/payment/PaymentAction';
import * as PeriodAction from '../../../store/Actions/period/PeriodAction';

const PastPaymentList = ({ route }) => {
  const { orgID } = route.params;
  const [revealed, setRevealed] = useState('menu');
  const [pastPayments, setPastPayments] = useState([]);
  const [show, setShow] = useState(false);
  const [me, setMe] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedtItem, setSelectedtItem] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  const mockData = [
    { periodName: 'Test' },
    { periodName: 'Test' },
    { periodName: 'Test' },
  ];

  useEffect(() => {
    store.dispatch(PaymentAction.getAllPastPayments(orgID)).then(res => {
      setShow(true);
      setPastPayments(res.data);
    });
    store.dispatch(AuhtAction.getMe()).then(res => {
      setMe(res.data);
    });
    store.dispatch(OrgAction.getUsersByOrgID(orgID)).then(res => {
      setUsers(res.data);
    });
  }, []);

  function setPaymentStates(item) {
    setSelectedtItem(item);
    setIsSelected(true);
    setRevealed(!revealed);
  }

  return (
    <Backdrop
      style={{ backgroundColor: '#FFFFFF' }}
      revealed={revealed}
      backLayer={
        <SafeAreaView style={{ height: Dimensions.get('screen').height }}>
          <FlatList
            data={pastPayments.length == 0 ? mockData : pastPayments}
            renderItem={({ item }) => (
              <View>
                <ShimmerPlaceHolder
                  style={styles.image}
                  autoRun
                  visible={show}
                  LinearGradient={LinearGradient}>
                  <ListItem
                    title={item.periodName}
                    onPress={() => setPaymentStates(item)}
                  />
                </ShimmerPlaceHolder>
              </View>
            )}
          />
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
      <SafeAreaView style={{ height: 676 }}>
        {isSelected ? (
          <PastPaymentsTabView
            allPayments={selectedtItem}
            users={users}
            me={me}
          />
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
    height: Dimensions.get('window').height,
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
  image: {
    width: Dimensions.get('screen').width,
    height: 50,
  },
});
