import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import Quiz from './components/Quiz';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {setLocalNotification, clearLocalNotification} from './helpers/helpers'

const Stack = createStackNavigator({
  Home: {
    screen: DeckList,
    title: "Deck List"
  },
  Deck: {
    screen: Deck
  },
  AddDeck: {
    screen: AddDeck
  },
  AddQuestion: {
    screen: AddQuestion
  },
  Quiz: {
    screen: Quiz
  }
});

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Stack
  }
});

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentDidMount() {
    clearLocalNotification();
    setLocalNotification();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={createStore(reducer)}>
          <Tabs />
        </Provider>
        //<View style={styles.container}>
        //  {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        //  <AppNavigator />
        //</View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
