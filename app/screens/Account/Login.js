import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  requireNativeComponent,
} from "react-native";
import { Divider, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/Account/LoginForm";
import CST from "../../utils/CustomSettings";

export default function Login() {
  const toastRef = useRef();

  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.viewContainer}>
        <LoginForm toastRef={toastRef} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.viewContainer}>
        <CreateAccount />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </ScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <View style={styles.formContainer} behavior="padding" enabled>
      <Button
        title="Unete a Brokerhood"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 200,
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  divider: {
    backgroundColor: CST.colorPrm,
    marginLeft: 45,
    marginRight: 45,
    marginBottom: 20,
    marginTop: 20,
  },
  btnContainerRegister: {
    width: "95%",
  },
  btnRegister: {
    backgroundColor: CST.colorSec,
  },
});
