import { StyleSheet, Text, View } from "react-native";
import { Tabs, Redirect, Slot } from "expo-router";

/*const TabIcon = ({icon, color, name, focused}) => {
    return (
    <View>
      <Image
        source={}
      />
        
    </View>
    )
  }*/

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          /*options={{
                title: 'Home', headerShown: false, tabBarIcon: ({color, focused}) => (
                    <TabIcon/>)}*/
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
