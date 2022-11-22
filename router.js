import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./src/screens/auth/LoginScreen";
import RegistrationScreen from "./src/screens/auth/RegistrationScreen";
import PostsScreen from "./src/screens/main/PostsScreen";
import CreatePostsScreen from "./src/screens/main/CreatePostsScreen";
import ProfileScreen from "./src/screens/main/ProfileScreen";

import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.3)",
          },
          null,
        ],
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.3)",
        },
        headerTitleStyle: {
          color: "#212121",
          marginLeft: "50%",
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[focused ? styles.bottomButton : styles.bottomButton2]}>
              <Ionicons name="grid-outline" size={size} color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"} />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[focused ? styles.bottomButton : styles.bottomButton2]}>
              <AntDesign name="plus" size={size} color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"} />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View style={[focused ? styles.bottomButton : styles.bottomButton2]}>
              <Feather name="user" size={size} color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"} />
            </View>
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    padding: 7,
    width: 70,
    marginTop: 9,
    alignItems: "center",
  },
  bottomButton2: {
    padding: 7,
    width: 70,
    marginTop: 9,
    alignItems: "center",
  },
});
