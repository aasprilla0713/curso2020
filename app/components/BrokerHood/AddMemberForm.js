import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import CST from "../../utils/CustomSettings";

export default function AddMemberForm(props) {
  const {
    setIsVisibleModal,
    setMembersReload,
    toastRef,
    navigation,
    idBrokerhood,
    nmBrokerhood,
    brokerhood,
  } = props;
  const [nombreBroker, setNombreBroker] = useState("");
  const [emailBroker, setEmailBroker] = useState("");
  const [telefonoBroker, setTelefonoBroker] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(null);
  const [brokers, setBrokers] = useState([]);

  const findBrokers = async () => {
    setError({});
    if (!nombreBroker && !telefonoBroker && !emailBroker) {
      let objError = {};
      !nombreBroker && (objError.nombre = "No puede estar vacio");
      !emailBroker && (objError.email = "No puede estar vacio");
      !telefonoBroker && (objError.telefono = "No puede estar vacio");
      setError(objError);
    } else {
      navigation.navigate("SearchMembers", {
        navigation: navigation,
        idBrokerhood: idBrokerhood,
        nombreBroker: nombreBroker,
        emailBroker: emailBroker,
        telefonoBroker: telefonoBroker,
        nmBrokerhood: nmBrokerhood,
        brokerhood: brokerhood,
        setMembersReload: setMembersReload,
      });
      setIsVisibleModal(false);
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre a buscar"
        containerStyle={styles.input}
        onChange={(e) => setNombreBroker(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error.nombre}
      />
      <Input
        placeholder="E-mail a buscar"
        containerStyle={styles.input}
        keyboardType="email-address"
        onChange={(e) => setEmailBroker(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        errorMessage={error.email}
      />
      <Input
        placeholder="Telefono a buscar"
        containerStyle={styles.input}
        keyboardType="phone-pad"
        onChange={(e) => setTelefonoBroker(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "phone",
          color: "#c2c2c2",
        }}
        errorMessage={error.telefono}
      />
      <Button
        title="Procesar la busqueda"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnUpdate}
        onPress={findBrokers}
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
});
