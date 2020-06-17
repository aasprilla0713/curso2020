import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, ListItem, Text } from "react-native-elements";
import CST from "../../utils/CustomSettings";
import { AVATAR_DEFAULT } from "../../constants";
import AvatarCache from "../../utils/AvatarCache";

export default function ShowDetalleBrk(props) {
  const {
    fuente,
    matchesOrder,
    setIsVisibleModal,
    toastRef,
    navigation,
  } = props;
  console.log(props);

  const imageUrl = matchesOrder.ord_avatar;
  const urlImage = imageUrl ? imageUrl : AVATAR_DEFAULT;

  const menuOption = [
    {
      title: matchesOrder.solicitante.substr(0, 30),
      subtitle: matchesOrder.mail_solicitante.substr(0, 30),
      iconType: "material-community",
      iconNameLeft: "account-circle-outline",
      iconColorLeft: "#c2c2c2",
      onPress: () => console.log("No va"),
    },
    {
      title: matchesOrder.company_solicitante.substr(0, 25),
      subtitle: matchesOrder.cargo_solicitante.substr(0, 25),
      iconType: "material-community",
      iconNameLeft: "shield-account-outline",
      iconColorLeft: "#c2c2c2",
      onPress: () => console.log("No va"),
    },
    {
      title: "Ofertas (" + matchesOrder.ofertas_buy + ") ",
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "city-variant-outline",
      iconColorLeft: "#FA6053",
      onPress: () => console.log("No va"),
    },
    {
      title: "Peticiones (" + matchesOrder.pedidos_buy + ")",
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "home-city-outline",
      iconColorLeft: "#65A4CA",
      onPress: () => console.log("No va"),
    },
    {
      title: "Broker Hits (" + matchesOrder.hits_buy + ")",
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "baseball-bat",
      iconColorLeft: "#7BDF95",
      onPress: () => console.log("No va"),
    },
    {
      title: "Broker Catches (" + matchesOrder.hits_buy + ")",
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "hand",
      iconColorLeft: "#696F90",
      onPress: () => console.log("No va"),
    },
  ];

  return (
    <View style={styles.view}>
      <View style={{ alignItems: "center" }}>
        <AvatarCache
          uri={urlImage}
          size="xlarge"
          style={styles.imageBrokerhood}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
      </View>
      {menuOption.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          subtitle={menu.subtitle}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
            size: 25,
          }}
          onPress={menu.onPress}
          continerStyle={StyleSheet.menuItem2}
          bottomDivider
        />
      ))}
      <Button
        title="CERRAR"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnUpdate}
        onPress={() => setIsVisibleModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  btnContainer: {
    marginTop: 10,
    width: "100%",
  },
  btnUpdate: {
    backgroundColor: CST.colorPrm,
  },
  textName: {
    fontSize: 16,
    paddingTop: 5,
    fontWeight: "600",
  },
  textAmenity: {
    fontSize: 14,
    paddingBottom: 2,
  },
  viewBrokerhoodImage: {
    marginRight: 15,
  },
  imageBrokerhood: {
    width: 150,
    height: 150,
  },
  viewReview: {
    flexDirection: "row",
    marginBottom: 5,
    marginHorizontal: 0,
  },
  viewFormMedia: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
});
