import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  ListItem,
  Backdrop,
  BackdropSubheader,
} from '@react-native-material/core';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../../utils/AuthContext';
import * as UserAction from '../../../store/Actions/user/UserAction';
import * as OrgAction from '../../../store/Actions/organization/OrgAction';
import * as PaymentAction from '../../../store/Actions/payment/PaymentAction';
import PastPaymentsTabView from '../../../components/molecules/PastPaymentsTabView';

const PastPaymentList = ({ route }) => {
  const { orgID } = route.params;
  const [revealed, setRevealed] = useState('menu');
  const [selectedtItem, setSelectedtItem] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  const {
    paymentDispatch,
    paymentState: {
      getAllPastPayments: {
        allPastPaymentsData,
        allPastPaymentsError,
        allPastPaymentsLoading,
      },
    },
    orgDispatch,
    orgState: {
      getUsersByOrgID: { usersData, usersError, usersLoading },
    },
    userDispatch,
    userState: {
      getMe: { getMeData, getMeError, getMeLoading },
    },
  } = useContext(AuthContext);

  const mockData = [
    { periodName: 'Test' },
    { periodName: 'Test' },
    { periodName: 'Test' },
  ];

  useEffect(() => {
    PaymentAction.getAllPastPayments(orgID)(paymentDispatch);
    UserAction.getMe()(userDispatch);
    OrgAction.getUsersByOrgID(orgID)(orgDispatch);
  }, []);

  return (
    <Backdrop
      style={{ backgroundColor: '#FFFFFF' }}
      revealed={revealed}
      backLayer={
        <SafeAreaView style={{ height: Dimensions.get('screen').height }}>
          <FlatList
            data={
              allPastPaymentsLoading && usersLoading && getMeLoading
                ? mockData
                : allPastPaymentsData.data
            }
            renderItem={({ item }) => (
              <View>
                <ShimmerPlaceHolder
                  style={styles.image}
                  autoRun
                  visible={!allPastPaymentsLoading}
                  LinearGradient={LinearGradient}>
                  <ListItem
                    title={item.periodName}
                    onPress={() => {
                      setSelectedtItem(item);
                      setIsSelected(true);
                      setRevealed(!revealed);
                    }}
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
            users={usersData.data}
            me={getMeData.data}
            orgID={orgID}
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
