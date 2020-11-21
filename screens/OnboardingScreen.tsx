import React, { useRef, useState } from 'react';
import { View,Image } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Page from '../components/OnboardingComp/Page';
import Footer from '../components/OnboardingComp/Footer';
import { GenericFunc } from '../global';
import Colors  from '../constants/Colors';
import GoogleSignIn from '../components/Google SignIn'
import assets from '../constants/assets'
import DiscordSigninPage from '../components/DiscordSigninPage';


export type OnboardingParams = {
  setOnboarding:GenericFunc,
}

const Onboarding = ({setOnboarding}:OnboardingParams) => {
  const pagerRef = useRef<ViewPager>(null);
  const [googleSignin,googleSigninStatus] = useState(false);
  const [discordSignin,discordSigninStatus] = useState(false);

  const handlePageChange = (pageNumber:number) => {
    if(pagerRef.current)
      pagerRef.current.setPage(pageNumber);
  };
  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} ref={pagerRef}>
        <View key="1">
          <Image resizeMode="cover" source={{uri:assets.onboarding_screen1}} style={{flex:1}}/>
          <GoogleSignIn handlePageChange={handlePageChange} googleSigninStatus={googleSigninStatus}/>
          {googleSignin &&  <Footer
            backgroundColor={Colors.currentTheme.onboarding.bgMain}
            leftButtonLabel="Next"
            leftButtonPress={() => {
              handlePageChange(1);
            }}
          />  }
            
        </View>
        <View key="2">
        <Image resizeMode="cover" source={{uri:assets.onboarding_screen1}} style={{flex:1}}/>
          <DiscordSigninPage setOnboarding={setOnboarding}  discordSigninStatus={discordSigninStatus} handlePageChange={handlePageChange}/>
          { discordSignin && <Footer
            backgroundColor={Colors.currentTheme.onboarding.bgMain}
            rightButtonLabel="Previous"
            rightButtonPress={() => handlePageChange(0)}
            leftButtonLabel="Finish"
            leftButtonPress={() => {
              setOnboarding(false);
            }}
          />}
        </View>
      </ViewPager>
    </View>
  );
};
export default Onboarding;