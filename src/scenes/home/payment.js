import { View, Alert, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import {
  TextInput,
  Button,
  Text,
  VStack,
  Surface,
  Flex,
  ActivityIndicator,
} from '@react-native-material/core';
import MultiSelect from 'react-native-multiple-select';

import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../styles/metrics';
import * as PaymentAction from '../../store/Actions/payment/PaymentAction';
import { AuthContext } from '../../utils/AuthContext';

const PaymentScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [selectedItems, setSelectedItems] = useState([]);

  const {
    paymentDispatch,
    paymentState: {
      createPayment: {
        createPaymentData,
        createPaymentError,
        createPaymentLoading,
      },
    },
  } = useContext(AuthContext);

  const onSelectedItemsChange = selectedItems => {
    setSelectedItems(selectedItems);
  };

  const clearForm = _ => {
    setPrice('');
    setDescription('');
    setSelectedItems([]);
  };

  const payment = async () => {
    let payment = {
      description: description,
      price: price,
      stuffIDs: selectedItems.join(','),
    };

    PaymentAction.create(payment, item.orgID)(paymentDispatch)(res => {
      if (res.success) {
        Alert.alert('Başarılı', 'Harcama başarıyla kayıt edilmiştir.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert('Hata', 'Harcama kayıt işlemi başarısız olmuştur.', [
          {
            text: 'OK',
            onPress: () => clearForm(),
          },
        ]);
      }
    });
  };

  return (
    <View>
      <Surface
        elevation={2}
        style={{ margin: moderateScale(12), borderRadius: moderateScale(10) }}>
        <VStack
          spacing={2}
          style={{ margin: moderateScale(20), marginTop: verticalScale(30) }}>
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
            style={{ marginTop: verticalScale(20) }}
            value={price}
            onChangeText={text => setPrice(text)}
          />
        </VStack>
      </Surface>
      <Surface
        elevation={2}
        style={{
          margin: moderateScale(12),
          borderRadius: moderateScale(10),
          minHeight: horizontalScale(225),
        }}>
        <Flex center>
          <Text
            style={{ marginTop: verticalScale(20), margin: moderateScale(10) }}>
            Hesap Ortakları
          </Text>
        </Flex>
        <View
          style={{
            margin: moderateScale(10),
            borderRadius: moderateScale(10),
          }}>
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
            searchInputStyle={{ color: '#717D84' }}
            hideSubmitButton
          />
        </View>
      </Surface>
      <Button
        style={{ margin: moderateScale(20) }}
        onPress={() => payment()}
        color="#717D84"
        variant="outlined"
        title={'Harcamayı Kaydet'}
        loading={createPaymentLoading}
        disabled={createPaymentLoading}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
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
