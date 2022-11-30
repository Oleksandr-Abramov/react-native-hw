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
        {/* <SafeAreaView > */}
        <ScrollView>
          <View style={styles.postContainer}>
            <Image source={{ uri: photo }} style={styles.postImage} />
          </View>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View style={{ ...styles.comment, flexDirection: item.userId === userId ? "row-reverse" : "row" }}>
                <Image source={{ uri: item.avatarURL }} style={styles.image} />
                <View style={item.userId === userId ? styles.textContainerUser : styles.textContainerNoUser}>
                  <Text style={styles.text}>{item.comment}</Text>
                  <Text style={{ ...styles.date, textAlign: item.userId === userId ? "left" : "right" }}>
                    {item.date}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        {/* </SafeAreaView> */}
        <View onSubmitEditing={createComment} style={styles.inputContainer}>
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
            <View style={styles.inputContainer}>
              <Text style={styles.btnTitle}>&#8593;</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  comment: {
    marginTop: 24,
  },
  textContainerUser: {
    padding: 16,
    marginRight: 16,
    width: "88%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopRightRadius: 0,
  },
  textContainerNoUser: {
    padding: 16,
    marginLeft: 16,
    width: "88%",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    borderTopLeftRadius: 0,
  },
  text: {
    fontFamily: "Roboto_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  date: {
    fontFamily: "Roboto_400Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#bdbdbd",
  },
  btn: {
    position: "absolute",
    right: 8,
    bottom: 8,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 100,
    // marginTop: 16,
    paddingLeft: 16,
    paddingRight: 56,
    height: 50,
    width: "100%",
  },
  btnTitle: {
    position: "absolute",
    top: -28,
    right: -9,
    fontSize: 36,
    // fontWeight: "bold",
    color: "#fff",

    // justifyContent: "center",
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  postContainer: {
    marginBottom: 10,
    // marginHorizontal: 16,
  },
  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
});

export default CommentsScreen;
