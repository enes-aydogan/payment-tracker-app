import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Text,
} from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { ListItem, Stack } from '@react-native-material/core';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { AuthContext } from '../../../utils/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import * as OrgAction from '../../../store/Actions/organization/OrgAction';

const ListOrganizationsScreen = ({ navigation }) => {
  const {
    orgDispatch,
    orgState: {
      getAllOrganizations: { data, loading, error },
    },
  } = useContext(AuthContext);

  const auth = useContext(AuthContext);

  const mockData = [
    { orgID: { name: 'Test' } },
    { orgID: { name: 'Test' } },
    { orgID: { name: 'Test' } },
  ];

  useEffect(() => {
    const userID = auth.authState.user.id;
    OrgAction.getAllOrgs(userID)(orgDispatch);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ height: 676 }}
        data={loading ? mockData : data.data}
        renderItem={({ item }) => (
          <View>
            <ShimmerPlaceHolder
              style={styles.image}
              autoRun
              visible={!loading}
              LinearGradient={LinearGradient}>
              <ListItem
                title={item.orgID.name}
                leading={<Icon name="home-outline" size={22} />}
                onPress={() =>
                  navigation.navigate('OrganizationProcess', { item: item })
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
