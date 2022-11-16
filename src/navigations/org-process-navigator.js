import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListOrganizationsScreen from '../scenes/home/organization/organization_list';
import OrganizationProcess from '../scenes/home/organization/organization_process';
import PastPaymentList from '../scenes/home/organization/past_payment_list';
import LogoutScreen from '../scenes/auth/logout';

const Stack = createNativeStackNavigator();

const OrgProcessNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="House List" component={ListOrganizationsScreen} />
      <Stack.Screen
        name="OrganizationProcess"
        component={OrganizationProcess}
      />
      <Stack.Screen name="PastPaymentList" component={PastPaymentList} />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
    </Stack.Navigator>
  );
};
export default OrgProcessNavigator;
