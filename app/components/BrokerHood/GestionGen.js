import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import { Icon, ListItem, Image } from "react-native-elements";
import CST from "../../utils/CustomSettings";
import { FontAwesome } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function UserLogued(props) {
  const { gestionGen, navigation } = props;
  const [curGestion, setCurGestion] = useState({});
  console.log(props);

  useEffect(() => {
    setCurGestion(gestionGen[0]);
  }, []);

  return (
    <View style={styles.viewUserInfo}>
      <ImageBackground
        source={require("../../../assets/img/background.png")}
        resizeMode="cover"
        style={styles.bkgImage}
        imageStyle={styles.imageStyleCnt}
      >
        <View style={{ marginTop: 20 }}>
          <Image
            source={require("../../../assets/img/logo-login.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <ListItem
            key={0}
            title={"Comunidad Brokers " + curGestion.brokers_gen}
            leftIcon={
              <FontAwesome
                name="users"
                color={CST.colorPrm}
                size={30}
                underlayColor="#fff"
              />
            }
            bottomDivider
          />
          <ListItem
            key={1}
            title={"BrokerHoods " + curGestion.brokershood_gen}
            leftIcon={
              <Icon
                type="material-community"
                name="account-group-outline"
                color="#4885ed"
                size={35}
                underlayColor="#fff"
              />
            }
            bottomDivider
          />
          <ListItem
            key={2}
            title={"Ofertas Totales " + curGestion.ofertas_gen}
            leftIcon={
              <Icon
                type="material-community"
                name="city-variant-outline"
                color="#db3236"
                size={35}
                underlayColor="#fff"
              />
            }
            bottomDivider
          />
          <ListItem
            key={3}
            title={"Pedidos Totales " + curGestion.pedidos_gen}
            leftIcon={
              <Icon
                type="material-community"
                name="home-city-outline"
                color="#65A4CA"
                size={35}
                underlayColor="#fff"
              />
            }
            bottomDivider
          />
          <ListItem
            key={4}
            title={"Negocios Cerrados " + curGestion.hits_gen}
            leftIcon={
              <FontAwesome
                name="handshake-o"
                color="#3cba54"
                size={30}
                underlayColor="#fff"
              />
            }
            bottomDivider
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    flex: 1,
    backgroundColor: "transparent",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: CST.colorPrm,
  },
  btnCloseSessionText: {
    color: "#fff",
    fontWeight: "bold",
    zIndex: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
    zIndex: 2,
  },
  bkgImage: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: "transparent",
    marginLeft: 0,
  },
  imageStyleCnt: {},
  logo: {
    width: "100%",
    height: 100,
    marginTop: 20,
  },
});
