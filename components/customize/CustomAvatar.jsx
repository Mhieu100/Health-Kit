import React from 'react';
import { View, Text, Image } from 'react-native';

const CustomAvatar = ({ user, size = 40, color = 'grey' }) => {
  return (
    <View style={{ width: size, height: size, backgroundColor: color, borderRadius: size / 2 }}>
      
        <Image
          source={{ uri: "https://cdn.dribbble.com/users/1953813/screenshots/5350927/chatbot-icon.jpg" }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
     
    </View>
  );
};

export default CustomAvatar;
