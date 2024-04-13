import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = ({ navigation }) => {
  const YourCustomDoneButton = ({ ...props }) => (
    <TouchableOpacity {...props} onPress={() => navigation.navigate("Login")}>
      <Text style={{ color: "black", fontSize: 15, marginEnd: 20 }}>Login</Text>
    </TouchableOpacity>
  );
  const YourCustomSkipButton = ({ ...props }) => (
    <TouchableOpacity {...props} onPress={() => navigation.navigate("Login")}>
      <Text style={{ color: "black", fontSize: 15, marginStart: 20 }}>
        Skip
      </Text>
    </TouchableOpacity>
  );
  const YourCustomNextButton = ({ ...props }) => (
    <TouchableOpacity {...props}>
      <Text style={{ color: "black", fontSize: 15, marginEnd: 20 }}>Next</Text>
    </TouchableOpacity>
  );
  return (
    <Onboarding
      NextButtonComponent={YourCustomNextButton}
      SkipButtonComponent={YourCustomSkipButton}
      DoneButtonComponent={YourCustomDoneButton}
      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("../../assets/images/circle.png")} />,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../../assets/images/square.png")} />,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: <Image source={require("../../assets/images/triangle.png")} />,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
};

export default OnboardingScreen;
