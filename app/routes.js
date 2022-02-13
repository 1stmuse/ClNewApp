import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import News from "./screens/News";
import NewNews from "./screens/NewNews";
import NewComment from "./screens/NewComment";

const Stack = createStackNavigator();
const Routes = () => {
  //   console.log("reached here-------------");
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="home"
        component={Home}
      />
      <Stack.Screen name="news" component={News} />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: route.params.headerTitle,
        })}
        name="newNews"
        component={NewNews}
      />
      <Stack.Screen
        options={{
          headerTitle: "New Comment",
        }}
        name="newComment"
        component={NewComment}
      />
    </Stack.Navigator>
  );
};

export default Routes;
