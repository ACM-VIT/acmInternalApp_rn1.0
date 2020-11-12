import React from "react";
import { View } from "react-native";
import { UserType } from "../../../global";
import ProfilePicture from "../../ProfileComponent"

export type LeftContainerProps = {
  user: UserType;
};

const LeftContainer = ({ user }: LeftContainerProps) => (
  <ProfilePicture image={user.profilePic} size={90} borderRadius={8}/>
);

export default LeftContainer;
