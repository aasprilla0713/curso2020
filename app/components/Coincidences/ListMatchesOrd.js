import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  Card,
  Button,
  ListItem,
  Avatar,
  Text,
  Image,
  Badge,
  Divider,
} from "react-native-elements";
import {
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import CST from "../../utils/CustomSettings";
import CacheImage from "../../utils/CacheImages";
import { AVATAR_DEFAULT, URL_AVATAR, URL_OFFERT } from "../../constants";

export default function ListMatchesOrd(props) {
  const { navigation, matchesOrders, curBroker, setReloadMatch } = props;
  console.log(matchesOrders);
  return (
    <View style={{ width: "100%", marginBottom: 40 }}>
      {matchesOrders.length === 0 ? (
        <NotFoundMatches />
      ) : (
        <FlatList
          data={matchesOrders}
          renderItem={(matchesOrder) => (
            <Match
              matchesOrder={matchesOrder.item}
              navigation={navigation}
              curBroker={curBroker}
              setReloadMatch={setReloadMatch}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function Match(props) {
  const { curBroker, matchesOrder, navigation, setReloadMatch } = props;
  const imageUrl = matchesOrder.ofr_avatar;
  const urlImage = imageUrl ? imageUrl : AVATAR_DEFAULT;
  const imageOfr = matchesOrder.ofr_image1;
  const urlOffer = imageOfr
    ? URL_OFFERT + imageOfr
    : "../../../assets/img/no-image.png";

  return (
    <View style={styles.viewReview}>
      <Card
        containerStyle={{
          marginVertical: 2,
          marginHorizontal: 2,
          width: "100%",
        }}
        title={
          <View
            style={[
              styles.viewFormMedia,
              {
                borderBottomWidth: 0.4,
                borderBottomColor: CST.colorPrm,
                marginBottom: 3,
              },
            ]}
          >
            <View
              style={{
                padding: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              {matchesOrder.chats > 0 ? (
                <View>
                  <Avatar
                    rounded
                    source={{
                      uri: urlImage,
                    }}
                    size="medium"
                  />

                  <Badge
                    value={matchesOrder.chats}
                    status="primary"
                    containerStyle={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                    }}
                  />
                </View>
              ) : (
                <Avatar
                  rounded
                  size="medium"
                  source={{
                    uri: urlImage,
                  }}
                />
              )}
              <View>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 16,
                    paddingTop: 5,
                    fontWeight: "600",
                  }}
                >
                  {matchesOrder.oferente.substr(0, 20)}...
                </Text>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 14,
                    paddingTop: 0,
                    fontWeight: "600",
                    color: CST.colorPrm,
                  }}
                >
                  {matchesOrder.cnc_date.substr(0, 10) +
                    " - " +
                    matchesOrder.cnc_date.substr(10, 6)}
                </Text>
              </View>
            </View>
          </View>
        }
        subtitle
      >
        <CacheImage uri={urlOffer} style={{ width: "100%", height: 180 }} />
        <View
          style={[
            styles.viewFormMedia,
            {
              marginVertical: 0,
              marginHorizontal: 0,
              backgroundColor: "#fff",
              padding: 10,
              paddingBottom: 15,
            },
          ]}
        >
          <Text style={styles.textAmenity}>{matchesOrder.tin_nombre}</Text>
          <Text
            style={[
              styles.textAmenity,
              { fontWeight: "bold", color: CST.colorPrm },
            ]}
          >
            ${Number.parseInt(matchesOrder.ofr_precio)}M
          </Text>
        </View>
        <Divider />
        <ListItem
          key={2}
          title={matchesOrder.zna_nombre}
          leftIcon={{
            type: "material-community",
            name: "google-maps",
            color: "#00a680",
            onPress: () => console.log("Aca"),
          }}
          bottomDivider
        />
        <ListItem key={3} title={matchesOrder.ofr_address} bottomDivider />
        <View style={[styles.viewFormMedia, { marginTop: 15 }]}>
          <Text style={styles.textAmenity}>
            {"Area: " + Number.parseInt(matchesOrder.ofr_area)} mts
          </Text>
          <MaterialCommunityIcons
            name="floor-plan"
            size={25}
            color={CST.colorPrm}
          />
          <Text style={styles.textAmenity}>
            {"Lote: " + Number.parseInt(matchesOrder.ofr_lote)} mts
          </Text>
          <FontAwesome name="map-o" size={20} color={CST.colorPrm} />
        </View>
        <Divider />
        <View style={[styles.viewFormMedia, { marginTop: 15 }]}>
          <Text style={styles.textAmenity}>{matchesOrder.ofr_alcobas}</Text>
          <FontAwesome name="bed" size={25} color={CST.colorPrm} />
          <Text style={styles.textAmenity}>{matchesOrder.ofr_banos}</Text>
          <MaterialCommunityIcons
            name="toilet"
            size={25}
            color={CST.colorPrm}
          />
          <Text style={styles.textAmenity}>{matchesOrder.ofr_parking}</Text>
          <AntDesign name="car" size={25} color={CST.colorPrm} />
        </View>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="VER DETALLES"
          type="clear"
          titleStyle={{ color: CST.colorPrm }}
          containerStyle={styles.btnContainer}
          onPress={() =>
            navigation.navigate("MatchPedido", {
              matchesOrder: matchesOrder,
              navigation: navigation,
              curBroker: curBroker,
              setReloadMatch: setReloadMatch,
            })
          }
        />
      </Card>
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
  btnContainer: {
    width: "100%",
    borderTopWidth: 0.4,
    borderTopColor: CST.colorPrm,
  },
  viewReview: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  viewFormMedia: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textAmenity: {
    fontSize: 16,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
