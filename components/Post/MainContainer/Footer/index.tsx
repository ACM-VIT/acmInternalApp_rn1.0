import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles";
import { Entypo, Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import { ProjectType } from "../../../../global";

export type FooterProps = {
  project: ProjectType;
};

const Footer = ({ project }: FooterProps) => (
  <View style={styles.container}>
    <View style={styles.iconContainer}>
      <Feather name={"message-circle"} size={20} color={"grey"} />
      <Text style={styles.number}>{project.noOfUpvotes}</Text>
    </View>
    <View style={styles.iconContainer}>
      <EvilIcons name={"retweet"} size={28} color={"grey"} />
      <Text style={styles.number}>{project.noOfComments}</Text>
    </View>
    <View style={styles.iconContainer}>
      <AntDesign name={"hearto"} size={20} color={"grey"} />
      <Text style={styles.number}>{project.noOfComments}</Text>
    </View>
    <View style={styles.iconContainer}>
      <EvilIcons name={"share-google"} size={28} color={"grey"} />
      <Text style={styles.number}>{project.noOfUpvotes}</Text>
    </View>
  </View>
);

export default Footer;
