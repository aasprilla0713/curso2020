import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import CST from "../../utils/CustomSettings";
import SRV from "../../utils/Service";
import { reloadInfo } from "../../utils/ReloadEnv";

//Importo el contexto principal User y Matches
import { MainContext } from "../../context/MainContext";

export default function CancelMatchForm(props) {
  const {
    fuente,
    matchesOrder,
    setIsVisibleModal,
    toastRef,
    navigation,
    setReloadMatch,
  } = props;
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(null);

  //Renderizo las funciones para actualizar el Context
  const { setInfoBroker, setMatchesOfr, setMatchesOrd } = useContext(
    MainContext
  );

  const sendNewMessage = async () => {
    setError({});
    if (!newMessage) {
      setError({ email: "Debere registrar el motivo" });
    } else {
      setIsLoading(true);
      let val_broker = await SRV.cerrarMatch(
        fuente,
        2,
        2,
        matchesOrder,
        newMessage
      );
      if (val_broker.type > 0) {
        let updInfo = await reloadInfo(val_broker.datos);
        setInfoBroker(val_broker.datos.broker);
        setMatchesOrd(val_broker.datos.matches_ord);
        setMatchesOfr(val_broker.datos.matches_ofr);
        setReloadMatch(true);
        setIsLoading(false);
        setIsVisibleModal(false);
        navigation.navigate("Matches");
      } else {
        setIsLoading(false);
        Alert.alert(val_broker.message);
      }
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Observaciones al cancelar"
        multiline={true}
        maxLength={150}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setNewMessage(e.nativeEvent.text)}
      />
      <Button
        title="Descartar Oferta"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnUpdate}
        onPress={sendNewMessage}
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
  input: {
    width: "100%",
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnUpdate: {
    backgroundColor: CST.colorPrm,
  },
  iconRigth: {
    color: "#c2c2c2",
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
});
