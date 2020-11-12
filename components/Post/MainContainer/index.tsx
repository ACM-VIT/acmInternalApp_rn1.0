import React from "react";
import { View, Text, Image } from "react-native";
import { PostType } from "../../../global";

import styles from "./styles";
import { Entypo } from "@expo/vector-icons";
import Footer from "./Footer";
import moment from "moment";

export type MainContainerProps = {
  post: PostType;
};

const MainContainer = ({ post }: MainContainerProps) => (
  <View style={styles.container}>
    <View style={styles.tweetHeaderConatiner}>
      <View style={styles.thcInfo}>
        <Text style={styles.name}>{post.user.name}</Text>
        <Text style={styles.username}>@{post.user.username}</Text>
      </View>
      <Text style={styles.createdAt}>
          {moment(post.project.createdAt).fromNow()}
        </Text>
    </View>

    <View style={styles.projectDesc}>
      <Text style={styles.projectName}>{post.project.name}</Text>
      <Text style={styles.content}>{post.project.desc}</Text>
      {!!post.project.image && (
        <Image style={styles.image} source={{ uri: post.project.image }} />
      )}
    </View>
    <View
    style={{
    borderBottomColor: '#8B98A5',
    borderBottomWidth: 1,
     }}
     />
    <Footer project={post.project} />
  </View>
);

export default MainContainer;
