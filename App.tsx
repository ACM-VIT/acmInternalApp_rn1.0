import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './screens/OnboardingScreen';
import Loading from './screens/LoadingScreen';

//Push Notifications
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants'
import { Platform } from 'react-native';
import GlobalState,{IGlobalState} from './contexts/GlobalState';


const fetchFonts = () => {
  return Font.loadAsync({
  'billabong': require('./assets/fonts/Billabong.ttf'),
  });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [onboarding,setOnboarding] = useState(true);
  //push notifications logic 
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();
  const [globalState,setGlobalState] = useState<IGlobalState>({});
  const [fontLoaded,setFontLoaded] = useState(false);

  useEffect(() => {
    //AsyncStorage.clear();
    AsyncStorage.getItem('onboarding').then((val) => {
        if(val) setOnboarding(false);
    });

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token as React.SetStateAction<string>));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification as React.SetStateAction<any>);
      console.warn("yay push notification")
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      console.warn("push notfication yay");
    });

   
    if(expoPushToken) sendPushNotification(expoPushToken);


    return () => {
      Notifications.removeNotificationSubscription(notificationListener as any);
      Notifications.removeNotificationSubscription(responseListener as any);
    };
  }, []);

  useEffect(() => {
    // AsyncStorage.clear();
    AsyncStorage.getItem('onboarding').then((val) => {
      if(!val){
        AsyncStorage.setItem("onboarding","true");
      }
    });
       
   }, [onboarding]);





  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
          {fontLoaded &&<AppLoading startAsync={fetchFonts} onFinish={()=>setFontLoaded(true)}/>}
         <GlobalState.Provider value={[globalState,setGlobalState]}>
        {onboarding  && <Onboarding setOnboarding={setOnboarding} />}
        {!onboarding  && <Navigation colorScheme={colorScheme} />}
        </GlobalState.Provider>
        <StatusBar />
      </SafeAreaProvider>
     
    );
  }
}

//push Notificatios logic

async function sendPushNotification(expoPushToken:any) {
  console.log("fired");
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { data: 'goes here' },
  };
  try {

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}catch(err) {
  console.log(err);
}
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getDevicePushTokenAsync()).data;
    console.log(token);
    await AsyncStorage.setItem("fcm_token",token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
