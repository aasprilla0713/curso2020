import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import MyAccount from "../../screens/Account/MyAccount";
import CST from "../../utils/CustomSettings";
import SRV from "../../utils/Service";
import { saveItem, updateItem, getItem } from "../../utils/Storage";
import { ACCESS_TOKEN, USER_INFO } from "../../constants";

export default function LoginForm(props) {
  const { toastRef } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const singin = async () => {
    setIsVisibleLoading(true);
    if (!email || !password) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("Email incorrecto");
      } else {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
              console.log("Logueado");
            })
            .catch(() => {
              toastRef.current.show("Email o Contraseña Incorrectos");
            });
        } catch (error) {
          Alert.alert("ERROR", error);
        }
      }
    }
    setIsVisibleLoading(false);
  };

  return (
    <View style={styles.formContainer} behavior="padding" enabled>
      <Input
        placeholder="Correo Electronico"
        keyboardType="email-address"
        containerStyle={styles.inputForm}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRigth}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRigth}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Button
        title="Iniciar Sesion"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={singin}
      />
      <Loading text="Validando Credenciales..." isVisible={isVisibleLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  iconRigth: {
    color: "#c1c1c1",
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: CST.colorPrm,
  },
});
