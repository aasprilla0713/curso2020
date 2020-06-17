import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import ActionButton from "react-native-action-button";
import CST from "../../utils/CustomSettings";
import { AVATAR_DEFAULT } from "../../constants";
import Carousel from "../../components/Carousel";

const screenWidth = Dimensions.get("window").width;

export default function ShowBuyer(props) {
  const { navigation, route } = props;
  const { salesMan, ciudad } = route.params;

  const arrayUrls = [];
  const imageUrl = salesMan.brk_avatar;
  const urlImage = imageUrl ? imageUrl : AVATAR_DEFAULT;
  arrayUrls.push(urlImage);

  const sendOnWhatsApp = (data) => {
    let numero = data.brk_telefono ? data.brk_telefono.toString() : false;

    if (numero) {
      let url =
        "whatsapp://send?text=Hola: " +
        data.brk_name +
        "estoy ineterado en hablar con Ud&phone=" +
        numero;

      Linking.openURL(url)
        .then((data) => {
          console.log("WhatsApp Opened");
        })
        .catch(() => {
          Alert.alert("Debes instalar WhatsApp... :(");
        });
    } else {
      Alert.alert("POR FAVOR REGISTRE NUMERO TELEFONICO");
    }
  };

  const callBrokerApp = (data) => {
    let numero = data.brk_telefono ? data.brk_telefono.toString() : false;

    if (numero) {
      Linking.canOpenURL(numero)
        .then((supported) => {
          if (!supported) {
            Alert.alert("LLAMAR BROKER", "Teléfono no disponible");
          } else {
            return Linking.openURL(numero);
          }
        })
        .catch((err) => console.log(err));
    } else {
      Alert.alert("POR FAVOR REGISTRE NUMERO TELEFONICO");
    }
  };

  const menuOption = [
    {
      title: salesMan.brk_name.substr(0, 30),
      subtitle: salesMan.brk_mail.substr(0, 30),
      iconType: "material-community",
      iconNameLeft: "account-circle-outline",
      iconColorLeft: "#c2c2c2",
      onPress: () => console.log("No va"),
    },
    {
      title: salesMan.brk_company.substr(0, 25),
      subtitle: salesMan.brk_cargo.substr(0, 25),
      iconType: "material-community",
      iconNameLeft: "shield-account-outline",
      iconColorLeft: "#c2c2c2",
      onPress: () => console.log("No va"),
    },
    {
      title: salesMan.brk_telefono,
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "phone",
      iconColorLeft: "#c2c2c2",
      onPress: () => console.log("No va"),
    },
    {
      title: "(" + salesMan.compras + ") COMPRA(S) EN " + ciudad.ciu_nombre,
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "google-maps",
      iconColorLeft: CST.colorPrm,
      onPress: () => console.log("No va"),
    },
    {
      title: "Ofertas Generales (" + salesMan.ofertas_gen + ") ",
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "city-variant-outline",
      iconColorLeft: "#FA6053",
      onPress: () => console.log("No va"),
    },
    {
      title: "Total Peticiones (" + salesMan.pedidos_gen + ")",
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "home-city-outline",
      iconColorLeft: "#65A4CA",
      onPress: () => console.log("No va"),
    },
    {
      title: "Broker Hits (" + salesMan.hits_gen + ")",
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "baseball-bat",
      iconColorLeft: "#7BDF95",
      onPress: () => console.log("No va"),
    },
    {
      title: "Broker Catches (" + salesMan.catches_gen + ")",
      subtitle: null,
      iconType: "material-community",
      iconNameLeft: "hand",
      iconColorLeft: "#696F90",
      onPress: () => console.log("No va"),
    },
  ];

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <Carousel arrayImages={arrayUrls} width={screenWidth} height={200} />
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
      <AddMessageBotton
        salesMan={salesMan}
        sendOnWhatsApp={sendOnWhatsApp}
        callBrokerApp={callBrokerApp}
      />
    </ScrollView>
  );
}

function AddMessageBotton(props) {
  const { salesMan, sendOnWhatsApp, callBrokerApp } = props;
  return (
    <ActionButton buttonColor={CST.colorPrm} size={55} spacing={10}>
      <ActionButton.Item
        buttonColor="#25d366"
        size={55}
        title=""
        onPress={() => sendOnWhatsApp(salesMan)}
      >
        <Icon type="material-community" name="chat" color="#fff" size={30} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#4885ed"
        size={55}
        title=""
        onPress={() => callBrokerApp(salesMan)}
      >
        <Icon type="material-community" name="phone" color="#fff" size={30} />
      </ActionButton.Item>
    </ActionButton>
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
