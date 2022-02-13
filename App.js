import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";

import store from "./app/store";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import Routes from "./app/routes";
import colors from "./app/utils/colors";

const persistor = getPersistor();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.Container}>
          <StatusBar backgroundColor={colors.primary} />
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default App;
