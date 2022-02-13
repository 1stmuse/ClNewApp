import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import { Card, Image } from "react-native-elements";
import AppButton from "../components/AppButton";
import TextInput from "../components/TextInput";
import { DEVICE_WIDTH } from "../utils/constants";
import UploadImageForm from "../components/UploadImageForm";
import { useDispatch, useSelector } from "react-redux";
import colors from "../utils/colors";

const AddComment = ({ route }) => {
  const routeObj = route.params;
  const loadingState = useSelector((state) => state.loading.models.comments);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [imageUri, setImageUri] = useState("");

  const onUpload = (uri) => {
    setImageUri(uri);
  };

  const submit = async () => {
    const data = {
      name,
      comment,
      avatar: imageUri,
    };

    if (!data.name || !data.comment || !data.avatar)
      return setError("Please leave no field empty");

    if (!routeObj.commentValues) {
      await dispatch.comments.addCommentAsync({
        newsId: routeObj?.newsId,
        body: data,
      });
      setImageUri("");
      setName("");
      setComment("");
      return;
    } else {
      await dispatch.comments.editCommentAsync({
        newsId: routeObj?.commentValues?.newsId,
        commentId: routeObj?.commentValues?.id,
        body: data,
      });

      setImageUri("");
      setName("");
      setComment("");
    }
  };

  useEffect(() => {
    setTimeout(() => setError(""), 1500);
  }, [error]);

  useEffect(() => {
    if (routeObj.commentValues) {
      setImageUri(routeObj.commentValues.avatar);
      setName(routeObj.commentValues.name);
      setComment(routeObj.commentValues.comment);
    }
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ flex: 1 }}>
        <Card>
          <Card.Title>
            {routeObj?.commentValues ? "Edit Comment" : "Add Comment"}
          </Card.Title>
          <Card.Divider />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View>
            <UploadImageForm
              btnTitle="Add Avatar"
              imageLink={onUpload}
              imageSrc={imageUri}
            />
          </View>
          <View>
            <TextInput
              label="Name"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={name}
              inputStyle={{ paddingHorizontal: 10 }}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <TextInput
              label="Comment"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="next"
              inputStyle={{ paddingHorizontal: 10 }}
              returnKeyLabel="next"
              value={comment}
              onChangeText={(text) => {
                setComment(text);
              }}
            />
            <AppButton title="SUBMIT" loading={loadingState} onPress={submit} />
          </View>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeBtn: {
    position: "absolute",
    bottom: 10,
    left: DEVICE_WIDTH / 3,
    width: 100,
    flex: 1,
  },
  error: {
    color: colors.red,
    fontSize: 15,
    marginVertical: 15,
  },
});
export default AddComment;
