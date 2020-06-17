import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Modal from "../Modal";
import { MainContext } from "../../context/MainContext";

export default function AccountGestion(props) {
  const { userInfo, toastRef } = props;
  const navigation = useNavigation();

  //Invoco la informacion del Broker actual
  const { infoBroker } = useContext(MainContext);

  //console.log(userInfo);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const menuOption = [
    {
      title: "Mis Ofertas (" + infoBroker.brk_offers + ") ",
      iconType: "material-community",
      iconNameLeft: "city-variant-outline",
      iconColorLeft: "#FA6053",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selecttedComponent("Offers"),
    },
    {
      title: "Mis Peticiones (" + infoBroker.brk_orders + ")",
      iconType: "material-community",
      iconNameLeft: "home-city-outline",
      iconColorLeft: "#65A4CA",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selecttedComponent("Orders"),
    },
    {
      title: "Mis Broker Hits (" + infoBroker.brk_hits + ")",
      iconType: "material-community",
      iconNameLeft: "baseball-bat",
      iconColorLeft: "#7BDF95",
      onPress: () => console.log("No va"),
    },
    {
      title: "Mis Broker Catches (" + infoBroker.brk_catches + ")",
      iconType: "material-community",
      iconNameLeft: "hand",
      iconColorLeft: "#696F90",
      onPress: () => console.log("No va"),
    },
  ];

  const selecttedComponent = (key) => {
    setIsVisibleModal(true);
    switch (key) {
      case "Offers":
        navigation.navigate("MyOffers", {
          navigation: navigation,
          curBroker: userInfo,
        });
        break;
      case "Orders":
        navigation.navigate("MyOrders", {
          navigation: navigation,
          curBroker: userInfo,
        });
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.viewGestion}>
      {menuOption.map((menu, index) => (
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
    marginBottom: 20,
  },
  menuItem2: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
