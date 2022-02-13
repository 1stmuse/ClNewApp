import React from "react";
import { Button } from "react-native-elements";

const AppButton = ({ title, buttonStyle, textStyle, ...props }) => {
  return (
    <Button
      title={title}
      buttonStyle={buttonStyle}
      titleStyle={textStyle}
      loadingStyle={{
        backgroundColor: "transparent",
      }}
      {...props}
    />
  );
};

export default AppButton;
