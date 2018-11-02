import React from 'react';
import {Text, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {Notifications, Permissions} from 'expo'

const NOTIFICATION_KEY = "UdaciCards:Notificaitons"

export function getDailyReminderValue () {
  return {
    today: "Remember to take a quiz today!"
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync());
}

export function createNotification () {
  return {
    title: "Quiz Reminder",
    body: "Don't forget to take a quiz today!",
    android: {
      sound: "true",
      priority: "high",
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({status}) => {
        if (status === "granted") {
          Notifications.cancelAllScheduledNotificationsAsync();
          var tomorrow = new Date();

          Notifications.scheduleLocalNotificationAsync(createNotification,  {
            time: "tomorrow",
            repeat: "day"
          });
        }

        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      });
    }
  })
}

class DeckList extends React.Component {
  static navigationOptions = {
    headerTitle: 'Deck List',
  };

  renderDeckList() {
    var html = [];
    this.props.keys.map((key) => {
      html.push(<TouchableOpacity style={styles.cardStyle} key={key} onPress={() => this.props.navigation.navigate("Deck", {deckName: this.props.decks[key].title})}><Text style={styles.deckTitle}>{this.props.decks[key].title}</Text><Text style={styles.numberOfCardsText}>Number of Cards in Deck: {this.props.decks[key].questions.length}</Text></TouchableOpacity>);
    });
    
    return html;
  }

  render() {
    var {decks} = this.props;
    return (
      <ScrollView>
        <TouchableOpacity style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('AddDeck')}>
          <Text style={styles.buttonTextStyle}>AddDeck</Text>
        </TouchableOpacity>
        {this.renderDeckList()}        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  deckTitle: {
    margin: 5,
    textAlign: 'center',
    fontSize:30
  },

  numberOfCardsText: {
    margin: 10,
    fontSize: 20,
    textAlign: 'center',
  },

  buttonTextStyle: {
    fontSize:20,
    color: 'white',
    textAlign: 'center'
  },

  cardStyle: {
    padding:10,
    borderRadius:20,
    borderWidth:5,
    margin:15,
    borderColor: 'black'
  },

  buttonStyle: {
    padding:10,
    backgroundColor: 'green',
    borderRadius:20,
    margin:15
  }
});

function mapStateToProps (decks) {
  var keys = [];
  if (decks != null) {
    keys = Object.keys(decks);
  }
  return {
    decks,
    keys
  }
}

export default connect(mapStateToProps)(DeckList)