import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import AuthLogin from "./AuthLogin";
import Navigations from "./Navigations";

export default function MainStack() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    (async () => {
      firebase.auth().onAuthStateChanged((user) => {
        setUser(!user ? false : true);
      });
    })();
  });

  return (
    <NavigationContainer>
      {!user ? <AuthLogin /> : <Navigations />}
    </NavigationContainer>
  );
}
