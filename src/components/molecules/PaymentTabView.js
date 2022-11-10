import React, { useState, useContext, useEffect } from 'react';
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
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../styles/metrics';
import { AuthContext } from '../../utils/AuthContext';
import * as PaymentAction from '../../store/Actions/payment/PaymentAction';
import * as UserAction from '../../store/Actions/user/UserAction';
import * as OrgAction from '../../store/Actions/organization/OrgAction';
import { totalPayment, getOwnerName } from '../../utils/helpers';

const PaymentTabView = ({ allPayments, users, me, orgID }) => {
  const [index, setIndex] = React.useState(0);
  const [showPartners, setShowPartners] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const {
    orgDispatch,
    orgState: {
      getUsersByOrgID: { usersData, usersError, usersLoading },
    },
    paymentDispatch,
    paymentState: {
      getOwnPayments: { paymentData, paymentError, paymentLoading },
      getOwnDebts: { debtData, debtError, debtLoading },
      getActivePeriod: {
        activePeriodData,
        activePeriodError,
        activePeriodLoading,
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
    PaymentAction.getOwnPayments(orgID)(paymentDispatch);
    PaymentAction.getOwnDebt()(paymentDispatch);
    OrgAction.getUsersByOrgID(orgID)(orgDispatch);
    PaymentAction.getActivePeriod(orgID)(paymentDispatch);
  }, []);

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
          height: Dimensions.get('window').height - 400,
        }}>
        <FlatList
          data={
            activePeriodLoading
              ? mockOwnPaymentData
              : activePeriodData.data
              ? activePeriodData.data[0].payments
              : activePeriodData.data
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
                        marginLeft: 10,
                        width: 100,
                      }}>
                      <Text>{new Date(item.date).toLocaleString()}</Text>
                    </Box>
                    <Box style={{ width: 100 }}>
                      <Text>{item.description}</Text>
                    </Box>
                    <Box style={{ width: 55 }}>
                      <Text>{item.price + ' ₺'}</Text>
                    </Box>
                    <Box style={{ width: 25 }}>
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
                        size={24}
                      />
                    </Box>
                  </HStack>
                </Pressable>
              </ShimmerPlaceHolder>
            </View>
          )}
        />
      </VStack>
      <Divider style={{ marginTop: 20, margin: 50 }} />
      <VStack>
        <Surface
          style={{
            backgroundColor: '#ecf0f1',
            margin: 10,
            borderRadius: 20,
            height: 50,
            justifyContent: 'center',
          }}>
          <HStack center spacing={140} style={{}}>
            <Text style={{ fontWeight: 'bold' }}>TOPLAM TUTAR: </Text>
            <Text style={{ fontWeight: 'bold' }}>
              {totalPayment(allPayments[0].payments)} ₺
            </Text>
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
            height: Dimensions.get('window').height - 400,
          }}>
          <FlatList
            data={
              paymentLoading
                ? mockOwnPaymentData
                : paymentData.data
                ? paymentData.data.paymentList
                : paymentData.data
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
                          marginLeft: 10,
                          width: 100,
                        }}>
                        <Text>{new Date(item.date).toLocaleString()}</Text>
                      </Box>
                      <Box style={{ width: 100 }}>
                        <Text>{item.description}</Text>
                      </Box>
                      <Box style={{ width: 55 }}>
                        <Text>{item.price + ' ₺'}</Text>
                      </Box>
                      <Box style={{ width: 25 }}>
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
                          size={24}
                        />
                      </Box>
                    </HStack>
                  </Pressable>
                </ShimmerPlaceHolder>
              </View>
            )}
          />
        </VStack>
        <Divider style={{ marginTop: 20, margin: 50 }} />
        <VStack>
          <Surface
            style={{
              backgroundColor: '#ecf0f1',
              margin: 10,
              borderRadius: 20,
              height: 50,
              justifyContent: 'center',
            }}>
            <HStack center spacing={140} style={{}}>
              <Text style={{ fontWeight: 'bold' }}>TOPLAM TUTAR: </Text>
              <Text style={{ fontWeight: 'bold' }}>
                {paymentLoading
                  ? ''
                  : paymentData.data
                  ? totalPayment(paymentData.data.paymentList)
                  : ''}{' '}
                ₺
              </Text>
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
          marginTop: 15,
          height: Dimensions.get('window').height - 400,
        }}>
        <FlatList
          data={debtLoading ? mockOwnPaymentData : debtData.data}
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
                        marginLeft: 10,
                        width: 100,
                      }}>
                      <Text>{new Date(item.date).toLocaleString()}</Text>
                    </Box>
                    <Box style={{ width: 100 }}>
                      <Text>{item.description}</Text>
                    </Box>
                    <Box style={{ width: 55 }}>
                      <Text>{item.price + ' ₺'}</Text>
                    </Box>
                    <Box style={{ width: 25 }}>
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
                        size={24}
                      />
                    </Box>
                  </HStack>
                </Pressable>
              </ShimmerPlaceHolder>
            </View>
          )}
        />
      </VStack>
      <Divider style={{ marginTop: 20, margin: 50 }} />
      <VStack>
        <Surface
          style={{
            backgroundColor: '#ecf0f1',
            margin: 10,
            borderRadius: 20,
            height: 50,
            justifyContent: 'center',
          }}>
          <HStack center spacing={140} style={{}}>
            <Text style={{ fontWeight: 'bold' }}>TOPLAM TUTAR: </Text>
            <Text style={{ fontWeight: 'bold' }}>
              {debtLoading
                ? ''
                : debtData.data
                ? totalPayment(debtData.data)
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
        initialLayout={{
          width: Dimensions.get('window').width,
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({ route }) => (
              <Text
                style={{
                  color: 'black',
                  margin: 8,
                }}>
                {route.title}
              </Text>
            )}
            style={{ backgroundColor: 'white' }}
            indicatorStyle={{
              backgroundColor: 'black',
            }}
          />
        )}
        style={styles.container}
      />
      <Dialog visible={showPartners} onDismiss={() => setShowPartners(false)}>
        <DialogHeader title={new Date(dialogData.date).toLocaleString()} />
        <DialogContent>
          <Flex>
            <VStack spacing={5} style={{ maxHeight: 300 }}>
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
              <Divider style={{ marginTop: 7 }} />
              <HStack center>
                <Text center style={{ marginTop: 10 }}>
                  Partnerler
                </Text>
              </HStack>
              <FlatList
                data={dialogData.partnerPays}
                renderItem={({ item }) => (
                  <Surface
                    style={{
                      backgroundColor: '#ecf0f1',
                      height: 60,
                      borderRadius: 15,
                      marginTop: 7,
                    }}>
                    <View style={{ margin: 10 }}>
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

export default PaymentTabView;

const styles = StyleSheet.create({
  item: {
    borderRadius: 15,
    marginVertical: 3,
    marginHorizontal: 16,
    width: horizontalScale(345),
    height: verticalScale(75),
    /*  borderRadius: 15,
    marginVertical: 3,
    marginHorizontal: 16,
 */
  },
  pressable: {
    width: '100%',
    height: 75,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    alignItems: 'flex-start',
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
  },
  pressable_text: {
    fontSize: 12,
    width: '30%',
  },
});
