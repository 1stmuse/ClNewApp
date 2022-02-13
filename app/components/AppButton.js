import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import colors from "../utils/colors";

const AppButton = ({ title, buttonStyle, textStyle, ...props }) => {
  return (
    <Button
      title={title}
      buttonStyle={buttonStyle}
      titleStyle={textStyle}
      // loadingProps={{
      //   color: colors.red,
      // }}
      loadingStyle={{
        backgroundColor: "transparent",
      }}
      {...props}
    />
  );
};

// const styles = StyleSheet.create({
//   container: {},
// });
export default AppButton;
