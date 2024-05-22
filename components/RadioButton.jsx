import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";

const RadioButton = ({ label, selected, onSelect, color }) => {
  return (
    <TouchableOpacity
      style={[
        styles.radioButton,
        { backgroundColor: selected ? "#9933f0" : "#FFF" },
      ]}
      onPress={onSelect}
    >
      <Icon name={label} color={color} size={50} />

      <Text
        style={{
          textAlign: "center",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: selected ? "#fff" : "#000",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  radioButton: {
    margin: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 8,
  },
});
