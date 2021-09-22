import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import MainScreen from './src/components/MainScreen';


export default function App() {
  return (
    <NavigationContainer>
      <MainScreen></MainScreen>
    </NavigationContainer>
  );
}

