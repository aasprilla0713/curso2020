import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Image } from "react-native-elements";
import CST from "../../utils/CustomSettings";
import { reloadData } from "../../utils/ReloadEnv";

//Importo el contexto principal User y Matches
import { MainContext } from "../../context/MainContext";

export default function RelaodDataForm(props) {
  const { setIsVisibleModal, setReloadData, toastRef } = props;
  const [isLoading, setIsLoading] = useState(null);

  //Renderizo las funciones para actualizar el Context
  const { setInfoBroker, setMatchesOfr, setMatchesOrd } = useContext(
    MainContext
  );

  const reloadDatos = async () => {
    setIsLoading(true);
    let reLoad = await reloadData();
    if (reLoad) {
      setInfoBroker(reLoad.broker);
      setMatchesOrd(reLoad.matches_ord);
      setMatchesOfr(reLoad.matches_ofr);
    }
    setIsLoading(false);
    //setReloadData(true);
    toastRef.current.show("Datos actualizados correcatmente", 2000);
    setIsVisibleModal(false);
  };

  return (
    <View style={styles.view}>
      <Image
        source={require("../../../assets/img/logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Button
        title="Recargar Datos"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnUpdate}
        onPress={reloadDatos}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnUpdate: {
    backgroundColor: CST.colorSec,
  },
  iconRigth: {
    color: "#c2c2c2",
  },
});
