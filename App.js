import { StyleSheet, Text, View } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import AppLoading from "expo-app-loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const routing = useRoute(true);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f00f",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
