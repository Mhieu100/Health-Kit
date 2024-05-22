import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as postService from "../../services/post.service";
import { formatDatePost } from "../util/date";


// const post = {
//   id: 1,
//   title: "Blog post title",
//   image: "https://www.bootdey.com/image/280x280/00BFFF/000000",
//   author: "Jane Doe",
//   date: "January 1, 2020",
//   content:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
// };

const DetailPost = ({ route }) => {
  const { id } = route.params;
  const [post, setPost] = React.useState({});
  console.log(id);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await postService.getPost(id);
          setPost(response.post);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [])
  );
console.log(post);
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.meta}>
        {/* <Text style={styles.author}>by {post.author}</Text> */}
        <Text style={styles.date}>{formatDatePost(post.created_at)}</Text>
      </View>
      <Image source={{ uri: post.image ? post.image :"https://th.bing.com/th/id/OIG1.R3VLpu_dEveOWTRZj3Pq?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn" }} style={styles.image} />
      <Text style={styles.content}>{post.content}</Text>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  meta: {
    flexDirection: "row",
    marginBottom: 20,
  },
  author: {
    fontSize: 14,
    color: "#999",
    marginRight: 10,
  },
  date: {
    fontSize: 14,
    color: "#999",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 5
  },
  content: {
    fontSize: 16,
    marginTop: 16,
  },
});

export default DetailPost;
