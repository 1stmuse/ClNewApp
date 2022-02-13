import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Feather from "react-native-vector-icons/Feather";
import Header from "../components/Header";
import { HEADER_HEIGHT, DEVICE_HEIGHT } from "../utils/constants";
import NewsCard from "../components/NewsCard";
import Pagination from "../components/Pagination";
import colors from "../utils/colors";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const [pageNumber, setPageNumber] = useState(1);

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
      <View>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={news}
          renderItem={({ item }) => <NewsCard data={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.pagination}>
        <Pagination page={pageNumber} setPage={setPageNumber} />
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
});
export default Home;
