import React from "react";
import { TextInput as RNTextInput, View, StyleSheet, Text } from "react-native";

export default function TextInput({ label, icon, inputStyle, ...otherProps }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor="rgba(34, 62, 75, 0.7)"
          {...otherProps}
          style={{ ...inputStyle }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
  },
  input: {
    borderRadius: 8,
    borderColor: "#223e4b",
    borderWidth: StyleSheet.hairlineWidth,
    // padding: 8,
    // height: 50,j
  },
});
