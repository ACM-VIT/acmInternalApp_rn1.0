import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2D3E',
    padding:15,
    borderRadius:8,
    zIndex:100,
    position:"relative",
    right:13,
    marginRight:13,
  },
  tweetHeaderConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:10
    // backgroundColor: "red",
  },
  projectDesc:{
    flexDirection:"column",
  },
  projectName:{
    fontWeight: "bold",
    color:"#fff",
    fontSize:25
  },
  thcInfo: {
    flexDirection: "column",
  },
  name: {
    marginRight: 5,
    fontWeight: "bold",
    color:"#fff",
    fontSize:15
  },
  username: {
    color: "grey",
    marginRight: 5,
  },
  createdAt: {
    marginLeft: 10,
    marginTop:5,
    color: "grey",
  },
  content: {
    marginVertical: 10,
    lineHeight: 18,
    color:"#fff"
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    resizeMode: "cover",
    overflow: "hidden",
    marginVertical: 10,
  },
});

export default styles;
