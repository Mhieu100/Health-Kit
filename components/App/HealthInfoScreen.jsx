import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const DATA = [
  {
    id: "1",
    title: "Understanding Blood Pressure: What Is Normal? ",
  },
  {
    id: "2",
    title: "Stress and High Blood Pressure: What’s the Connection?",
  },
  {
    id: "3",
    title: "Understanding Blood Pressure: What Is Normal? ",
  },
  {
    id: "4",
    title: "Stress and High Blood Pressure: What’s the Connection?",
  },
  {
    id: "5",
    title: "Understanding Blood Pressure: What Is Normal? ",
  },
  {
    id: "6",
    title: "Stress and High Blood Pressure: What’s the Connection?",
  },
  {
    id: "7",
    title: "Understanding Blood Pressure: What Is Normal? ",
  },
  {
    id: "8",
    title: "Stress and High Blood Pressure: What’s the Connection?",
  },
];

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
const Item = ({ title }) => (
  <View>
    <TouchableOpacity style={styles.item} onPress={() => {}}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/images/blood.png")}
      />
      <View style={{ flex: 4, paddingLeft: 20 }}>
        <Text style={styles.title}>{truncateText(title, 38)}</Text>
      </View>
      <View
        style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
      >
        <AntDesign name="right" color={"black"} size={15} />
      </View>
    </TouchableOpacity>
  </View>
);

const HealthInfoSceen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 40, marginVertical: 10 }}>
        <ScrollView horizontal>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.title}>Blood Pressure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.title}>Blood Sugar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.title}>Health Rate</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
  },
  item: {
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#e6e6e6",
    padding: 20,
    marginTop: 12,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  tab: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    marginLeft: 16,
  },
});

export default HealthInfoSceen;
