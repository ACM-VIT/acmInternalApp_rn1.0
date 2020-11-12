import React from "react";
import { View, FlatList } from "react-native";
import posts from "../../fetchRequests/feed";
import Post from "../Post";

const Feed = () => (
  <View style={{ width: "100%",marginTop:25 }}>
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post post={item} />}
      keyExtractor={(item) => item.key}
    ></FlatList>
  </View>
);

export default Feed;
