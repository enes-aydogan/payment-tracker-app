import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import AboutScreen from '../scenes/about';
import StartOrgNavigator from './start-org-navigator';
import OrgProcessNavigator from './org-process-navigator';

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
            iconName = focused ? 'home' : 'home-outline';
            color = focused ? 'black' : '';
          } else if (rn === 'About') {
            iconName = focused ? 'person' : 'person-outline';
            color = focused ? 'black' : '';
          } else if (rn == 'My Houses') {
            iconName = focused ? 'grid' : 'grid-outline';
            color = focused ? 'black' : '';
          }

          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              style={{ marginTop: 10 }}
            />
          );
        },
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'black',
        tabBarStyle: { height: 90 },
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
