import {View, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  TextInput,
  Button,
  Text,
  VStack,
  Surface,
  Flex,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import MultiSelect from 'react-native-multiple-select';

import store from '../../store/store';
import * as PaymentAction from '../../store/Actions/payment/PaymentAction';

const PaymentScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedItemsChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  const payment = async () => {
    let payment = {
      description: description,
      price: price,
      stuffIDs: selectedItems.join(','),
    };

    store.dispatch(PaymentAction.create(payment, item.orgID)).then(res => {
      if (res && res.success) {
        Alert.alert('Başarılı', 'Harcama başarıyla kayıt edilmiştir.');
      } else {
        Alert.alert('Hata', 'Harcama kayıt işlemi başarısız olmuştur.');
      }
    });
  };

  return (
    <View style={{}}>
      <Surface elevation={2} style={{margin: 12, borderRadius: 10}}>
        <VStack spacing={2} style={{margin: 20, marginTop: 30}}>
          <TextInput
            color="#717D84"
            variant="filled"
            label="Açıklama"
            value={description}
            onChangeText={text => setDescription(text)}
            autoCapitalize="none"
          />
          <TextInput
            color="#717D84"
            variant="filled"
            label="Ücret"
            style={{marginTop: 20}}
            value={price}
            onChangeText={text => setPrice(text)}
          />
        </VStack>
      </Surface>
      <Surface
        elevation={2}
        style={{margin: 12, borderRadius: 10, minHeight: 225}}>
        <Flex center>
          <Text style={{marginTop: 20, margin: 10}}>Hesap Ortakları</Text>
        </Flex>
        <View style={{margin: 10, borderRadius: 10}}>
          <MultiSelect
            items={item.users}
            uniqueKey="userID"
            onSelectedItemsChange={onSelectedItemsChange}
            selectText="Kullanıcı seçin"
            searchInputPlaceholderText="Kullanıcı ara..."
            onChangeInput={text => console.log(text)}
            selectedItems={selectedItems}
            tagRemoveIconColor="#717D84"
            tagBorderColor="#717D84"
            tagTextColor="#717D84"
            selectedItemTextColor="#717D84"
            selectedItemIconColor="#717D84"
            itemTextColor="#000"
            displayKey="firstName"
            searchInputStyle={{color: '#717D84'}}
            hideSubmitButton
          />
        </View>
      </Surface>
      <Button
        style={{margin: 20}}
        onPress={() => payment()}
        color="#717D84"
        variant="outlined"
        title={'Harcamayı Kaydet'}></Button>
    </View>
  );
};

export default PaymentScreen;
