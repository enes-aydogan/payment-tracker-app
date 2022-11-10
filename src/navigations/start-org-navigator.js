import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../scenes/home';
import OrganizationListScreen from '../scenes/home/organization/organization_list';
import CreateOrganizationScreen from '../scenes/home/organization/create_organization';
import PaymentScreen from '../scenes/home/payment';

const Stack = createNativeStackNavigator();

const StartOrgNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="CreateOrganization"
        component={CreateOrganizationScreen}
      />
      <Stack.Screen
        name="ListOrganizations"
        component={OrganizationListScreen}
      />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};
export default StartOrgNavigator;
