import React from "react";
import { YellowBox } from "react-native";
import { firebaseApp } from "./app/utils/FireBase";
import { decode, encode } from "base-64";
import { MainProvider } from "./app/context/MainContext";
import MainStack from "./app/navigations/MainStack";

YellowBox.ignoreWarnings(["Setting a timer"]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

export default function App() {
  return (
    <MainProvider>
      <MainStack />
    </MainProvider>
  );
}
