import {Notifications, Permissions} from 'expo'
import {AsyncStorage} from 'react-native';

const NOTIFICATION_KEY = "UdaciCards:Notifications"

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
  
    Notifications.createChannelAndroidAsync('udaciNotifications', {
      name: 'UdaciCards Notifications',      
      sound: true,
    });
  
  return {
    title: "Quiz Reminder",
    body: "Don't forget to take a quiz today!",
    android: {
      sound: "true",
      priority: "high",
      sticky: false,
      vibrate: true,
      channelId: "udaciNotifications"
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
        console.log("der");
        if (status === "granted") {
          Notifications.cancelAllScheduledNotificationsAsync();
          var tomorrow = new Date();
          console.log(tomorrow);
          tomorrow.setSeconds(tomorrow.getSeconds() + 10);
          console.log(tomorrow);

          Notifications.scheduleLocalNotificationAsync(createNotification,  {
            title: "Study Time",
            time: tomorrow,
            repeat: "day"
          });
        }

        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      });
    }
  })
}
