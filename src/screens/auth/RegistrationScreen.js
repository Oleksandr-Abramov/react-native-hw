import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";
import db from "../../firebase/config";

import * as ImagePicker from "expo-image-picker";
const add = require("../../images/add.png");
const remove = require("../../images/remove.png");

import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const image = require("../../images/PhotoBG.jpg");

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [borderInput, setBorderInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  console.log("avatar", avatar);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setBorderInput(null);
  };

  const handleSubmit = async () => {
    const avatarImg = await uploadAvatarToServer();
    dispatch(authSignUpUser(state, avatarImg));
    setstate(initialState);
    setShowPassword(false);
  };

  const keyboardSubmit = async () => {
    const avatarImg = await uploadAvatarToServer();
    dispatch(authSignUpUser(state, avatarImg));
    setstate(initialState);
    keyboardHide();
    setShowPassword(false);
  };

  const uploadAvatarToServer = async () => {
    try {
      console.log("avatar", avatar);
      if (avatar) {
        const avatarURL = avatar;
        const response = await fetch(avatarURL);
        const file = await response.blob();
        console.log("file", file);
        const avatarId = nanoid();
        await db.storage().ref(`avatarImage/${avatarId}`).put(file);
        const processedAvatar = await db.storage().ref("avatarImage").child(avatarId).getDownloadURL();
        return processedAvatar;
      } else {
        const processedAvatar = await db.storage().ref("avatarImage").child("avatar-default-icon.png").getDownloadURL();
        return processedAvatar;
      }
    } catch (error) {
      console.log("error.message", error.message);
      console.log("error.code", error.code);
    }
  };

  const addAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    });
    console.log("result", result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground style={{ ...styles.image, marginBottom: isShowKeyboard ? -250 : 0 }} source={image}>
          <View
            style={{
              ...styles.form,
              marginBottom: isShowKeyboard ? 250 : 0,
            }}
            onSubmitEditing={keyboardSubmit}
          >
            {/* <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}> */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                {avatar && <Image source={{ uri: avatar }} style={styles.avatarImg} />}
                {!avatar ? (
                  <TouchableOpacity onPress={addAvatar} style={styles.avatarBtn}>
                    <Image source={add} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setAvatar(null);
                    }}
                    style={styles.avatarBtn}
                  >
                    <Image source={remove} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>????????????????????</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                placeholder={"??????????"}
                placeholderTextColor={"#BDBDBD"}
                style={{ ...styles.input, borderColor: borderInput === "??????????" ? "#FF6C00" : "#E8E8E8" }}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("??????????");
                }}
                value={state.login}
                onChangeText={(value) => setstate((prevState) => ({ ...prevState, login: value }))}
              />
            </View>
            <View>
              <TextInput
                placeholder={"???????????? ?????????????????????? ??????????"}
                placeholderTextColor={"#BDBDBD"}
                keyboardType={"email-address"}
                style={{
                  ...styles.input,
                  borderColor: borderInput === "???????????? ?????????????????????? ??????????" ? "#FF6C00" : "#E8E8E8",
                }}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("???????????? ?????????????????????? ??????????");
                }}
                value={state.email}
                onChangeText={(value) => setstate((prevState) => ({ ...prevState, email: value }))}
              />
            </View>
            <View style={styles.passwordInput}>
              <TextInput
                placeholder={"????????????"}
                placeholderTextColor={"#BDBDBD"}
                secureTextEntry={!showPassword}
                style={{ ...styles.input, borderColor: borderInput === "????????????" ? "#FF6C00" : "#E8E8E8" }}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("????????????");
                }}
                value={state.password}
                onChangeText={(value) => setstate((prevState) => ({ ...prevState, password: value }))}
              />
              {state.password && (
                <Text
                  style={styles.passwordBtn}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? "??????????????" : "????????????????"}
                </Text>
              )}
            </View>
            {!isShowKeyboard && (
              <View>
                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnTitle}>??????????????????????????????</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.route} onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.underBtnText}>???????? ??????????????? ????????????</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* </KeyboardAvoidingView> */}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "flex-end",
  },
  avatarWrapper: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    position: "relative",
    marginTop: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarImg: {
    position: "absolute",
    top: 0,
    // backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 15,
    right: -12.5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    color: "#f0f8ff",
    marginHorizontal: 16,
    padding: 16,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "left",
    color: "#212121",
  },
  form: {
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  passwordInput: {
    position: "relative",
    marginTop: 20,
    marginBottom: 32,
  },
  passwordBtn: {
    position: "absolute",
    top: "35%",
    right: 35,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    marginTop: 11,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    padding: 16,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btnTitle: {
    color: "#f0f8ff",
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
  },
  header: {
    alignItems: "center",
    marginBottom: 33,
    marginTop: 32,
  },
  headerTitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  underBtnText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 78,
  },
  avatar: {
    position: "relative",
    marginTop: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarBtn: { position: "absolute", bottom: 15, right: -12.5 },
});
