import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import RegistrationScreen from "./src/components/RegistrationScreen";
import LoginScreen from "./src/components/LoginScreen";

export default function App() {
  return (
    <>
      {/* <RegistrationScreen /> */}
      <LoginScreen />
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
