import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useAuth } from "../context/AuthContext";
const AppContent = () => {
  // const { user } = useAuth();

  const user = { name: "John" };
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppContent;
