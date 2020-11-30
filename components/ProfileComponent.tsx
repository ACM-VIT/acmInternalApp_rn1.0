import React from "react";
import { Image } from "react-native";

export type ProfilePictureProps = {
  image: string;
  size?: number;
  borderRadius?:number
};

const ProfilePicture = ({ image = " ", size = 50,borderRadius=50 }: ProfilePictureProps) => {
  return (
    <Image
      source={{ uri: image?image:"https://www.wallpaperup.com/template/dist/images/default/avatar.png?v=3.5.1"}}
      style={{ width: size, height: size, borderRadius: borderRadius}}
    />
  );
};

export default ProfilePicture;
