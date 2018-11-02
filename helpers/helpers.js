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

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20);
          tomorrow.setMinutes(0);

          Notifications.scheduleLocalNotificationAsync(createNotification(),
          {
            time: tomorrow,
            repeat: "day"
          });
        }

        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      });
    }
  })
}
