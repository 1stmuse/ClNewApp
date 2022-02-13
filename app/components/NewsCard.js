import React from "react";
import { View, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Card, Image, Text } from "react-native-elements";
import { DEFAULT_IMAGE } from "../utils/constants";
import colors from "../utils/colors";
import AppButton from "./AppButton";

const NewsCard = ({ data }) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const navigate = () => {
    navigation.navigate("news", { id: data.id });
  };

  const deleteNews = () => {
    dispatch.news.deleteNewsAsync(data.id);
  };

  return (
    <Pressable onPress={navigate}>
      <Card containerStyle={styles.card}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: data?.images ? data?.images[0].uri : DEFAULT_IMAGE,
              }}
              resizeMode="cover"
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={styles.cardPreview}>
            <Text
              numberOfLines={1}
              h4
              h4Style={{ fontSize: 15, color: colors.red }}
            >
              {data.title}
            </Text>
            <View style={styles.authorView}>
              <Text h4 numberOfLines={1} h4Style={{ fontSize: 13 }}>
                Author: <Text> {data.author} </Text>
              </Text>
            </View>
            <View>
              <Text numberOfLines={3}>{data.body}</Text>
            </View>
            <View style={styles.btnView}>
              <AppButton
                title="Delete"
                buttonStyle={styles.btn}
                textStyle={{ color: colors.red }}
                onPress={deleteNews}
              />
              <AppButton
                title="Edit"
                buttonStyle={styles.btn}
                textStyle={{ color: colors.primary }}
                onPress={() =>
                  navigation.navigate("newNews", {
                    data,
                    headerTitle: "Edit News",
                  })
                }
              />
            </View>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    // backgroundColor: colors.white,
    // paddingHorizontal: 20,
    // justifyContent: "space-between",
    // paddingVertical: 10,
    // marginBottom: 20,
    // elevation: 5,
  },
  imageContainer: {
    width: "40%",
  },
  image: {
    height: 150,
    width: "100%",
  },
  authorView: {
    marginVertical: 4,
  },
  cardPreview: {
    flex: 1,
    marginLeft: 10,
  },
  btnView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    // justifyContent: "space-between",
  },
  btn: {
    flex: 1,
    minWidth: 70,
    backgroundColor: "transparent",
    marginRight: 5,
  },
});
export default NewsCard;
