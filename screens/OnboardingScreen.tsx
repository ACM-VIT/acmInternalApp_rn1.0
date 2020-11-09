import React, { useRef } from 'react';
import { View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Page from '../components/OnboardingComp/Page';
import Footer from '../components/OnboardingComp/Footer';
import { GenericFunc } from '../global';

export type OnboardingParams = {
  setOnboarding:GenericFunc,
}

const Onboarding = ({setOnboarding}:OnboardingParams) => {
  const pagerRef = useRef<ViewPager>(null);

  const handlePageChange = (pageNumber:number) => {
    if(pagerRef.current)
      pagerRef.current.setPage(pageNumber);
  };
  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor="#ffc93c"
            iconName="sun"
            title="Welcome to the weather app"
          />
            <Footer
            backgroundColor="#ffc93c"
            leftButtonLabel="Next"
            leftButtonPress={() => {
              handlePageChange(1);
            }}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor="#07689f"
            iconName="cloud-drizzle"
            title="Get updates on weather"
          />
           <Footer
            backgroundColor="#ffc93c"
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