import React, { useContext, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import {
  Text,
  HStack,
  VStack,
  Pressable,
  Divider,
  Box,
  Surface,
} from '@react-native-material/core';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { AuthContext } from '../../utils/AuthContext';
import * as UserAction from '../../store/Actions/user/UserAction';
import { horizontalScale, verticalScale } from '../../styles/metrics';
import * as PaymentAction from '../../store/Actions/payment/PaymentAction';

const HomeScreen = ({ navigation }) => {
  const {
    paymentDispatch,
    paymentState: {
      getInfo: { data, loading, error },
    },
    userDispatch,
    userState: {
      getUserInfo: { userData, userLoading, userError },
    },
  } = useContext(AuthContext);

  const mockData = [{ orgName: 'Test', totalPayment: 100 }];

  const listMockData = [
    { orgName: 'Test' },
    { orgName: 'Test' },
    { orgName: 'Test' },
  ];

  useEffect(() => {
    UserAction.getUserInfo()(userDispatch);
    PaymentAction.getInfo()(paymentDispatch);
  }, []);

  return (
    <View style={{ margin: 5, marginTop: 5, backgroundColor: 'white' }}>
      <VStack spacing={10}>
        <Carousel
          data={
            userLoading
              ? mockData
              : userData.length < 1
              ? userData.data
              : userData.data.payments
          }
          renderItem={({ item }) => (
            <Surface
              elevation={8}
              style={{
                margin: 12,
                borderRadius: 10,
                height: 200,
                marginRight: 20,
              }}>
              <VStack spacing={30} center>
                <ShimmerPlaceHolder
                  style={{ height: 30, marginTop: 40, borderRadius: 10 }}
                  autoRun
                  visible={!userLoading}
                  LinearGradient={LinearGradient}>
                  <Text style={{ fontSize: 24 }}>{item.orgName}</Text>
                </ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  style={{ height: 25, borderRadius: 10 }}
                  autoRun
                  visible={!userLoading}
                  LinearGradient={LinearGradient}>
                  <Text style={{ fontSize: 24 }}>
                    Harcamam: {item.totalPayment}
                  </Text>
                </ShimmerPlaceHolder>
              </VStack>
            </Surface>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
        />
        <Divider style={{ marginTop: 15, flex: 1 }} leadingInset={16} />
        <VStack style={{ marginTop: 6, height: 600 }} center spacing={10}>
          <FlatList
            data={loading ? listMockData : data.data}
            renderItem={({ item }) => (
              <View style={{}}>
                <ShimmerPlaceHolder
                  style={styles.item}
                  autoRun
                  visible={!loading}
                  LinearGradient={LinearGradient}>
                  <Pressable
                    pressEffect="ripple"
                    pressEffectColor="white"
                    onPress={() =>
                      navigation.navigate('Payment', { item: item })
                    }
                    style={styles.pressable}>
                    <HStack center fill spacing={30}>
                      <Box style={{ width: '20%' }}>
                        <Icon
                          style={{ marginLeft: 15, alignItems: 'flex-start' }}
                          name="home-outline"
                          size={35}
                        />
                      </Box>
                      <Box style={{ width: '50%' }}>
                        <Text style={{ fontSize: 20 }}>{item.orgName}</Text>
                      </Box>
                      <Box style={{ width: '10%' }}>
                        <Icon
                          style={{ justifyContent: 'flex-end' }}
                          name="chevron-forward-outline"
                          size={35}
                        />
                      </Box>
                    </HStack>
                  </Pressable>
                </ShimmerPlaceHolder>
              </View>
            )}
          />
        </VStack>
      </VStack>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  item: {
    borderRadius: 25,
    marginVertical: 8,
    marginHorizontal: 16,
    width: horizontalScale(330),
    height: verticalScale(90),
  },
  pressable: {
    width: horizontalScale(330),
    height: verticalScale(90),
    backgroundColor: '#EAEAEA',
    borderRadius: 25,
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
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
