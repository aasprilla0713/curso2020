import { Platform, Dimensions, PixelRatio } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;

export default {
  deviceHeight,
  deviceWidth,
  platform,

  //Colores de la app
  colorPrm: "#6A3E98",
  colorSec: "#66C6F1"
};
