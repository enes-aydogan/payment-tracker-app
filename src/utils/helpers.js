import { Text } from '@react-native-material/core';

export function totalPayment(payments) {
  let totalPrice = 0;
  let totalPartnerPrice = 0;

  payments.map((obj, index) => {
    totalPrice += obj.price;
    totalPartnerPrice += obj.partnerPays[0].PartnerPrice;
  });
  return totalPrice;
}

export function getOwnerName(partnerID, users, me) {
  return users.map((obj, index) => {
    if (obj.userID._id == partnerID) {
      return <Text key={index}>{obj.userID.firstName}</Text>;
    } else {
      return <Text key={index}>{me.firstName}</Text>;
    }
  });
}
