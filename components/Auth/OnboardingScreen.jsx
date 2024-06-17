import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

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
          image: <Image style={styles.imageOnboard} source={require("../../assets/images/onBoard-1.png")} />,
          title: "Running",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: <Image style={styles.imageOnboard} source={require("../../assets/images/onBoard-2.png")} />,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: <Image style={styles.imageOnboard} source={require("../../assets/images/onBoard-3.png")} />,
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  imageOnboard: {
    width: 400,
    height: 250,
  }
});

export default OnboardingScreen;
