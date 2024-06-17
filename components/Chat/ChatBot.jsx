import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import Ionicons from "react-native-vector-icons/Ionicons";
import keywords from "../util/keywords";
import CustomAvatar from "../customize/CustomAvatar";

const CustomInputToolbar = (props) => {
  return (
    <InputToolbar {...props} containerStyle={styles.inputToolbarContainer} />
  );
};

const CustomSendButton = (props) => {
  return (
    <Send {...props}>
      <View style={{ justifyContent: "center", height: "100%", marginRight: 8 }}>
        <Ionicons name="send-outline" size={24} color="black" />
      </View>
    </Send>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  const API_KEY = "AIzaSyAOKXJTFDh7N6zzdUgBzEK0swghxM-xMqc";

  useEffect(() => {
    const welcomeMessage = {
      _id: 1,
      text: "Chào mừng bạn đến với Health Chat! Hãy hỏi tôi bất cứ điều gì về sức khỏe.",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Health Bot",
      },
    };
    setMessages([welcomeMessage]);
  }, []);

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

      const messageText = "bạn là bot chăm sóc sức khỏe. chỉ trả lời những câu hỏi liên quan đến sức khỏe. Câu hỏi: " + userMessage.text.toLowerCase();

      // if (!keywords.some((keyword) => messageText.includes(keyword))) {
      //   // if message don't contain any keywords, respond
      //   const botMessage = {
      //     _id: new Date().getTime() + 1,
      //     text: "I'm your health bot, ask me anything related to health",
      //     createdAt: new Date(),
      //     user: {
      //       _id: 2,
      //       name: "Health Bot",
      //     },
      //   };
      //   setMessages((previousMessages) =>
      //     GiftedChat.append(previousMessages, botMessage)
      //   );
      //   // Set loading state to false
      //   setIsLoading(false);
       
      //   return;
      // }

      const updatedChat = [
        {
          parts: [{ text: messageText }],
        },
      ];

      // if message contains keywords, fetch data
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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Health Chat</Text>
        <Text style={styles.headerSubtitle}>Ask me anything about health</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
        renderInputToolbar={(props) => <CustomInputToolbar {...props} />}
        renderSend={(props) => <CustomSendButton {...props} />}
        renderAvatar={(props) => <CustomAvatar {...props} />}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    backgroundColor: "#0099ff",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "white",
    marginTop: 5,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "55%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: "center",
  },
});

export default ChatBot;
