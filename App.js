import { StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./src/components/RegistrationScreen";
import LoginScreen from "./src/components/LoginScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./src/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      {/* <Text>qweqwe</Text> */}
      <RegistrationScreen onLayout={onLayoutRootView} />
      {/* <LoginScreen onLayout={onLayoutRootView} /> */}
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f00f",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
