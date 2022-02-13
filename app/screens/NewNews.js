import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text} from "react-native";
import { Card } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../components/AppButton";
import TextInput from "../components/TextInput";
import UplaodImageModal from "../components/UplaodImageModal";
import colors from "../utils/colors";

const NewNews = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [uploadImg, setUploadImg] = useState(false);
  const loadingState = useSelector((state) => state.loading);
  const [error, setError] = useState("");
  const isLoaading = loadingState.models.news;
  const { data } = route.params;

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  const closeModal = () => setUploadImg(false);

  const submit = async () => {
    const body = {
      author,
      title,
    };

    if (!body.author || !body.title)
      return setError("Please leave no field empty");

    if (!data) {
      await dispatch.news.addNewsAsync({ body });
      setAuthor("");
      setTitle("");
      return;
    }

    await dispatch.news.editNewsAsync({ newsId: data.id, body });
    setAuthor("");
    setTitle("");
    setUploadImg(true);
  };

  useEffect(() => {
    setTimeout(() => setError(""), 1500);
  }, [error]);

  useEffect(() => {
    if (data) {
      setAuthor(data.author);
      setTitle(data.title);
    }
  }, []);

  return (
    <Card style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <UplaodImageModal
        show={uploadImg}
        closeModal={closeModal}
        newsId={data?.id}
      />
      <View>
        <TextInput
          label="Title"
          autoCapitalize="none"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <TextInput
          keyboardType="default"
          label="Author"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          multiline
          inputStyle={{
            padding: 10,
          }}
          value={author}
          onChangeText={(text) => {
            setAuthor(text);
          }}
        />
        <AppButton title="SUBMIT" loading={isLoaading} onPress={submit} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},
  error: {
    color: colors.red,
    fontSize: 15,
    marginVertical: 15,
  },
});
export default NewNews;
