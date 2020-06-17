import React from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Text, Image, Icon } from "react-native-elements";
import CST from "../utils/CustomSettings";
import { AVATAR_DEFAULT } from "../constants";

export default function ListTopSale(props) {
  const { navigation, brokersOffers, ciudad } = props;
  console.log(props);

  return (
    <View>
      {brokersOffers.length === 0 ? (
        <NotFoundMatches />
      ) : (
        brokersOffers.map((item, i) => (
          <ListItem
            key={item.brk_id}
            title={item.brk_name}
            subtitle={
              <View style={styles.viewReview}>
                <Text style={styles.textAmenity}>{item.brk_mail}</Text>
              </View>
            }
            leftAvatar={{
              source: {
                uri: item.brk_avatar ? item.brk_avatar : AVATAR_DEFAULT,
              },
              size: "medium",
            }}
            onPress={() =>
              navigation.navigate("ShowSalesMan", {
                salesMan: item,
                navigation: navigation,
                ciudad: ciudad,
              })
            }
            chevron
            bottomDivider
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
        source={require("../../assets/img/logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text h4 style={{ color: CST.colorSec }}>
        TOP 20 VACIO
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
  },
  viewReview: {
    marginBottom: 5,
    marginHorizontal: 3,
  },
  viewFormMedia: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  textAmenity: {
    fontSize: 16,
    marginTop: 0,
  },
});
