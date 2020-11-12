import React from "react";
import { View } from "react-native";
import LeftContainer from "./LeftContainer";
import MainContainer from "./MainContainer";
import { PostType } from "../../global";

import styles from "./styles";

export type PostProps = {
  post: PostType;
};

const Post: React.FC<PostProps> = ({ post }: PostProps) => (
  <View style={styles.conatiner}>
    <LeftContainer user={post.user} />
    <MainContainer post={post} />
  </View>
);

export default Post;
