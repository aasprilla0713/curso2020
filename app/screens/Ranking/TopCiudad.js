import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Button, ListItem } from "react-native-elements";
import CST from "../../utils/CustomSettings";
import Loading from "../../components/Loading";
import ListTopSale from "../../components/ListTopSale";
import ListTopBuy from "../../components/ListTopBuy";
import { getTopVenta, getTopCompra } from "../../utils/ReloadEnv";
import { getItem } from "../../utils/Storage";
import { USER_INFO } from "../../constants";

export default function Coincidences(props) {
  const { navigation, route } = props;
  const { ciudad } = route.params;
  console.log(props);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [brokersOffers, setBrokersOffers] = useState([]);
  const [brokersOrders, setBrokersOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  navigation.setOptions({ title: ciudad.ciu_nombre });

  useEffect(() => {
    (async () => {
      const matchOfr = await getTopVenta();
      setBrokersOffers(matchOfr);
      const matchOrd = await getTopCompra();
      setBrokersOrders(matchOrd);
    })();
    setIsLoading(false);
  }, []);

  const updateIndex = (index) => {
    setSelectedIndex(index);
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 2 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View style={styles.viewBtn}>
          <Button
            title="TOP VENTAS"
            type="clear"
            buttonStyle={
              selectedIndex === 1 ? styles.btnStyle1 : styles.btnStyle2
            }
            containerStyle={
              selectedIndex === 1 ? styles.btnContainer1 : styles.btnContainer2
            }
            titleStyle={
              selectedIndex === 1 ? styles.btnTitle1 : styles.btnTitle2
            }
            onPress={() => updateIndex(1)}
          />
        </View>
        <View style={styles.viewBtn}>
          <Button
            title="TOP COMPRAS"
            type="clear"
            buttonStyle={
              selectedIndex === 2 ? styles.btnStyle1 : styles.btnStyle2
            }
            containerStyle={
              selectedIndex === 2 ? styles.btnContainer1 : styles.btnContainer2
            }
            titleStyle={
              selectedIndex === 2 ? styles.btnTitle1 : styles.btnTitle2
            }
            onPress={() => updateIndex(2)}
          />
        </View>
      </View>
      <View style={{ width: "100%" }}>
        {selectedIndex === 1 ? (
          <ListTopSale
            navigation={navigation}
            brokersOffers={brokersOffers}
            ciudad={ciudad}
          />
        ) : (
          <ListTopBuy
            navigation={navigation}
            brokersOrders={brokersOrders}
            ciudad={ciudad}
          />
        )}
      </View>
      <Loading isVisible={isLoading} text="Cargando Datos" />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBtn: {
    flex: 0.5,
    marginBottom: 5,
  },
  btnContainer1: {
    width: "100%",
    borderBottomWidth: 0.4,
    borderBottomColor: CST.colorPrm,
  },
  btnContainer2: {
    width: "100%",
    borderBottomWidth: 0.4,
    borderBottomColor: CST.colorSec,
  },
  btnTitle1: {
    color: CST.colorPrm,
    fontWeight: "500",
  },
  btnTitle2: {
    color: CST.colorSec,
    fontWeight: "500",
  },
});
