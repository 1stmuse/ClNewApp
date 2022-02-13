import React, { useState } from "react";
import { API_KEY } from "@env";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "react-native-image-picker";

import colors from "../utils/colors";
import AppButton from "./AppButton";

function ImageInput({ onChangeImage, btnTitle }) {
  const [uploading, setUploading] = useState(false);
  const upLoad = async (imageUri) => {
    const data = new FormData();
    data.append("image", imageUri);
    setUploading(true);
    fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: "post",
      body: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res.json())
      .then((data) => {
        const url = data?.data?.display_url;
        onChangeImage(url);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
    // try {
    //   const res = await axios.post(
    //     `https://api.imgbb.com/1/upload?key=${API_KEY}`,
    //     data,
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   );
    //   console.log("mainImage", res.data.url);
    // } catch (error) {
    //   console.log("error uploading", error);
    // }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaTypes: "photo",
        quality: 0.5,
        includeBase64: true,
      });
      if (!result.didCancel) {
        upLoad(result.assets[0].base64);
      }
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  return (
    <AppButton
      loading={uploading}
      onPress={selectImage}
      icon={{
        name: "camera",
        type: "font-awesome",
        size: 15,
        color: "white",
      }}
      title={btnTitle}
      textStyle={{ marginLeft: 5 }}
      buttonStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    backgroundColor: colors.primary,
    marginVertical: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
