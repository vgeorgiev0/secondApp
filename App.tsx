import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import MainNavigator from './navigation/MainNavigator';
import StackNavigator from './navigation/StackNavigation';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { Store } from './redux/store';

export default function App() {
  const [loaded] = useFonts({
    CookieRegular: require('./assets/fonts/Cookie-Regular.ttf'),
    Bebas: require('./assets/fonts/BebasNeue-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
