import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "react-native-action-button";
import { Icon } from "react-native-elements";

import Loading from "../../components/Loading";
import MyOffersForm from "../../components/BrokerHood/MyOffersForm";
import { cargarOffers } from "../../utils/ReloadEnv";
import CST from "../../utils/CustomSettings";

export default function MyBrokerOffers(props) {
  console.log(props);
  const { navigation, route } = props;
  const { curBroker } = route.params;
  const [brokerInfo, setBrokerInfo] = useState(curBroker);
  const [brokerOffers, setBrokerOffers] = useState([]);
  const [inMemoryOffers, setInMemoryOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloadBrokerOffers, setIsReloadBrokerOffers] = useState(false);

  useEffect(() => {
    (async () => {
      //Se obtienen las Ofertas
      const broker_offers = await cargarOffers();
      setBrokerOffers(broker_offers);
      setInMemoryOffers(broker_offers);
      console.log(broker_offers);
    })();
    setIsReloadBrokerOffers(false);
  }, [isReloadBrokerOffers]);

  return (
    <View style={styles.viewBody}>
      <MyOffersForm
        navigation={navigation}
        brokerOffers={brokerOffers}
        brokerInfo={brokerInfo}
        setBrokerOffers={setBrokerOffers}
        inMemoryOffers={inMemoryOffers}
        setIsReloadBrokerOffers={setIsReloadBrokerOffers}
        setIsLoading={setIsLoading}
      />
      <Loading isVisible={isLoading} text="Procesando... por favor espere" />
      <AddOffer navigation={navigation} brokerInfo={brokerInfo} />
    </View>
  );
}

function AddOffer(props) {
  const { navigation, brokerInfo } = props;
  return (
    <ActionButton
      buttonColor="#db3236"
      title="Cerra Sesión"
      onPress={() =>
        navigation.navigate("SearchCity", {
          navigation: navigation,
          curBroker: brokerInfo,
          origen: 3,
        })
      }
      renderIcon={(active) =>
        active ? (
          <Icon
            type="material-community"
            name="city-variant-outline"
            color="#fff"
            size={25}
          />
        ) : (
          <Icon
            type="material-community"
            name="city-variant-outline"
            color="#fff"
            size={25}
          />
        )
      }
    ></ActionButton>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
});
