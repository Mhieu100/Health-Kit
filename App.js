import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import MainStack from "./navigation/MainStack";




const App = () => {
  const userLoggedIn = true; // You can replace this with your authentication logic

  return (
    <NavigationContainer>
      {userLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
