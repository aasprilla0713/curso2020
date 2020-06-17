import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Button, ListItem } from "react-native-elements";
import CST from "../../utils/CustomSettings";
import Loading from "../../components/Loading";
import ListMatchesOrd from "../../components/Coincidences/ListMatchesOrd";
import ListMatchesOfr from "../../components/Coincidences/ListMatchesOfr";
import { getMatchesOrd, getMatchesOfr } from "../../utils/ReloadEnv";
import { getItem } from "../../utils/Storage";
import { USER_INFO } from "../../constants";
import { MainContext } from "../../context/MainContext";

export default function Coincidences(props) {
  const { navigation } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadMatch, setReloadMatch] = useState(false);

  const { infoBroker, matchesOrd, matchesOfr } = useContext(MainContext);

  useEffect(() => {
    setReloadMatch(false);
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
            title="PEDIDOS"
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
            title="OFERTAS"
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
          <ListMatchesOrd
            navigation={navigation}
            matchesOrders={matchesOrd}
            curBroker={infoBroker}
            setReloadMatch={setReloadMatch}
          />
        ) : (
          <ListMatchesOfr
            navigation={navigation}
            matchesOffers={matchesOfr}
            curBroker={infoBroker}
            setReloadMatch={setReloadMatch}
          />
        )}
      </View>
      <Loading isVisible={isLoading} text="Cargando Oferta" />
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
