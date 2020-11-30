import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabFourParamList, TabOneParamList, TabThreeParamList, TabTwoParamList } from '../types';
import mockData from '../fetchRequests/feed'
import { UserType } from '../global';
import ProfilePicture from '../components/ProfileComponent';
import assets from '../constants/assets'

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors.currentTheme.tabsColor,style:{backgroundColor:Colors.currentTheme.bottomNavBackgroundColor,borderWidth:0,borderTopColor: Colors.currentTheme.bottomNavBackgroundColor,} }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
       <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
        <BottomTab.Screen
        name="TabFour"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  const [user,setUser] = React.useState<UserType>({
    name:"",
    username:"",
    profilePic:"", 
  });

  React.useEffect(() => {
    // get the current user
    const fetchUser = async () => {
     setUser(mockData[0]?.user)
    }
    fetchUser();
  }, [])
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
        animationEnabled: false ,
        headerRightContainerStyle: {
          marginRight: 15,
        },
        headerLeftContainerStyle: {
          marginLeft: 15,
        },
        headerTitle:" ",
        headerLeft: () => (
          <ProfilePicture size={40} image={assets.acmLogo}/>
        ),
        headerRight: () => (
          <ProfilePicture size={35} image={user?.profilePic} />
        ),
        headerStyle:{
          backgroundColor:Colors.currentTheme.topHeaderBackground,
        }
      }}
      />
    </HomeStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{}}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{}}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="TabFourScreen"
        component={TabThreeScreen}
        options={{}}
      />
    </TabFourStack.Navigator>
  );
}
