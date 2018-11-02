import React from 'react';
import { StyleSheet, View } from 'react-native';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import Quiz from './components/Quiz';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import {setLocalNotification, clearLocalNotification} from './helpers/helpers';

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
    setLocalNotification();
  }

  render() {
      return (
        <Provider store={createStore(reducer)}>
          <Tabs />
        </Provider>
      );
  }
}
