import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './screens/OnboardingScreen';
import Loading from './screens/LoadingScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [onboarding,setOnboarding] = useState(true);

  useEffect(() => {
    AsyncStorage.clear();
  
    AsyncStorage.getItem('onboarding').then((val) => {
        if(val) setOnboarding(false);
    });
  }, []);

  useEffect(() => {
    // AsyncStorage.clear();
    AsyncStorage.getItem('onboarding').then((val) => {
      if(!val){
        AsyncStorage.setItem("onboarding","false");
      }
    });
       
   }, [onboarding]);





  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {onboarding  && <Onboarding setOnboarding={setOnboarding} />}
        {!onboarding  && <Navigation colorScheme={colorScheme} />}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
