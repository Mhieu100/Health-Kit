import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as authService from "../../services/auth.service";
import LoadingScreen from "../LoadingScreen ";
import axios from "axios";
import { inlineStyles } from "react-native-svg";
// import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
// Alert

const SignUpScreen = ({ navigation, route }) => {
  const [name, setName] = useState("Nguyen Toan");
  const [email, setEmail] = useState("toancong@gmail.com");
  const [city, setCity] = useState("Ha Noi");
  const [country, setCountry] = useState("Viet Nam");
  const [password, setPassword] = useState("20112003");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [faceImageUri, setFaceImageUri] = useState("");

  const handleRegiter = () => {
    setIsLoading(true);
    if (!faceImageUri) {
      Alert.alert("Error", "Please capture your face image."); setIsLoading(false);
    }
    const payload = {
      email: email,
      password: password,
      city: city,
      country: country,
      name: name,
    };

    const formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }

    formData.append("face_image", {
      uri: faceImageUri,
      type: "image/jpeg",
      name: "faceImage.jpg",
    });
    formData.append("photo", {
      uri: faceImageUri,
      type: "image/jpeg",
      name: "faceImage.jpg",
    });

    setTimeout(async () => {
      try {
        await authService.register(formData);
        navigation.navigate("Login");
      } catch (err) {
        // const {message} = err.response.data.errors.body[0];
        // Alert.alert('Register Failed', message, [
        //   {text: 'OK', onPress: () => console.log('OK Pressed')},
        // ]);
        console.log("err: ", err)
        Alert.alert("Register Failed", "An error occurred while registering.", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
      setIsLoading(false);
    }, 1500);
  };


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    if (route.params?.photoUri) {
      setFaceImageUri(route.params.photoUri);
    }
    if (faceImageUri) {
    }
  }, [route.params?.photoUri]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Welcome to Healthy Care</Text>

          {!faceImageUri ? (
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logoIcon}
            />
          ) : (
            <Image source={{ uri: faceImageUri }} style={styles.faceImage} />
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder="Full Name"
            />

            <Ionicons
              name="people-outline"
              size={24}
              color="grey"
              style={styles.phoneIcon}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email Address"
            />

            <Ionicons
              name="mail-outline"
              size={24}
              color="grey"
              style={styles.phoneIcon}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setCountry}
              value={country}
              placeholder="Country"
            />

            <Ionicons
              name="location-outline"
              size={24}
              color="grey"
              style={styles.phoneIcon}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setCity}
              value={city}
              placeholder="City"
            />

            <Ionicons
              name="map-outline"
              size={24}
              color="grey"
              style={styles.phoneIcon}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity 
              onPress={togglePasswordVisibility}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>

          {!faceImageUri ? (
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.faceIdButton}
                onPress={() => navigation.navigate("FaceId_SignUp")}
              >
                <Text style={styles.faceIdText}>Register with Face ID</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "green" }}>Authenticated Face </Text>
              <Ionicons name={"checkmark"} size={24} color="green" />
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleRegiter}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signupText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: wp("4%"),
    backgroundColor: "#fff",
  },
  faceIdButton: {
    backgroundColor: "#01a5fc",
    borderRadius: 25,
    padding: wp("3%"),
    alignItems: "center",
    marginTop: hp("2.5%"),
    width: "100%",
  },
  faceIdText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
  faceImage: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: 150,
  },
  title: {
    fontSize: wp("6%"),
    marginBottom: hp("3%"),
    fontWeight: "bold",
  },
  logo: {
    marginBottom: hp("6%"),
  },
  input: {
    height: hp("7%"),
    width: "100%",
    marginVertical: hp("1%"),
    borderWidth: 1,
    padding: wp("2.5%"),
    borderRadius: 5,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#01a5fc",
    borderRadius: 25,
    padding: wp("3%"),
    alignItems: "center",
    marginTop: hp("2.5%"),
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: hp("2.5%"),
  },
  signupText: {
    color: "#01a5fc",
    marginLeft: wp("1%"),
    fontSize: wp("3.5%"),
  },
  logoIcon: {
    width: wp("30%"),
    height: wp("30%"),
    marginTop: hp("1%"),
    marginBottom: hp("4%"),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ddd",
  },
  eyeIcon: {
    position: "absolute",
    right: wp("2.5%"),
    padding: wp("2.5%"),
  },
  phoneIcon: {
    position: "absolute",
    right: wp("2.5%"),
    padding: wp("2.5%"),
  },
  faceIdButton: {
    backgroundColor: "#01a5fc",
    borderRadius: 25,
    padding: wp("3%"),
    alignItems: "center",
    marginTop: hp("2.5%"),
    width: "100%",
  },
  faceIdText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("4%"),
  },
  faceImage: {
    width: wp("30%"),
    height: wp("30%"),
    // marginTop: hp("2%"),
    borderRadius: 150,
  },
});

export default SignUpScreen;
