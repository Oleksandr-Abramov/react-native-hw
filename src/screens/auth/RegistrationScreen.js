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

const initialState = {
  login: "",
  email: "",
  password: "",
};

const image = require("../../images/PhotoBG.jpg");
const add = require("../../images/add.png");
const remove = require("../../images/remove.png");

export default function LoginScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  const [borderInput, setBorderInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setBorderInput(null);
  };

  const handleSubmit = () => {
    dispatch(authSignUpUser(state));
    setstate(initialState);
    setShowPassword(false);
  };

  const keyboardSubmit = () => {
    dispatch(authSignUpUser(state));
    setstate(initialState);
    keyboardHide();
    setShowPassword(false);
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
                <Image style={styles.avatarBtn} source={add} />
              </View>
            </View>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Реєстрація</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <TextInput
                placeholder={"Логін"}
                placeholderTextColor={"#BDBDBD"}
                style={{ ...styles.input, borderColor: borderInput === "Логін" ? "#FF6C00" : "#E8E8E8" }}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("Логін");
                }}
                value={state.login}
                onChangeText={(value) => setstate((prevState) => ({ ...prevState, login: value }))}
              />
            </View>
            <View>
              <TextInput
                placeholder={"Адреса електронної пошти"}
                placeholderTextColor={"#BDBDBD"}
                keyboardType={"email-address"}
                style={{
                  ...styles.input,
                  borderColor: borderInput === "Адреса електронної пошти" ? "#FF6C00" : "#E8E8E8",
                }}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("Адреса електронної пошти");
                }}
                value={state.email}
                onChangeText={(value) => setstate((prevState) => ({ ...prevState, email: value }))}
              />
            </View>
            <View style={styles.passwordInput}>
              <TextInput
                placeholder={"Пароль"}
                placeholderTextColor={"#BDBDBD"}
                secureTextEntry={!showPassword}
                style={{ ...styles.input, borderColor: borderInput === "Пароль" ? "#FF6C00" : "#E8E8E8" }}
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("Пароль");
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
                  {showPassword ? "Сховати" : "Показати"}
                </Text>
              )}
            </View>
            {!isShowKeyboard && (
              <View>
                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnTitle}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.route} onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.underBtnText}>Маєш аккаунт? Увійти</Text>
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
    backgroundColor: "#f0f",
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
  avatarBtn: { position: "absolute", bottom: 15, right: -12.5 },
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
});
