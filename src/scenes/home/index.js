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
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../styles/metrics';
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
    <View
      style={{
        margin: moderateScale(5),
        marginTop: verticalScale(0),
        backgroundColor: 'white',
      }}>
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
                margin: moderateScale(20),
                borderRadius: moderateScale(10),
                height: verticalScale(200),
                marginRight: horizontalScale(20),
              }}>
              <VStack spacing={30} center>
                <ShimmerPlaceHolder
                  style={{
                    height: verticalScale(40),
                    marginTop: verticalScale(40),
                    borderRadius: moderateScale(10),
                  }}
                  autoRun
                  visible={!userLoading}
                  LinearGradient={LinearGradient}>
                  <Text style={{ fontSize: moderateScale(24) }}>
                    {item.orgName}
                  </Text>
                </ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  style={{
                    height: verticalScale(35),
                    borderRadius: moderateScale(10),
                  }}
                  autoRun
                  visible={!userLoading}
                  LinearGradient={LinearGradient}>
                  <Text style={{ fontSize: moderateScale(24) }}>
                    Harcamam: {item.totalPayment}
                  </Text>
                </ShimmerPlaceHolder>
              </VStack>
            </Surface>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
        />
        <Divider
          style={{ marginTop: verticalScale(15), margin: moderateScale(10) }}
          leadingInset={16}
        />
        <VStack
          style={{ marginTop: verticalScale(6), height: verticalScale(600) }}
          center
          spacing={10}>
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
                          style={{
                            marginLeft: horizontalScale(15),
                            alignItems: 'flex-start',
                          }}
                          name="home-outline"
                          size={moderateScale(35)}
                        />
                      </Box>
                      <Box style={{ width: '50%' }}>
                        <Text style={{ fontSize: moderateScale(20) }}>
                          {item.orgName}
                        </Text>
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
    borderRadius: moderateScale(25),
    marginVertical: verticalScale(8),
    marginHorizontal: horizontalScale(16),
    width: horizontalScale(330),
    height: verticalScale(90),
  },
  pressable: {
    width: horizontalScale(330),
    height: verticalScale(90),
    backgroundColor: '#EAEAEA',
    borderRadius: moderateScale(25),
  },
  title: {
    marginLeft: horizontalScale(10),
    fontSize: moderateScale(20),
  },
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
});
