import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  LogBox,
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  console.log("photo", photo);
  console.log("postId", postId);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { avatarURL } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getAllComments();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const date = new Date().toLocaleString();

  // const createComment = async () => {
  //   db.firestore().collection("posts").doc(postId).collection("comments").add({ comment, avatarURL, date });
  //   setComment("");
  // };
  const createComment = async () => {
    keyboardHide();
    db.firestore().collection("comments").add({ comment, avatarURL, date, postId, userId });
    setComment("");
  };

  // const getAllComments = async () => {
  //   db.firestore()
  //     .collection("posts")
  //     .doc(postId)
  //     .collection("comments")
  //     .onSnapshot((data) => setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
  // };
  const getAllComments = async () => {
    db.firestore()
      .collection("comments")
      .where("postId", "==", postId)
      .onSnapshot((data) =>
        setAllComments(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).sort((a, b) => (a.date > b.date ? 1 : -1))
        )
      );
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {/* <SafeAreaView style={styles.container}> */}
        {/* <ScrollView> */}
        <View style={styles.postContainer}>
          <Image source={{ uri: photo }} style={styles.postImage} />
        </View>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Image source={{ uri: item.avatarURL }} style={styles.image} />
              <Text>{item.comment}</Text>
              <Text>{item.date}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        {/* </ScrollView> */}
        {/* </SafeAreaView> */}
        <View onSubmitEditing={createComment}>
          <TextInput
            value={comment}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            style={{ ...styles.input, borderColor: isShowKeyboard ? "#FF6C00" : "#E8E8E8" }}
            placeholder="Коментувати"
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={createComment}>
            <Text style={styles.btnTitle}>Опубликовать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  comment: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 30,
    marginTop: 10,
  },
  btn: {
    marginTop: 40,
    width: "100%",
    padding: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    marginTop: 16,
    paddingLeft: 16,
    height: 40,
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  postContainer: {
    marginBottom: 10,
    marginHorizontal: 16,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
});

export default CommentsScreen;
