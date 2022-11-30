import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../nested/HomeScreen";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
import { authSignOutUser } from "../../redux/auth/authOperations";
import IconButton from "../../components/IconButton";
import { useDispatch } from "react-redux";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSighOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ padding: 15 }} onPress={handleSighOut}>
              <IconButton type="log-out" />
            </TouchableOpacity>
          ),
          title: "Публікації",
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTitleStyle: {
            color: "#212121",
            marginLeft: "50%",
          },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16, padding: 10 }} onPress={() => navigation.navigate("Home")}>
              <IconButton type="arrow-left" />
            </TouchableOpacity>
          ),
          title: "Коментарі",
          headerStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTitleStyle: {
            color: "#212121",
            marginLeft: "35%",
          },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Text>MapScreen</Text> */}
    </NestedScreen.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;
