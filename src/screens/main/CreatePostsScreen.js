import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import IconButton from "../../components/IconButton";

const CreatePostsScreen = ({ navigation }) => {
  const [inputIsFocus, setInputIsFocus] = useState("");
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [borderInput, setBorderInput] = useState(null);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setBorderInput(null);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    navigation.navigate("Home", { photo, name, location, locationName });
    setName("");
    setLocationName("");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container, marginBottom: isShowKeyboard ? 400 : 0 }}>
        <View style={styles.innerBox}>
          <View style={styles.innerBoxTextWrap}>
            <Text style={styles.innerBoxText}>Створити публікацію</Text>
          </View>
          <TouchableOpacity
            style={{ marginTop: 18, height: 35, width: 35 }}
            onPress={() => navigation.navigate("Home")}
          >
            <IconButton type="arrow-left" />
          </TouchableOpacity>
        </View>
        <View style={styles.createPostsContainer}>
          <Camera style={styles.camera} ref={setCamera}>
            <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
              <IconButton type="camera" />
            </TouchableOpacity>
            {photo && (
              <TouchableOpacity style={styles.takePhotoContainer} onPress={() => setPhoto(null)}>
                <Image source={{ uri: photo }} style={styles.imageContainer} />
              </TouchableOpacity>
            )}
          </Camera>
          <View onSubmitEditing={keyboardHide}>
            <Text style={styles.cameraText}>{!photo ? "Завантажте фото" : "Редагувати фото"}</Text>

            <TouchableOpacity style={{ marginTop: 38 }}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: borderInput === "Назва" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Назва"
                keyboardType="email - address"
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("Назва");
                }}
                onChangeText={setName}
                value={name}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: borderInput === "Місцевість" ? "#FF6C00" : "#E8E8E8",
                    paddingLeft: 28,
                  }}
                  placeholder="Місцевість"
                  keyboardType="email - address"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setBorderInput("Місцевість");
                  }}
                  onChangeText={setLocationName}
                  value={locationName}
                />
                <View style={{ marginTop: 20, position: "absolute" }}>
                  <IconButton type="map" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.btn, backgroundColor: photo ? "#FF6C00" : "#F6F6F6" }}
              activeOpacity={0.7}
              onPress={sendPhoto}
            >
              <Text style={{ ...styles.btnTitle, color: photo ? "#ffffff" : "#BDBDBD" }}>Опублікувати</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  createPostsContainer: {
    marginHorizontal: 10,
  },
  camera: {
    height: "42%",
    marginTop: 32,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerBox: {
    flexDirection: "row-reverse",
    borderWidth: 1,
    padding: 11,
    paddingTop: 55,
    borderColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "space-around",
  },
  innerBoxText: {
    marginTop: 16,
    fontFamily: "Roboto_500Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  innerBoxTextWrap: {
    flex: 2,
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    // top: 20,
    width: "100%",
    height: "100%",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  btn: {
    marginTop: 40,
    width: "100%",
    padding: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    marginTop: 16,
    paddingLeft: 16,
    height: 40,
    width: "100%",
  },
  cameraText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 10,
  },
});

export default CreatePostsScreen;

//  <View style={styles.container}>
//    <View style={styles.innerBox}>
//      <View style={styles.innerBoxTextWrap}>
//        <Text style={styles.innerBoxText}>Создать публикацию</Text>
//      </View>
//      <View style={{ marginTop: 18 }}>
//        <IconButton type="arrow-left" />
//      </View>
//    </View>
//    <View style={styles.createPostsContainer}>
//      <Camera style={styles.camera} ref={setCamera}>
//        {photo && (
//          <View style={styles.takePhotoContainer}>
//            <Image source={{ uri: photo }} style={styles.imageContainer} />
//          </View>
//        )}
//        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
//          <IconButton type="camera" />
//        </TouchableOpacity>
//      </Camera>
//      <View>
//        <Text style={styles.cameraText}>Загрузите фото</Text>

//        <TouchableOpacity style={{ marginTop: 38 }}>
//          <TextInput
//            style={{
//              ...styles.input,
//              ...inputIsFocus,
//            }}
//            placeholder="Адрес электронной почты"
//            keyboardType="email - address"
//            onFocus={() => {
//              setInputIsFocus(styles.isFocused);
//            }}
//            onChangeText={setComment}
//          />
//        </TouchableOpacity>

//        <TouchableOpacity>
//          <View style={{ flexDirection: "row" }}>
//            <TextInput
//              style={{
//                ...styles.input,
//                ...inputIsFocus,
//                ...styles.input2,
//              }}
//              placeholder="Адрес электронной почты"
//              keyboardType="email - address"
//              onFocus={() => {
//                setInputIsFocus(styles.isFocused);
//              }}
//            />
//            <View style={{ marginTop: 20, position: "absolute" }}>
//              <IconButton type="map" />
//            </View>
//          </View>
//        </TouchableOpacity>
//        <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={sendPhoto}>
//          <Text style={styles.btnTitle}>Опубликовать</Text>
//        </TouchableOpacity>
//      </View>
//    </View>
//  </View>;
