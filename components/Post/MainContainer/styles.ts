import { StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.currentTheme.postBackgroundColor,
    padding:15,
    borderRadius:8,
    zIndex:100,
    position:"relative",
    right:13,
    marginRight:13,
//     shadowColor: "#000",
// shadowOffset: {
// 	width: 0,
// 	height: 1,
// },
// shadowOpacity: 0.22,
// shadowRadius: 2.22,

// elevation: 3,
shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,

elevation: 6,
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
