import React, {useState, useContext} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  Text,
  Stack,
  HStack,
  VStack,
  Pressable,
  Divider,
  Box,
  Surface,
  Flex,
} from '@react-native-material/core';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import * as UserAction from '../../store/Actions/user/UserAction';
import * as PaymentAction from '../../store/Actions/payment/PaymentAction';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../styles/metrics';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [show, setShow] = useState(false);
  
  const mockData = [{orgName: 'Test', totalPayment: 100}];
  const listMockData = [{orgName: 'Test'},{orgName: 'Test'},{orgName: 'Test'}]
  

  store.dispatch(UserAction.getUserInfo()).then(res => {
    setCarouselData(res.data);
  });

  store.dispatch(PaymentAction.getInfo()).then(res => {
    setShow(true);
    setData(res.data);
  });

  return (
    <View style={{margin: 5, marginTop: 5, backgroundColor: 'white'}}>
      <VStack spacing={10}>
        <Carousel
          data={
            carouselData.payments == undefined
              ? mockData
              : carouselData.payments
          }
          renderItem={({item}) => (
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
                  style={{height: 30, marginTop: 40, borderRadius: 10}}
                  autoRun
                  visible={show}
                  LinearGradient={LinearGradient}>
                  <Text style={{fontSize: 24}}>{item.orgName}</Text>
                </ShimmerPlaceHolder>
                <ShimmerPlaceHolder
                  style={{height: 25, borderRadius: 10}}
                  autoRun
                  visible={show}
                  LinearGradient={LinearGradient}>
                  <Text style={{fontSize: 24}}>
                    Harcamam: {item.totalPayment}
                  </Text>
                </ShimmerPlaceHolder>
              </VStack>
            </Surface>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
        />
        <Divider style={{marginTop: 15, flex: 1}} leadingInset={16} />
        <VStack style={{marginTop: 6, height: 600}} center spacing={10}>
          <FlatList
            data={data.length == undefined ? listMockData : data}
            renderItem={({item}) => (
              <View style={{}}>
                  <ShimmerPlaceHolder      
                    style={styles.item}                            
                    autoRun
                    visible={show}
                    LinearGradient={LinearGradient}>
                  <Pressable
                    pressEffect="ripple"
                    pressEffectColor="white"
                    onPress={() => navigation.navigate('Payment', {item: item})}
                    style={styles.pressable}>
                    <HStack center fill spacing={30}>
                      <Box style={{width: '20%'}}>
                        <Icon
                          style={{marginLeft: 15, alignItems: 'flex-start'}}
                          name="home-outline"
                          size={35}
                        />
                      </Box>
                      <Box style={{width: '50%'}}>
                        <Text style={{fontSize: 20}}>{item.orgName}</Text>
                      </Box>
                      <Box style={{width: '10%'}}>
                        <Icon
                          style={{justifyContent: 'flex-end'}}
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

/**
 * return show ? (
    <View style={[styles.spinner, styles.horizontal]}>
      <ActivityIndicator
        size="large"
        visible={show}
        textContent={'Loading...'}
        style={styles.spinnerTextStyle}
      />
    </View>
  ) : (
    //#F9F9F9
    <View style={{margin: 5, marginTop: 5, backgroundColor: 'white'}}>
      <VStack spacing={10}>
        <Carousel
          data={carouselData.payments}
          renderItem={({item}) => (
            <Surface
              elevation={8}
              style={{
                margin: 12,
                borderRadius: 10,
                height: 200,
                marginRight: 20,
              }}>
              <VStack center>
                <Text style={{marginTop: 40, fontSize: 24}}>
                  {item.orgName}
                </Text>
                <Text style={{marginTop: 40, fontSize: 24}}>
                  Harcamam: {item.totalPayment}
                </Text>
              </VStack>
            </Surface>
          )}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
        />
        <Divider style={{marginTop: 15, flex: 1}} leadingInset={16} />        
        <VStack style={{marginTop: 6, height: 600}} center spacing={10}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Pressable
                  pressEffect="ripple"
                  pressEffectColor="white"
                  onPress={() => navigation.navigate('Payment', {item: item})}
                  style={styles.pressable}>
                  <HStack center fill spacing={30}>
                    <Box style={{width: '20%'}}>
                      <Icon
                        style={{marginLeft: 15, alignItems: 'flex-start'}}
                        name="home-outline"
                        size={35}
                      />
                    </Box>
                    <Box style={{width: '50%'}}>
                      <Text style={{fontSize: 20}}>{item.orgName}</Text>
                    </Box>
                    <Box style={{width: '10%'}}>
                      <Icon
                        style={{justifyContent: 'flex-end'}}
                        name="chevron-forward-outline"
                        size={35}
                      />
                    </Box>
                  </HStack>
                </Pressable>
              </View>
            )}
          />
        </VStack>
      </VStack>
    </View>
  );
};
 */
