import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { truncateText } from "../util/text";
import { useFocusEffect } from "@react-navigation/native";
import * as postService from "../../services/post.service";

const Item = ({ id, title, icon, navigation }) => (
  <View style={{ marginBottom: 10 }}>
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate("Detail Post", { id });
      }}
    >
      <Image style={styles.tinyLogo} source={{ uri: icon }} borderRadius={5} />
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

const HealthInfoSceen = ({ navigation }) => {
  const [posts, setPost] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await postService.getAllPost();
          setPost(response.post);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [])
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredData = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const DATA = filteredData.map((item) => ({
    id: item.id,
    title: item.title,
    icon: item.icon,
  }));

  console.log(DATA);
  console.log(searchQuery);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <Image
            style={[styles.icon, styles.inputIcon]}
            source={{
              uri: "https://img.icons8.com/color/70/000000/search.png",
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Search..."
            underlineColorAndroid="transparent"
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            navigation={navigation}
            title={item.title}
            icon={item.icon}
            id={item.id}
          />
        )}
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
  formContent: {
    flexDirection: "row",
    marginTop: 10,
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: "center",
  },
});

export default HealthInfoSceen;
