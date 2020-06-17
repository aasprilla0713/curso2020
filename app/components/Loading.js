import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import CST from "../utils/CustomSettings";

export default function Loading(props) {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color={CST.colorSec} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 300,
    backgroundColor: "#fff",
    borderColor: CST.colorSec,
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: CST.colorSec,
    textTransform: "uppercase",
    marginTop: 10,
  },
});
