import { View, FlatList } from 'react-native';
import React, { useState, useContext } from 'react';
import {
  Stack,
  TextInput,
  Button,
  Text,
  List,
  Box,
  ListItem,
  HStack,
  Flex,
  Surface,
  VStack,
} from '@react-native-material/core';
import * as OrgAction from '../../../store/Actions/organization/OrgAction';
import store from '../../../store/store';

const OrganizationDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const [users, setUsers] = useState([]);

  store.dispatch(OrgAction.getUsersByOrgID(item._id)).then(res => {
    setUsers(res.data);
  });

  function renderUsers() {
    return users.map((obj, index) => {
      const key = index;
      return (
        <Text key={key}>
          {obj.userID.firstName + ' ' + obj.userID.lastName}
        </Text>
      );
    });
  }
  return (
    <VStack spacing={5}>
      <Surface elevation={2} style={{ margin: 12, borderRadius: 10 }}>
        <Flex style={{ margin: 15, marginTop: 20 }}>
          <HStack spacing={5}>
            <Text variant="h7">Organizasyon Adı: </Text>
            <Text variant="h7">{item.name}</Text>
          </HStack>
          <HStack spacing={80} style={{ marginTop: 10, width: 250 }}>
            <Text variant="h7">Adres: </Text>
            <Text variant="h7">{item.address}</Text>
          </HStack>
          <HStack spacing={75} style={{ marginTop: 10, width: 250 }}>
            <Text variant="h7">Üyeler: </Text>
            <View>{renderUsers()}</View>
          </HStack>
          <Button
            style={{ margin: 40 }}
            onPress={() => setDialogVisible(true)}
            color="#717D84"
            variant="outlined"
            title={'Üye Ekle'}
          />
        </Flex>
      </Surface>
      <Surface elevation={2} style={{ margin: 12, borderRadius: 10 }}>
        <Text>asd</Text>
      </Surface>
    </VStack>
  );
};

export default OrganizationDetail;
