import React from "react";
import { View, StyleSheet, Image } from "react-native";
import ImageInput from "./ImageInput";

const UploadImageForm = ({ imageLink, imageSrc, btnTitle }) => {
  const onAddImage = (uri) => {
    imageLink(uri);
  };

  return (
    <View style={styles.container}>
      {imageSrc ? (
        <View style={styles.imageBox}>
          <Image source={{ uri: imageSrc }} style={styles.image} />
        </View>
      ) : null}
      <View>
        <ImageInput
          btnTitle={btnTitle}
          onChangeImage={(uri) => onAddImage(uri)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: "100%",
  },
  imageBox: {
    width: "100%",
    height: 100,
  },
});
export default UploadImageForm;
