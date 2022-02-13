import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import { HEADER_HEIGHT, DEVICE_HEIGHT } from "../utils/constants";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";
import colors from "../utils/colors";
import AppButton from "../components/AppButton";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const loadingState = useSelector(
    (state) => state.loading.effects.news.getAllNewsAsync
  );
  const [pageNumber, setPageNumber] = useState(1);
  console.log(loadingState);

  const tryAgain = async () => {
    await dispatch.news.getAllNewsAsync(pageNumber);
  };

  useEffect(() => {
    dispatch.news.getAllNewsAsync(pageNumber);
  }, [pageNumber]);

  return (
    <View style={styles.container}>
      <Header
        title="Daily News"
        style={{
          height: HEADER_HEIGHT,
        }}
        RightIcon={() => (
          <Feather
            name="plus"
            onPress={() =>
              navigation.navigate("newNews", {
                data: null,
                headerTitle: "Add News",
              })
            }
            size={24}
            color={colors.white}
          />
        )}
      />
      {loadingState ? (
        <View style={styles.center}>
          <ActivityIndicator animating={true} color={colors.red} />
        </View>
      ) : null}
      {!loadingState && !news.length ? (
        <View style={styles.center}>
          <Text style={styles.errorMsg}>There seems to be an Error</Text>
          <AppButton title="Try Again" onPress={tryAgain} />
        </View>
      ) : (
        <View>
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={news}
            renderItem={({ item }) => <NewsCard data={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <View style={styles.pagination}>
        <Pagination page={pageNumber} setPage={setPageNumber} dataLength={news.length} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    paddingBottom: DEVICE_HEIGHT * 0.28,
    paddingHorizontal: 20,
  },
  pagination: {
    position: "absolute",
    bottom: DEVICE_HEIGHT * 0,
    left: 0,
    right: 0,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    fontSize: 17,
    marginBottom: 10,
  },
});
export default Home;
