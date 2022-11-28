import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  console.log("postId", postId);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  console.log("allComments", allComments);
  const { avatarURL } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const date = new Date().toLocaleString();

  // const createComment = async () => {
  //   db.firestore().collection("posts").doc(postId).collection("comments").add({ comment, avatarURL, date });
  //   setComment("");
  // };
  const createComment = async () => {
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
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          // .sort((a, b) => (a.date > b.date ? 1 : -1))
        )
      );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
      <TextInput
        style={{
          ...styles.input,
        }}
        value={comment}
        placeholder="Коментувати"
        // onFocus={() => {
        //   setInputIsFocus(styles.isFocused);
        // }}
        onChangeText={setComment}
      />
      <TouchableOpacity style={styles.btn} activeOpacity={0.7} onPress={createComment}>
        <Text style={styles.btnTitle}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
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
    borderBottomWidth: 1,
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
});

export default CommentsScreen;
