import { Button } from "@rneui/base";
import { FlatList, ScrollView } from "react-native";
import { View, Text, Image, StyleSheet } from "react-native";
import * as healthyService from "../../services/healthy.service";
import { useAuth } from "../../context/AuthContext";
import { useCallback, useState } from "react";
import LoadingScreen from "../customize/LoadingScreen ";
import { useFocusEffect } from "@react-navigation/native";
import { formatDate, formatDatePost } from "../util/date";
import  API_URL  from "../util/network";
import React, { useEffect } from "react";
const ProfileScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState(false);
  
  const { logout, user } = useAuth();

  console.log("photo",user.photo)

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      logout();
      setIsLoading(false);
    }, 500);
  };

  const [bloodPressure, setBloodPressure] = useState([]);
  const [bloodSugar, setBloodSugar] = useState([]);
  const [bmi, setBMI] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        
        try {
          const bp = await healthyService.getBloodPressure(user.id);
          setBloodPressure(bp.info);
          const bs = await healthyService.getBloodSugar(user.id);
          setBloodSugar(bs.info);
          const bm = await healthyService.getBMI(user.id);
          setBMI(bm.info);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [user.id])
  );

  useEffect(() => {
    if (user && user.photo) {
      const initialUri = `${API_URL}${user.photo}`;
      const checkImage = async () => {
        try {
          await Image.prefetch(initialUri);
          setImageUri(initialUri);
        } catch (e) {
          setError(true);
          setImageUri(`${user.photo}`);
        }
      };

      checkImage();
    }
  }, [user, API_URL]);

  console.log(bloodPressure);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.body}>
            <View style={styles.avatarContainer}>
              {imageUri ? (
                <Image
                  style={styles.avatar}
                  source={{ uri: imageUri }}
                  onError={() => setError(true)}
                />
              ) : (
                <Text style={styles.errorText}>Loading...</Text>
              )}
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{user.name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoText}>{user.email}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Address :</Text>
              <Text style={styles.infoText}>
                {user.city}, {user.country}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoText}>
                +84 {user.phone ? user.phone : "---------"}
              </Text>
            </View>

            <View style={styles.infoContainer}>
              <View style={{ marginHorizontal: 10 }}>
                <Button
                  onPress={() => {
                    navigation.navigate("Edit Profile");
                  }}
                >
                  Edit Profile
                </Button>
              </View>
              <View>
                <Button onPress={handleLogout}>Logout</Button>
              </View>
            </View>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Health information</Text>

            {bloodPressure.length > 0 && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Blood Pressure</Text>
                <Text style={styles.statsCategory}>
                  Systolic : {bloodPressure[0].sys} mmHg
                </Text>
                <Text style={styles.statsCategory}>
                  Diastolic : {bloodPressure[0].dia} mmHg
                </Text>
                <Text style={styles.statsCategory}>
                  Pulse : {bloodPressure[0].pul} BPM
                </Text>
                <Text style={styles.statsCategory}>
                  Date : {bloodPressure[0].date_check}
                </Text>
                <Text style={styles.result}>{bloodPressure[0].result}</Text>
              </View>
            )}

            {bloodSugar.length > 0 && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Blood Sugar</Text>
                <Text style={styles.statsCategory}>
                  Value : {bloodSugar[0].value}
                </Text>
                <Text style={styles.statsCategory}>
                  Unit : {bloodSugar[0].unit}
                </Text>
                <Text style={styles.statsCategory}>
                  Conditon : {bloodSugar[0].fettle}
                </Text>
                <Text style={styles.statsCategory}>
                  Date : {bloodSugar[0].date_check}
                </Text>
                <Text style={styles.result}>{bloodSugar[0].result}</Text>
              </View>
            )}

            {bmi.length > 0 && (
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Body Mass Index</Text>
                <Text style={styles.statsCategory}>
                  Weight : {bmi[0].weight} kg
                </Text>
                <Text style={styles.statsCategory}>
                  Height : {bmi[0].height} cm
                </Text>
                <Text style={styles.statsCategory}>
                  Date : {bmi[0].date_check}
                </Text>
                <Text style={styles.result}>{bmi[0].result}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
  },
  body: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nameContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
  statsCard: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
  },
  statsTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  statItem: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statsCategory: {
    color: "#999",
  },
  result: {
    marginVertical: 5,
    color: "#40bf40",
  },
  avatarContainer: {
    borderRadius: 70,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
  },
});

export default ProfileScreen;
