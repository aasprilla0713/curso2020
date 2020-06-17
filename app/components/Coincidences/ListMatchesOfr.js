import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { ListItem, Text, Image } from "react-native-elements";
import CST from "../../utils/CustomSettings";
import { AVATAR_DEFAULT, URL_AVATAR, URL_OFFERT } from "../../constants";

export default function ListMatchesOfr(props) {
  const { navigation, matchesOffers, curBroker, setReloadMatch } = props;
  console.log(props);

  return (
    <View>
      {matchesOffers.length === 0 ? (
        <NotFoundMatches />
      ) : (
        matchesOffers.map((item, i) => (
          <ListItem
            key={item.id}
            title={item.solicitante}
            subtitle={item.tin_nombre + " " + item.zna_nombre}
            leftAvatar={{
              source: {
                uri: item.ord_avatar ? item.ord_avatar : AVATAR_DEFAULT,
              },
              size: "medium",
            }}
            onPress={() =>
              navigation.navigate("MatchOferta", {
                matchesOrder: item,
                navigation: navigation,
                curBroker: curBroker,
                setReloadMatch: setReloadMatch,
              })
            }
            bottomDivider
            chevron
          />
        ))
      )}
    </View>
  );
}

function NotFoundMatches() {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Image
        source={require("../../../assets/img/logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text h4 style={{ color: CST.colorSec }}>
        SIN MATCHES
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
});
