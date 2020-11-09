import React, { useRef, useState } from 'react';
import { View,Image } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Page from '../components/OnboardingComp/Page';
import Footer from '../components/OnboardingComp/Footer';
import { GenericFunc } from '../global';
import Colors  from '../constants/Colors';
import GoogleSignIn from '../components/Google SignIn'
import assets from '../constants/assets'


export type OnboardingParams = {
  setOnboarding:GenericFunc,
}

const Onboarding = ({setOnboarding}:OnboardingParams) => {
  const pagerRef = useRef<ViewPager>(null);
  const [googleSignin,googleSigninStatus] = useState(false);

  const handlePageChange = (pageNumber:number) => {
    if(pagerRef.current)
      pagerRef.current.setPage(pageNumber);
  };
  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} ref={pagerRef}>
        <View key="1">
           {/* <Page
            backgroundColor={Colors.bgMain}
            iconName="sun"
            title="Welcome to the weather app"
          /> */}
          <Image resizeMode="cover" source={{uri:assets.onboarding_screen1}} style={{flex:1}}/>
          <GoogleSignIn handlePageChange={handlePageChange} googleSigninStatus={googleSigninStatus}/>
          {googleSignin &&  <Footer
            backgroundColor={Colors.bgMain}
            leftButtonLabel="Next"
            leftButtonPress={() => {
              handlePageChange(1);
            }}
          />  }
            
        </View>
        <View key="2">
          <Page
            iconName="cloud-drizzle"
            title="Get updates on weather"
          />
           <Footer
            backgroundColor={Colors.bgMain}
            rightButtonLabel="Previous"
            rightButtonPress={() => handlePageChange(0)}
            leftButtonLabel="Finish"
            leftButtonPress={() => {
              setOnboarding(false);
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
};
export default Onboarding;