// src/services/NotificationService.js
import PushNotification from 'react-native-push-notification';

const NotificationService = {
  configure: () => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
    });
  },
  sendNotification: (message) => {
    PushNotification.localNotification({
      message: message,
    });
  },
};

export default NotificationService;