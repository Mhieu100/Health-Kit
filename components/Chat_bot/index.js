import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { chatbot } from "../../services/chatbot";
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = "AIzaSyAOKXJTFDh7N6zzdUgBzEK0swghxM-xMqc";

  const handleSend = async (newMessages = []) => {
    try {
      // Set loading state to true
      setIsLoading(true);

      // get the user's message
      const userMessage = newMessages[0];

      // add user message to the messages state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );

      const messageText = userMessage.text.toLowerCase();
      const keywords = [
        "sức khỏe",
        "sức khỏe tổng quát",
        "chế độ ăn uống lành mạnh",
        "tập luyện thể thao",
        "giảm cân",
        "tăng cân",
        "sức khỏe tinh thần",
        "stress và cách giảm stress",
        "ngủ ngon",
        "vitamin và khoáng chất",
        "bệnh tim mạch",
        "bệnh tiểu đường",
        "huyết áp",
        "cholesterol",
        "sức khỏe xương khớp",
        "sức khỏe phụ nữ",
        "sức khỏe nam giới",
        "sức khỏe trẻ em",
        "tiêm phòng",
        "bệnh ung thư",
        "dinh dưỡng",
        "detox cơ thể",
        "sức khỏe mắt",
        "sức khỏe răng miệng",
        "thể dục thể thao",
        "yoga và thiền",
        "sức khỏe đường ruột",
        "sức khỏe hô hấp",
        "kiểm tra sức khỏe định kỳ",
        "béo phì",
        "lối sống lành mạnh",
      ];

      if (!keywords.some((keyword) => messageText.includes(keyword))) {
        // if message don't contain any keywords, respond
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I'm your health bot, ask me anything related to health",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Health Bot",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
        // Set loading state to false
        setIsLoading(false);
        return;
      }

      const updatedChat = [
        {
          parts: [{ text: messageText }],
        },
      ];

      // if message contains keywords, fetch data
      // const response = await chatbot(updatedChat);
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );

      const health = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: health || "Sorry, I couldn't find any information.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Health Bot",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );
    } catch (error) {
      console.log(error);
      const errorMessage = {
        _id: new Date().getTime() + 1,
        text: "There was an error processing your request. Please try again.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Health Bot",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, errorMessage)
      );
    } finally {
      // Set loading state to false
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          marginBottom: 5,
          marginTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          Health Bot
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "55%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
  },
});

export default ChatBot;
