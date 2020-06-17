import React, { useState, useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import CST from "../../utils/CustomSettings";
import SRV from "../../utils/Service";
import { updateItem } from "../../utils/Storage";
import { USER_INFO } from "../../constants";
import { reloadInfo } from "../../utils/ReloadEnv";

//Importo el contexto principal User y Matches
import { MainContext } from "../../context/MainContext";

export default function SendMessageForm(props) {
  const {
    fuente,
    matchesOrder,
    setIsVisibleModal,
    toastRef,
    navigation,
    setReloadMatch,
  } = props;
  console.log(props);
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
      setError({ email: "El mensaje no puede estar vacio" });
    } else {
      setIsLoading(true);
      let val_broker = await SRV.registerMessage(
        fuente,
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

  const updateBroker = async () => {
    let val_broker = await SRV.updateMailBroker(
      firebase.auth().currentUser.uid,
      2,
      newEmail
    );
    if (val_broker.type > 0) {
      let new_brk = {
        brk_mail: newEmail,
      };
      await updateItem(USER_INFO, JSON.stringify(new_brk));
      setIsLoading(false);
      setReloadData(true);
      toastRef.current.show("Datos actualizados correcatmente");
      setIsVisibleModal(false);
    } else {
      setIsLoading(false);
      Alert.alert(val_broker.message);
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contenido del Mensaje"
        multiline={true}
        maxLength={150}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setNewMessage(e.nativeEvent.text)}
      />
      <Button
        title="Enviar Mensaje"
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
