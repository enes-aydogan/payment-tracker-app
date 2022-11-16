import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import AboutScreen from '../scenes/about';
import StartOrgNavigator from './start-org-navigator';
import ListOrganizationsScreen from '../scenes/home/organization/organization_list';
import OrgProcessNavigator from './org-process-navigator';
import LogoutScreen from '../scenes/auth/logout';
const Tab = createBottomTabNavigator();

const AppNavigator = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName={'Start'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === 'Start') {
            iconName = focused ? 'home' : 'home';
          } else if (rn === 'About') {
            iconName = focused ? 'person-outline' : 'person-outline';
          } else if (rn == 'My Houses') {
            iconName = focused ? 'grid-outline' : 'grid-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Group>
        <Tab.Screen
          name="Start"
          component={StartOrgNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="My Houses"
          component={OrgProcessNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default AppNavigator;
