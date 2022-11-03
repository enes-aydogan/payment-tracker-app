import React, {useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
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
import {horizontalScale, moderateScale,verticalScale} from '../../styles/metrics'

const PaymentTabView = ({
  allPayments,
  users,
  ownPayments,
  me,
  ownDebt,
  isPast = false,
  summary = [],
}) => {
  const [index, setIndex] = React.useState(0);
  const [showPartners, setShowPartners] = useState(false);
  const [dialogData, setDialogData] = useState({});

  const [routes] = React.useState([
    {key: 'first', title: 'Tüm Ödemeler'},
    {key: 'second', title: 'Ödemelerim'},
    {key: 'third', title: 'Borçlarım'},
  ]);
  console.log("user: ",users)
  function getOwnerName(partnerID) {
    return users.map((obj, index) => {
      if (obj.userID._id == partnerID) {
        return <Text key={index}>{obj.userID.firstName}</Text>;
      } else {
        return <Text key={index}>{me.firstName}</Text>;
      }
    });
  }

  function totalPayment(payments) {
    let totalPrice = 0;
    let totalPartnerPrice = 0;

    payments.map((obj, index) => {
      totalPrice += obj.price;
      totalPartnerPrice += obj.partnerPays[0].PartnerPrice;
    });
    return totalPrice;
  }

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
        style={
          isPast
            ? {marginTop: 15, height: Dimensions.get('window').height - 500}
            : {marginTop: 15, height: Dimensions.get('window').height - 400}
        }>
        <FlatList
          data={isPast ? allPayments.payments : allPayments[0].payments}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Pressable
                pressEffect="ripple"
                pressEffectColor="white"
                onPress={() => console.log('work press')}
                style={styles.pressable}>
                <HStack center fill spacing={20}>
                  <Box style={{marginLeft: 10, width: 100}}>
                    <Text>{new Date(item.date).toLocaleString()}</Text>
                  </Box>
                  <Box style={{width: 100}}>
                    <Text>{item.description}</Text>
                  </Box>
                  <Box style={{width: 55}}>
                    <Text>{item.price + ' ₺'}</Text>
                  </Box>
                  <Box style={{width: 25}}>
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
            </View>
          )}
        />
      </VStack>
      <Divider style={{marginTop: 20, margin: 50}} />
      {isPast ? (
        <VStack>
          <Surface
            style={{
              backgroundColor: '#ecf0f1',
              margin: 10,
              borderRadius: 20,
              height: verticalScale(40),
              justifyContent: 'center',
            }}>
            <HStack center spacing={140} style={{}}>
              <Text style={{fontWeight: 'bold'}}>TOPLAM TUTAR: </Text>
              <Text style={{fontWeight: 'bold'}}>
                {totalPayment(
                  isPast ? allPayments.payments : allPayments[0].payments,
                )}{' '}
                ₺
              </Text>
            </HStack>
          </Surface>
          <Surface
            style={{
              backgroundColor: '#ecf0f1',
              margin: 10,
              borderRadius: 20,
              height: verticalScale(95),
              justifyContent: 'center',
            }}>
            <HStack center>
              <Text style={{fontWeight: 'bold', fontSize: 17}}>
                Period Özeti
              </Text>
            </HStack>
            <HStack>
              <Box
                style={{
                  marginLeft: 30,
                  width: Dimensions.get('window').width - 150,
                }}>
                <Text style={{fontWeight: 'bold'}}>Borçlu: </Text>
              </Box>
              <Box style={{maxWidth: Dimensions.get('window').width - 100}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                  }}>
                  {summary.payer}
                </Text>
              </Box>
            </HStack>
            <HStack>
              <Box
                style={{
                  marginLeft: 30,
                  width: Dimensions.get('window').width - 150,
                }}>
                <Text style={{fontWeight: 'bold'}}>Alacaklı: </Text>
              </Box>
              <Box style={{maxWidth: Dimensions.get('window').width - 100}}>
                <Text style={{fontWeight: 'bold'}}>{summary.payee}</Text>
              </Box>
            </HStack>
            <HStack>
              <Box
                style={{
                  marginLeft: 30,
                  width: Dimensions.get('window').width - 150,
                }}>
                <Text style={{fontWeight: 'bold'}}>Borç Miktarı: </Text>
              </Box>
              <Box style={{maxWidth: Dimensions.get('window').width - 100}}>
                <Text style={{fontWeight: 'bold'}}>{summary.price} ₺</Text>
              </Box>
            </HStack>
          </Surface>
        </VStack>
      ) : (
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
              <Text style={{fontWeight: 'bold'}}>TOPLAM TUTAR: </Text>
              <Text style={{fontWeight: 'bold'}}>
                {totalPayment(
                  isPast ? allPayments.payments : allPayments[0].payments,
                )}{' '}
                ₺
              </Text>
            </HStack>
          </Surface>
        </VStack>
      )}
    </Stack>
  );

  const SecondRoute = () => {
    console.log("second route wokr")
    return (
      <Stack>
        <VStack
          style={{marginTop: 15, height: Dimensions.get('window').height - 400}}>
          <FlatList
            data={isPast ? ownPayments[0].payments : ownPayments.paymentList}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Pressable
                  pressEffect="ripple"
                  pressEffectColor="white"
                  onPress={() => console.log('work press')}
                  style={styles.pressable}>
                  <HStack center fill spacing={20}>
                    <Box style={{marginLeft: 10, width: 100}}>
                      <Text>{new Date(item.date).toLocaleString()}</Text>
                    </Box>
                    <Box style={{width: 100}}>
                      <Text>{item.description}</Text>
                    </Box>
                    <Box style={{width: 55}}>
                      <Text>{item.price + ' ₺'}</Text>
                    </Box>
                    <Box style={{width: 25}}>
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
              </View>
            )}
          />
        </VStack>
        <Divider style={{marginTop: 20, margin: 50}} />
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
              <Text style={{fontWeight: 'bold'}}>TOPLAM TUTAR: </Text>
              <Text style={{fontWeight: 'bold'}}>
                {totalPayment(
                  isPast ? ownPayments[0].payments : ownPayments.paymentList,
                )}{' '}
                ₺
              </Text>
            </HStack>
          </Surface>
        </VStack>
      </Stack>
    );
  }

  const ThirdRoute = () => (
    <Stack>
      <VStack
        style={{marginTop: 15, height: Dimensions.get('window').height - 400}}>
        <FlatList
          data={isPast ? ownDebt[0].debts : ownDebt}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Pressable
                pressEffect="ripple"
                pressEffectColor="white"
                onPress={() => console.log('work press')}
                style={styles.pressable}>
                <HStack center fill spacing={20}>
                  <Box style={{marginLeft: 10, width: 100}}>
                    <Text>{new Date(item.date).toLocaleString()}</Text>
                  </Box>
                  <Box style={{width: 100}}>
                    <Text>{item.description}</Text>
                  </Box>
                  <Box style={{width: 55}}>
                    <Text>{item.price + ' ₺'}</Text>
                  </Box>
                  <Box style={{width: 25}}>
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
            </View>
          )}
        />
      </VStack>
      <Divider style={{marginTop: 20, margin: 50}} />
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
            <Text style={{fontWeight: 'bold'}}>TOPLAM TUTAR: </Text>
            <Text style={{fontWeight: 'bold'}}>
              {totalPayment(
                isPast ? ownDebt[0].debts : ownDebt,
              )}{' '}
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
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={({route}) => (
              <Text style={{color: 'black', margin: 8}}>{route.title}</Text>
            )}
            style={{backgroundColor: 'white'}}
            indicatorStyle={{backgroundColor: 'black'}}
          />
        )}
        style={styles.container}
      />
      <Dialog visible={showPartners} onDismiss={() => setShowPartners(false)}>
        <DialogHeader title={new Date(dialogData.date).toLocaleString()} />
        <DialogContent>
          <Flex>
            <VStack spacing={5} style={{maxHeight: 300}}>
              <HStack spacing={20}>
                <Text>Harcayan: </Text>
                <Text>{getOwnerName(dialogData.ownerID)}</Text>
              </HStack>
              <HStack spacing={24}>
                <Text>Harcama: </Text>
                <Text>{dialogData.description}</Text>
              </HStack>
              <HStack spacing={52}>
                <Text>Tutar: </Text>
                <Text>{dialogData.price} ₺</Text>
              </HStack>
              <Divider style={{marginTop: 7}} />
              <HStack center>
                <Text center style={{marginTop: 10}}>
                  Partnerler
                </Text>
              </HStack>
              <FlatList
                data={dialogData.partnerPays}
                renderItem={({item}) => (
                  <Surface
                    style={{
                      backgroundColor: '#ecf0f1',
                      height: 60,
                      borderRadius: 15,
                      marginTop: 7,
                    }}>
                    <View style={{margin: 10}}>
                      <HStack>
                        <Text>İsim: </Text>
                        {getOwnerName(item.PartnerId)}
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