import { Button } from "@rneui/base";
import { useState } from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";

const ProfileScreen = () => {
  const data = [
    { category: "Blood Pressure", value: 1000 },
    { category: "Blood Sugar", value: 500 },
    { category: "Body Mass Index", value: 3300 },
  ];

  const { logout ,user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const StatItem = ({ item }) => (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statsCategory}>{item.category}</Text>
    </View>
  );
  return (
    
      <View style={styles.container}>
        
        <View style={styles.body}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>RN</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Your Name</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>your@email.com</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Location:</Text>
            <Text style={styles.infoText}>Your Location</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoText}>+84 388 335 845</Text>
          </View>
          {/* <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Portfolio:</Text>
            <Text style={styles.infoText}>https://yourportfolio.com</Text>
          </View> */}
          <View style={styles.infoContainer}>
            <Button onPress={handleLogout}>Logout</Button>
          </View>
        </View>
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Health information</Text>
          <FlatList
            data={data}
            renderItem={StatItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </View>
      
      </View>
   
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
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    fontSize: 72,
    fontWeight: "700",
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
    marginVertical: 10,
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statsCategory: {
    color: "#999",
  },
});

export default ProfileScreen;
