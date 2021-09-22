import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Character from './Character'
import CharacterDetail from './CharacterDetail'

const Stack = createNativeStackNavigator();

class MainScreen extends React.Component {
    render() {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#FEFEFE',
                    },
                    headerTintColor: '#000',
                }}
            >
                <Stack.Screen name='Character'
                    component={Character}>
                </Stack.Screen>
                <Stack.Screen name='CharacterDetail'
                    component={CharacterDetail}>
                </Stack.Screen>

            </Stack.Navigator>
        );
    }
}

export default MainScreen;