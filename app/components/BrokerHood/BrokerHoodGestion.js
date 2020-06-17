import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "../Modal";
import ChangeNameForm from "../Account/ChangeNameForm";
import ChangeEmailForm from "../Account/ChangeEmailForm";
import ChangePasswordForm from "../Account/ChangePasswordForm";
import CST from "../../utils/CustomSettings";

export default function AccountGestion(props) {
  console.log(props);
  const { userInfo, setReloadData, toastRef, navigation, brokerhood } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const gstOption = [
    {
      title: "Ofertas (" + brokerhood.bkh_ofertas + ")",
      iconType: "material-community",
      iconNameLeft: "city-variant-outline",
      iconColorLeft: "#FA6053",
      //iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      //onPress: () => selecttedComponent("email"),
    },
    {
      title: "Peticiones (" + brokerhood.bkh_ordenes + ")",
      iconType: "material-community",
      iconNameLeft: "home-city-outline",
      iconColorLeft: "#65A4CA",
      //iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      //onPress: () => selecttedComponent("password"),
    },
    {
      title: "Broker Matches (" + brokerhood.bkh_matches + ")",
      iconType: "material-community",
      iconNameLeft: "arrow-collapse-all",
      iconColorLeft: CST.colorPrm,
      //iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      //onPress: () => selecttedComponent("password"),
    },
    {
      title: "Broker Hits (" + brokerhood.bkh_catches + ")",
      iconType: "material-community",
      iconNameLeft: "baseball-bat",
      iconColorLeft: "#7BDF95",
      //iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      //onPress: () => selecttedComponent("password"),
    },
    {
      title: "Broker Catches (" + brokerhood.bkh_catches + ")",
      iconType: "material-community",
      iconNameLeft: "hand",
      iconColorLeft: "#696F90",
      //iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      //onPress: () => selecttedComponent("password"),
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
      default:
        break;
    }
  };

  return (
    <View style={styles.viewGestion}>
      {gstOption.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
            size: 25,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          onPress={menu.onPress}
          continerStyle={StyleSheet.menuItem2}
          bottomDivider
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
  viewGestion: {
    marginBottom: 25,
  },
  menuItem2: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
