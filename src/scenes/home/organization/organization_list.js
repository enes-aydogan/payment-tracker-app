import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {ListItem, Stack} from '@react-native-material/core';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import store from '../../../store/store';
import {AuthContext} from '../../../utils/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import * as OrgAction from '../../../store/Actions/organization/OrgAction';
import * as PaymentAction from '../../../store/Actions/payment/PaymentAction';

const ListOrganizationsScreen = ({navigation}) => {
  const auth = useContext(AuthContext);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const mockData = [
    {orgID: {name: 'Test'}},
    {orgID: {name: 'Test'}},
    {orgID: {name: 'Test'}},
  ];

  const userID = auth.authState.user.id;  
  store.dispatch(OrgAction.getAllOrgs(userID)).then(res => {
    setShow(true);
    setData(res.data);
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={{height: 676}}
        data={data.length === undefined ? mockData : data}
        renderItem={({item}) => (
          <View>
            <ShimmerPlaceHolder
              style={styles.image}
              autoRun
              visible={show}
              LinearGradient={LinearGradient}>
              <ListItem
                title={item.orgID.name}
                leading={<Icon name="home-outline" size={22} />}
                onPress={() =>
                  navigation.navigate('OrganizationProcess', {item: item})
                }
              />
            </ShimmerPlaceHolder>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ListOrganizationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  image: {
    width: Dimensions.get('screen').width,
    height: 50,
  },
});