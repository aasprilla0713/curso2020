import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import SRV from "../../utils/Service";
import CST from "../../utils/CustomSettings";
import { updateItem, getItem } from "../../utils/Storage";
import { USER_INFO } from "../../constants";

export default function CahngeNameForm(props) {
  const { displayName, setIsVisibleModal, setReloadData, toastRef } = props;
  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTele, setNewTele] = useState("");
  const [newCargo, setNewCargo] = useState("");
  const [newCiudad, setNewCiudad] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currBroker, setCurrBroker] = useState("");

  useEffect(() => {
    traerBroker();
  }, []);

  const traerBroker = async () => {
    let cur_brk = await getItem(USER_INFO);
    cur_brk = JSON.parse(cur_brk);
    setCurrBroker(cur_brk);
    setNewName(cur_brk.brk_name);
    setNewCompany(cur_brk.brk_company);
    setNewEmail(cur_brk.brk_mail);
    setNewTele(cur_brk.brk_telefono);
    setNewCiudad(cur_brk.brk_ciudad);
    setNewCargo(cur_brk.brk_cargo);
  };

  const updateNewName = async () => {
    setError({});
    if (!newName || !newCompany || !newCargo || !newTele) {
      let objError = {};
      !newName && (objError.nombre = "No puede estar vacio");
      !newCompany && (objError.company = "Debe registrar la compañia");
      !newCargo && (objError.cargo = "Registre el cargo ocupado");
      !newTele && (objError.telefono = "Registre numero de contacto");
      setError(objError);
    } else {
      setIsLoading(true);
      const update = {
        displayName: newName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          updateBroker();
        })
        .catch(() => {
          setError("Error al actualizar el nombre");
          setIsLoading(false);
        });
    }
  };

  const updateBroker = async () => {
    let val_broker = await SRV.updateDatosBroker(
      firebase.auth().currentUser.uid,
      1,
      newName,
      newCompany,
      newTele,
      newCargo
    );
    if (val_broker.type > 0) {
      let new_brk = {
        brk_name: newName,
        brk_company: newCompany,
        brk_cargo: newCargo,
        brk_telefono: newTele,
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
        placeholder="Nombre"
        containerStyle={styles.input}
        onChange={(e) => setNewName(e.nativeEvent.text)}
        defaultValue={currBroker.brk_name && currBroker.brk_name}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error.nombre}
      />
      <Input
        placeholder="Compañía"
        containerStyle={styles.input}
        onChange={(e) => setNewCompany(e.nativeEvent.text)}
        defaultValue={currBroker.brk_company && currBroker.brk_company}
        rightIcon={{
          type: "material-community",
          name: "shield-account-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error.company}
      />
      <Input
        placeholder="Telefono"
        keyboardType="phone-pad"
        containerStyle={styles.input}
        onChange={(e) => setNewTele(e.nativeEvent.text)}
        defaultValue={currBroker.brk_telefono && currBroker.brk_telefono}
        rightIcon={{
          type: "material-community",
          name: "phone",
          color: "#c2c2c2",
        }}
        errorMessage={error.telefono}
      />
      <Input
        placeholder="Cargo que Ocupa"
        containerStyle={styles.input}
        onChange={(e) => setNewCargo(e.nativeEvent.text)}
        defaultValue={currBroker.brk_cargo && currBroker.brk_cargo}
        rightIcon={{
          type: "material-community",
          name: "seat-recline-extra",
          color: "#c2c2c2",
        }}
        errorMessage={error.cargo}
      />
      <Button
        title="Actualizar Perfil"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnUpdate}
        onPress={updateNewName}
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
});
