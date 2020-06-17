import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Loading from "../../components/Loading";
import UserLogued from "./UserLogued";
import { reloadData } from "../../utils/ReloadEnv";

export default function AccountLogued() {
  const [logued, setLogued] = useState(null);
  useEffect(() => {
    (async () => {
      let reLoad = await reloadData();
    })();
    setLogued(true);
  }, []);

  return logued === null ? (
    <Loading isVisible={true} text="Cargando Valores..." />
  ) : (
    <UserLogued />
  );
}
