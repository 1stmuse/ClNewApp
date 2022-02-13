import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Modal } from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import { useDispatch, useSelector } from "react-redux";
import { Text, Image } from "react-native-elements";
import { getById } from "../utils/helper";
import { DEFAULT_IMAGE, DEVICE_HEIGHT } from "../utils/constants";
import colors from "../utils/colors";
import Comment from "../components/Comment";
import AppButton from "../components/AppButton";

const News = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const news = useSelector((state) => state.news);
  const commentsState = useSelector((state) => state.comments.comments);
  const comments = commentsState[id] || [];
  const item = getById(id, news);

  useEffect(() => {
    dispatch.comments.getAllcommentAsync(id);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text h4 h4Style={styles.title}>
        {item.title}
      </Text>
      <View style={styles.imagesView}>
        {item?.images ? (
          <SliderBox sliderBoxHeight={"100%"} images={item.images} />
        ) : (
          <Image style={{ height: "100%" }} source={{ uri: DEFAULT_IMAGE }} />
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.authorView}>
          <Text style={styles.author}>Author:</Text>
          <Text>{item.author}</Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: "justify",
            }}
          >
            {item.body}
          </Text>
        </View>
        <View>
          <View style={styles.addCommentView}>
            <Text
              h4
              h4Style={{
                fontSize: 13,
                marginVertical: 10,
              }}
            >
              Comments..
            </Text>
            {/* <View> */}
            <AppButton
              buttonStyle={{ backgroundColor: "transparent" }}
              textStyle={{ color: colors.primary }}
              title="Add comment"
              onPress={() =>
                navigation.navigate("newComment", { newsId: item.id })
              }
            />
            {/* </View> */}
          </View>
          {!comments.length ? (
            <View>
              <Text>No comments</Text>
            </View>
          ) : (
            <View>
              {comments.map((com) => <Comment data={com} />).reverse()}
            </View>
          )}
          {/* <Comment
            data={{
              name: "Muse",
              createdAt: "2022-02-01T09:31:24.670Z",
              avatar: "http://lorempixel.com/640/480/fashion",
              newsId: 10,
              id: 15,
              comment: "what is this",
            }}
          /> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    textAlign: "center",
    marginVertical: 5,
  },
  imagesView: {
    height: DEVICE_HEIGHT * 0.3,
  },
  body: {
    paddingHorizontal: 20,
  },
  authorView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },

  addCommentView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
export default News;
