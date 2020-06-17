import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";
import * as firebase from "firebase";
import ChangeNameForm from "./ChangeNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import ReloadDataForm from "./ReloadData";
import CST from "../../utils/CustomSettings";

export default function AccountOptions(props) {
  const { userInfo, setReloadData, toastRef } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const cerrarSesion = async () => {
    Alert.alert(
      "Salir de BrokerHood",
      "¿Estás seguro de cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Salir",
          onPress: () => firebase.auth().signOut(),
        },
      ],
      { cancelable: false }
    );
    /*const usrResult = await deleteItem(USER_INFO);
    if (usrResult) {
      const bkhResult = await deleteItem(USER_BHOODS);
      firebase.auth().signOut();
    }*/
  };

  const menuOption = [
    {
      key: 0,
      title: "Actualizar Perfil",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: CST.colorPrm,
      iconNameRight: "chevron-right",
      iconColorRight: CST.colorSec,
      onPress: () => selecttedComponent("displayName"),
    },
    {
      key: 1,
      title: "Actualizar Email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: CST.colorPrm,
      iconNameRight: "chevron-right",
      iconColorRight: CST.colorSec,
      onPress: () => selecttedComponent("email"),
    },
    {
      key: 2,
      title: "Actualizar Password",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: CST.colorPrm,
      iconNameRight: "chevron-right",
      iconColorRight: CST.colorSec,
      onPress: () => selecttedComponent("password"),
    },
    {
      key: 3,
      title: "Sincronizar Datos",
      iconType: "material-community",
      iconNameLeft: "cloud-download-outline",
      iconColorLeft: CST.colorPrm,
      iconNameRight: "chevron-right",
      iconColorRight: CST.colorSec,
      onPress: () => selecttedComponent("restart"),
    },
    {
      key: 3,
      title: "Cerrar Sesión",
      iconType: "material-community",
      iconNameLeft: "logout",
      iconColorLeft: CST.colorPrm,
      iconNameRight: "chevron-right",
      iconColorRight: CST.colorSec,
      onPress: () => cerrarSesion(),
    },
  ];

  const selecttedComponent = (key) => {
    setIsVisibleModal(true);
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeNameForm
            displayName={userInfo.displayName}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm
            password={userInfo.password}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      case "restart":
        setRenderComponent(
          <ReloadDataForm
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
            toastRef={toastRef}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {menuOption.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
            size: 28,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          onPress={menu.onPress}
          continerStyle={StyleSheet.menuItem}
        />
      ))}

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
