import React, { useState, useEffect, useContext } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import {
  Text,
  HStack,
  Pressable,
  VStack,
  Box,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Flex,
  Surface,
  Divider,
  Stack,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../styles/metrics';
import { AuthContext } from '../../utils/AuthContext';
import { totalPayment, getOwnerName } from '../../utils/helpers';
import * as PeriodAction from '../../store/Actions/period/PeriodAction';
import * as PaymentAction from '../../store/Actions/payment/PaymentAction';

const PastPaymentsTabView = ({ allPayments, users, me, orgID }) => {
  const [index, setIndex] = React.useState(0);
  const [showPartners, setShowPartners] = useState(false);
  const [dialogData, setDialogData] = useState({});

  const {
    periodDispatch,
    periodState: {
      getSummary: { summaryData, summaryLoading, summaryError },
    },
    paymentDispatch,
    paymentState: {
      getOwnPastPayments: { paymentData, paymentLoading, paymentError },
      getOwnPastDebts: { debtData, debtLoading, debtError },
      getAllPastPaymentsByPerID: {
        allPastPaymentsByPerIDData,
        allPastPaymentsByPerIDLoading,
        allPastPaymentsByPerIDError,
      },
    },
  } = useContext(AuthContext);

  const [routes] = React.useState([
    { key: 'first', title: 'Tüm Ödemeler' },
    { key: 'second', title: 'Ödemelerim' },
    { key: 'third', title: 'Borçlarım' },
  ]);

  const mockOwnPaymentData = [
    { date: '', description: '', price: '' },
    { date: '', description: '', price: '' },
    { date: '', description: '', price: '' },
    { date: '', description: '', price: '' },
  ];

  useEffect(() => {
    PaymentAction.getOwnPastPayments(allPayments._id)(paymentDispatch);
    PaymentAction.getOwnPastDebts(allPayments._id)(paymentDispatch);
    PeriodAction.getSummary(allPayments._id)(periodDispatch);
    PaymentAction.getAllPastPaymentsByPerID(
      orgID,
      allPayments._id,
    )(paymentDispatch);
  }, [allPayments._id]);

  function openPartnerDialog(partnerPays, ownerID, date, price, description) {
    let model = {
      partnerPays: partnerPays,
      ownerID: ownerID,
      date: date,
      price: price,
      description: description,
    };
    setDialogData(model);
    setShowPartners(true);
  }

  const FirstRoute = () => (
    <Stack>
      <VStack
        style={{
          marginTop: 15,
          height: Dimensions.get('window').height - verticalScale(500),
        }}>
        <FlatList
          data={
            allPastPaymentsByPerIDLoading
              ? mockOwnPaymentData
              : allPastPaymentsByPerIDData.data
              ? allPastPaymentsByPerIDData.data[0].payments
              : allPastPaymentsByPerIDData
          }
          renderItem={({ item }) => (
            <View style={{}}>
              <ShimmerPlaceHolder
                style={styles.item}
                autoRun
                visible={!allPastPaymentsByPerIDLoading}
                LinearGradient={LinearGradient}>
                <Pressable
                  pressEffect="ripple"
                  pressEffectColor="white"
                  onPress={() => console.log('work press')}
                  style={styles.pressable}>
                  <HStack center fill spacing={20}>
                    <Box
                      style={{
                        marginLeft: horizontalScale(10),
                        width: horizontalScale(100),
                      }}>
                      <Text>{new Date(item.date).toLocaleString()}</Text>
                    </Box>
                    <Box style={{ width: horizontalScale(100) }}>
                      <Text>{item.description}</Text>
                    </Box>
                    <Box style={{ width: horizontalScale(45) }}>
                      <Text>{item.price + ' ₺'}</Text>
                    </Box>
                    <Box style={{ width: horizontalScale(35) }}>
                      <Icon
                        name="eye-outline"
                        onPress={() =>
                          openPartnerDialog(
                            item.partnerPays,
                            item.ownerID,
                            item.date,
                            item.price,
                            item.description,
                          )
                        }
                        size={moderateScale(24)}
                      />
                    </Box>
                  </HStack>
                </Pressable>
              </ShimmerPlaceHolder>
            </View>
          )}
        />
      </VStack>
      <Divider
        style={{ marginTop: verticalScale(20), margin: moderateScale(50) }}
      />
      <VStack>
        <Surface
          style={{
            backgroundColor: '#ecf0f1',
            margin: moderateScale(10),
            borderRadius: moderateScale(20),
            height: verticalScale(40),
            justifyContent: 'center',
          }}>
          <HStack center spacing={0} style={{}}>
            <Box
              style={{
                alignItems: 'flex-start',
              }}>
              <Text style={{ fontWeight: 'bold' }}>TOPLAM TUTAR: </Text>
            </Box>
            <Box
              style={{
                alignItems: 'flex-end',
                width: Dimensions.get('window').width / 2,
              }}>
              <Text style={{ fontWeight: 'bold' }}>
                {allPastPaymentsByPerIDLoading
                  ? ''
                  : allPastPaymentsByPerIDData.data
                  ? totalPayment(allPastPaymentsByPerIDData.data[0].payments)
                  : ''}{' '}
                ₺
              </Text>
            </Box>
          </HStack>
        </Surface>
        <Surface
          style={{
            backgroundColor: '#ecf0f1',
            margin: moderateScale(10),
            borderRadius: moderateScale(20),
            height: verticalScale(95),
            justifyContent: 'center',
          }}>
          <HStack center>
            <Text style={{ fontWeight: 'bold', fontSize: moderateScale(17) }}>
              Period Özeti
            </Text>
          </HStack>
          <HStack>
            <Box
              style={{
                marginLeft: horizontalScale(30),
                width: Dimensions.get('window').width - horizontalScale(175),
              }}>
              <Text style={{ fontWeight: 'bold' }}>Borçlu: </Text>
            </Box>
            <Box
              style={{
                maxWidth: Dimensions.get('window').width - horizontalScale(100),
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                {summaryLoading
                  ? ''
                  : summaryData.data
                  ? summaryData.data.payer
                  : ''}
              </Text>
            </Box>
          </HStack>
          <HStack>
            <Box
              style={{
                marginLeft: horizontalScale(30),
                width: Dimensions.get('window').width - horizontalScale(150),
              }}>
              <Text style={{ fontWeight: 'bold' }}>Alacaklı: </Text>
            </Box>
            <Box
              style={{
                maxWidth: Dimensions.get('window').width - horizontalScale(100),
              }}>
              <Text style={{ fontWeight: 'bold' }}>
                {summaryLoading
                  ? ''
                  : summaryData.data
                  ? summaryData.data.payee
                  : ''}
              </Text>
            </Box>
          </HStack>
          <HStack>
            <Box
              style={{
                marginLeft: horizontalScale(30),
                width: Dimensions.get('window').width - horizontalScale(150),
              }}>
              <Text style={{ fontWeight: 'bold' }}>Borç Miktarı: </Text>
            </Box>
            <Box
              style={{
                maxWidth: Dimensions.get('window').width - horizontalScale(100),
              }}>
              <Text style={{ fontWeight: 'bold' }}>
                {summaryLoading
                  ? ''
                  : summaryData.data
                  ? summaryData.data.price
                  : ''}{' '}
                ₺
              </Text>
            </Box>
          </HStack>
        </Surface>
      </VStack>
    </Stack>
  );

  const SecondRoute = () => {
    return (
      <Stack>
        <VStack
          style={{
            marginTop: 15,
            height: Dimensions.get('window').height - verticalScale(400),
          }}>
          <FlatList
            data={
              paymentLoading
                ? mockOwnPaymentData
                : paymentData.data
                ? paymentData.data[0].payments
                : paymentData
            }
            renderItem={({ item }) => (
              <View>
                <ShimmerPlaceHolder
                  style={styles.item}
                  autoRun
                  visible={!paymentLoading}
                  LinearGradient={LinearGradient}>
                  <Pressable
                    pressEffect="ripple"
                    pressEffectColor="white"
                    onPress={() => console.log('work press')}
                    style={styles.pressable}>
                    <HStack center fill spacing={20}>
                      <Box
                        style={{
                          marginLeft: horizontalScale(10),
                          width: horizontalScale(100),
                        }}>
                        <Text>{new Date(item.date).toLocaleString()}</Text>
                      </Box>
                      <Box style={{ width: horizontalScale(100) }}>
                        <Text>{item.description}</Text>
                      </Box>
                      <Box style={{ width: horizontalScale(45) }}>
                        <Text>{item.price + ' ₺'}</Text>
                      </Box>
                      <Box style={{ width: horizontalScale(35) }}>
                        <Icon
                          name="eye-outline"
                          onPress={() =>
                            openPartnerDialog(
                              item.partnerPays,
                              item.ownerID,
                              item.date,
                              item.price,
                              item.description,
                            )
                          }
                          size={moderateScale(24)}
                        />
                      </Box>
                    </HStack>
                  </Pressable>
                </ShimmerPlaceHolder>
              </View>
            )}
          />
        </VStack>
        <Divider
          style={{ marginTop: verticalScale(20), margin: moderateScale(50) }}
        />
        <VStack>
          <Surface
            style={{
              backgroundColor: '#ecf0f1',
              margin: moderateScale(10),
              borderRadius: moderateScale(20),
              height: verticalScale(50),
              justifyContent: 'center',
            }}>
            <HStack center spacing={140} style={{}}>
              <Text style={{ fontWeight: 'bold' }}>TOPLAM TUTAR: </Text>
              <ShimmerPlaceHolder
                autoRun
                visible={!paymentLoading}
                LinearGradient={LinearGradient}>
                <Text style={{ fontWeight: 'bold' }}>
                  {
                    paymentLoading
                      ? ''
                      : paymentData.data
                      ? totalPayment(paymentData.data[0].payments)
                      : '' //totalPayment(paymentData)
                  }{' '}
                  ₺
                </Text>
              </ShimmerPlaceHolder>
            </HStack>
          </Surface>
        </VStack>
      </Stack>
    );
  };

  const ThirdRoute = () => (
    <Stack>
      <VStack
        style={{
          marginTop: verticalScale(15),
          height: Dimensions.get('window').height - verticalScale(400),
        }}>
        <FlatList
          data={
            debtLoading
              ? mockOwnPaymentData
              : debtData.data
              ? debtData.data[0].debts
              : debtData.data
          }
          renderItem={({ item }) => (
            <View>
              <ShimmerPlaceHolder
                style={styles.item}
                autoRun
                visible={!debtLoading}
                LinearGradient={LinearGradient}>
                <Pressable
                  pressEffect="ripple"
                  pressEffectColor="white"
                  onPress={() => console.log('work press')}
                  style={styles.pressable}>
                  <HStack center fill spacing={20}>
                    <Box
                      style={{
                        marginLeft: horizontalScale(10),
                        width: horizontalScale(100),
                      }}>
                      <Text>{new Date(item.date).toLocaleString()}</Text>
                    </Box>
                    <Box style={{ width: horizontalScale(100) }}>
                      <Text>{item.description}</Text>
                    </Box>
                    <Box style={{ width: horizontalScale(45) }}>
                      <Text>{item.price + ' ₺'}</Text>
                    </Box>
                    <Box style={{ width: horizontalScale(35) }}>
                      <Icon
                        name="eye-outline"
                        onPress={() =>
                          openPartnerDialog(
                            item.partnerPays,
                            item.ownerID,
                            item.date,
                            item.price,
                            item.description,
                          )
                        }
                        size={moderateScale(24)}
                      />
                    </Box>
                  </HStack>
                </Pressable>
              </ShimmerPlaceHolder>
            </View>
          )}
        />
      </VStack>
      <Divider
        style={{ marginTop: verticalScale(20), margin: moderateScale(50) }}
      />
      <VStack>
        <Surface
          style={{
            backgroundColor: '#ecf0f1',
            margin: moderateScale(10),
            borderRadius: moderateScale(20),
            height: verticalScale(50),
            justifyContent: 'center',
          }}>
          <HStack center spacing={140} style={{}}>
            <Text style={{ fontWeight: 'bold' }}>TOPLAM TUTAR: </Text>
            <Text style={{ fontWeight: 'bold' }}>
              {debtLoading
                ? ''
                : debtData.data
                ? totalPayment(debtData.data[0].debts)
                : ''}{' '}
              ₺
            </Text>
          </HStack>
        </Surface>
      </VStack>
    </Stack>
  );

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({ route }) => (
              <Text style={{ color: 'black', margin: 8 }}>{route.title}</Text>
            )}
            style={{ backgroundColor: 'white' }}
            indicatorStyle={{ backgroundColor: 'black' }}
          />
        )}
        style={styles.container}
      />
      <Dialog visible={showPartners} onDismiss={() => setShowPartners(false)}>
        <DialogHeader title={new Date(dialogData.date).toLocaleString()} />
        <DialogContent>
          <Flex>
            <VStack spacing={5} style={{ maxHeight: verticalScale(300) }}>
              <HStack spacing={20}>
                <Text>Harcayan: </Text>
                <Text>{getOwnerName(dialogData.ownerID, users, me)}</Text>
              </HStack>
              <HStack spacing={24}>
                <Text>Harcama: </Text>
                <Text>{dialogData.description}</Text>
              </HStack>
              <HStack spacing={52}>
                <Text>Tutar: </Text>
                <Text>{dialogData.price} ₺</Text>
              </HStack>
              <Divider style={{ marginTop: verticalScale(7) }} />
              <HStack center>
                <Text center style={{ marginTop: verticalScale(10) }}>
                  Partnerler
                </Text>
              </HStack>
              <FlatList
                data={dialogData.partnerPays}
                renderItem={({ item }) => (
                  <Surface
                    style={{
                      backgroundColor: '#ecf0f1',
                      height: verticalScale(60),
                      borderRadius: moderateScale(15),
                      marginTop: verticalScale(7),
                    }}>
                    <View style={{ margin: moderateScale(10) }}>
                      <HStack>
                        <Text>İsim: </Text>
                        {getOwnerName(item.PartnerId, users, me)}
                      </HStack>
                      <HStack>
                        <Text>Pay: </Text>
                        <Text>{item.PartnerPrice}</Text>
                      </HStack>
                    </View>
                  </Surface>
                )}
              />
            </VStack>
          </Flex>
        </DialogContent>
        <DialogActions>
          <Button
            title="Kapat"
            compact
            color="black"
            variant="text"
            onPress={() => setShowPartners(false)}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PastPaymentsTabView;

const styles = StyleSheet.create({
  item: {
    borderRadius: moderateScale(15),
    marginVertical: verticalScale(3),
    marginHorizontal: horizontalScale(16),
    width: horizontalScale(345),
    height: verticalScale(75),
  },
  pressable: {
    width: '100%',
    height: verticalScale(75),
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(15),
    alignItems: 'flex-start',
  },
  title: {
    marginLeft: horizontalScale(15),
    fontSize: moderateScale(20),
  },
  pressable_text: {
    fontSize: moderateScale(12),
    width: '30%',
  },
});
