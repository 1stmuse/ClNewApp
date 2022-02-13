import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { format } from "timeago.js";
import colors from "../utils/colors";
import AppButton from "./AppButton";

const Comment = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { name, avatar, comment, newsId, id, createdAt } = data;

  const editComment = () => {
    navigation.navigate("newComment", { commentValues: data });
  };

  const deleteComment = async () => {
    await dispatch.comments.deleteCommentAsync({ newsId, commentId: id });
  };
  return (
    <View style={styles.container}>
      <View>
        <Card.Image style={styles.image} source={{ uri: avatar }} />
      </View>
      <View style={styles.body}>
        <View style={[styles.flex, { marginBottom: 5 }]}>
          <Text>{name}</Text>
        </View>

        <View>
          <Text>{comment}</Text>
        </View>

        <View style={[styles.flex, styles.commentBottom]}>
          <View>
            <Text style={{ fontStyle: "italic" }}>{format(createdAt)}</Text>
          </View>
          <View style={[styles.flex, styles.actionBtn]}>
            <AppButton
              title="Delete"
              onPress={deleteComment}
              textStyle={{ color: colors.red }}
              buttonStyle={styles.btn}
            />
            <AppButton
              title="Edit"
              onPress={editComment}
              textStyle={{ color: colors.primary }}
              buttonStyle={styles.btn}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
  },
  body: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderColor: colors.gray,
    flex: 1,
  },
  commentBottom: {
    justifyContent: "space-between",
  },
  actionBtn: {
    justifyContent: "space-between",
    width: "50%",
  },
  btn: {
    minWidth: 70,
    backgroundColor: "transparent",
  },
});
export default Comment;
