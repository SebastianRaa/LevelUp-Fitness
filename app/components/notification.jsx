import React from "react";
import { View, Button, StyleSheet } from "react-native";
//import PushNotification from "react-native-push-notification";

//this component does not work currently, probably need expo-notifications, look up react native expo implement local notifications
//maybe this helps https://salamina.tech/blog/post/local-push-notifications-react-native-expo/
/*PushNotification.configure({
  onNotification: function (notification) {
    console.log("Notification received:", notification);
  },
});

const Notification = () => {
  const sendNotification = () => {
    PushNotification.localNotification({
      channelId: "default-channel-id",
      title: "Hello!",
      message: "This is a local notification!",
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Send Notification" onPress={sendNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notification;
*/
