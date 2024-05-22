
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import HomeScreen from "../components/App/HomeScreen";
import SettingScreen from "../components/App/SettingScreen";
import HealthInfoScreen from "../components/App/HealthInfoScreen";
import TrackerSceen from "../components/App/TrackerScreen";
import ProfileScreen from "../components/App/ProfileScreen";

const Tab = createBottomTabNavigator();

const AppStack = () => (
  <Tab.Navigator
  screenOptions={{
    headerShown: false, // This will hide the header for all screens in this navigator
  }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }}
    />  
     <Tab.Screen
      name="Tracker"
      component={TrackerSceen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="analytics" color={color} size={size} />
        ),
      }}
    />
     <Tab.Screen
      name="Health Info"
      component={HealthInfoScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="summarize" color={color} size={size} />
        ),
      }}
    />
     <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="person" color={color} size={size} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="settings" color={color} size={size} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

export default AppStack