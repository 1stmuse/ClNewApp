import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../utils/colors";
import { HEADER_TITLE_SIZE } from "../utils/constants";

const Header = ({ title, style, RightIcon }) => {
  return (
    <View style={[styles.container, { ...style }]}>
      <View />
      <Text style={styles.title}>{title}</Text>
      <View>{RightIcon ? <RightIcon /> : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    backgroundColor: colors.primary,
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    fontSize: HEADER_TITLE_SIZE,
  },
});
export default Header;
