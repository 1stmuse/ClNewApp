import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../utils/colors";
import AppButton from "./AppButton";

const Pagination = ({ page, setPage }) => {
  const onChnagePage = (type) => {
    if (type === "next") {
      setPage(page + 1);
      return;
    }

    setPage(page - 1);
  };

  return (
    <View style={styles.container}>
      <AppButton
        title="BACK"
        disabled={page === 1}
        onPress={() => onChnagePage("prev")}
        buttonStyle={styles.buttonStyle}
      />
      <AppButton
        title="NEXT"
        buttonStyle={styles.buttonStyle}
        onPress={() => onChnagePage("next")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    width: 100,
  },
});
export default Pagination;
