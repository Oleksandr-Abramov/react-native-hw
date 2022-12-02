import * as React from "react";
import { SvgXml } from "react-native-svg";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import {
  iconAdd,
  iconShape,
  iconCamera,
  mapIcon,
  iconLogOut,
  userIcon,
  iconArrowLeft,
  iconComment,
} from "./iconSvg/IconSvg";

export default function IconButton({ type }) {
  const AddSvg = () => <SvgXml xml={iconAdd} style={styles.icon} />;
  const CameraSvg = () => <SvgXml xml={iconCamera} style={styles.icon} />;
  const MapSvg = () => <SvgXml xml={mapIcon} style={styles.icon} />;
  const UserSvg = () => <SvgXml xml={userIcon} style={styles.icon} />;
  const LogOutSvg = () => <SvgXml xml={iconLogOut} style={styles.icon} />;
  const ArrowLeftSvg = () => <SvgXml xml={iconArrowLeft} style={styles.icon} />;
  const ShapeSvg = () => <SvgXml xml={iconShape} style={styles.icon} />;
  const Comment = () => <SvgXml xml={iconComment} style={styles.icon} />;

  let svg;
  switch (type) {
    case "add":
      svg = <AddSvg />;
      break;
    case "user":
      svg = <UserSvg />;
      break;
    case "arrow-left":
      svg = <ArrowLeftSvg />;
      break;
    case "camera":
      svg = <CameraSvg />;
      break;
    case "log-out":
      svg = <LogOutSvg />;
      break;
    case "shape":
      svg = <ShapeSvg />;
      break;
    case "map":
      svg = <MapSvg />;
      break;
    case "comment":
      svg = <Comment />;
      break;
    default:
      svg = "";
  }
  return <View style={styles.btn}>{svg}</View>;
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
