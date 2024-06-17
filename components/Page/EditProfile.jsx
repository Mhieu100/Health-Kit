import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../../context/AuthContext";
import * as authService from "../../services/auth.service";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import  IP_Address  from "../util/network";

const EditProfile = ({ navigation }) => {
  const { user, login } = useAuth();
  const [photo, setPhoto] = useState();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [phone, setPhone] = useState(user.phone);
  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();

    setPhoto(result.assets[0].uri);

  };

  const handleSubmit = async () => {
    console.log("photo: ", photo)
     const formData = new FormData(); // Di chuyển vào bên trong handleSubmit
     const updateUser = {
       name: name,
       email: email,
       city: city,
       country: country,
       phone: phone,
     };
     for (const key in updateUser) {
       formData.append(key, updateUser[key]);
     }
     formData.append("photo", {
       uri: photo,
       type: "image/jpeg", // Thiết lập đúng loại ở đây
       name: "user.jpg", // Đặt tên mặc định nếu cần
     });
    try {
      for (const key in updateUser) {
        formData.append(key, updateUser[key]);
      }
      console.log(formData)
      user_updated = await authService.editUser(user.id, formData);
      login(user_updated.user);
      navigation.navigate("Profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {!photo ? (
          <Image
            style={styles.avatar}
            source={{
              uri: `${API_URL}${user.photo}`,
            }}
          />
        ) : (
          <Image
            style={styles.avatar}
            source={{
              uri: photo,
            }}
          />
        )}
        <View style={{ marginVertical: 10 }}>
          {/* <Button title="Upload Avatar" /> */}
          <Button title="Upload Avatar" onPress={showImagePicker} />
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>User Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter you full name"
            value={name}
            onChangeText={setName}
          />
          <Ionicons
            name="people-outline"
            size={24}
            color="grey"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>Email</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
          />
          <Ionicons
            name="mail-outline"
            size={24}
            color="grey"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>City</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your city"
            value={city}
            onChangeText={setCity}
          />
          <Ionicons
            name="location-outline"
            size={24}
            color="grey"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>Country</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your country"
            value={country}
            onChangeText={setCountry}
          />
          <Ionicons
            name="map-outline"
            size={24}
            color="grey"
            style={styles.icon}
          />
        </View>
        <Text style={styles.label}>Phone</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone"
            value={phone}
            onChangeText={setPhone}
          />
          <Ionicons
            name="call-outline"
            size={24}
            color="grey"
            style={styles.icon}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  form: {
    width: "80%",
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  avatarContainer: {
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 18,
    borderRadius: 5,
    borderColor: "#ddd",
  },
  icon: {
    position: "absolute",
    right: wp("2.5%"),
    padding: wp("2.5%"),
  },
});

export default EditProfile;
