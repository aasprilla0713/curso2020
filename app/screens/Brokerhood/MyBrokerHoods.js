import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import { Icon } from "react-native-elements";

import Loading from "../../components/Loading";
import MyBrokerHoodsForm from "../../components/BrokerHood/MyBrokerHoodsForm";
import GestionGen from "../../components/BrokerHood/GestionGen";
import { getItem } from "../../utils/Storage";
import { USER_INFO, GESTION_GEN } from "../../constants";
import { cargarBhoods } from "../../utils/ReloadEnv";
import CST from "../../utils/CustomSettings";
import { MainContext } from "../../context/MainContext";

export default function MyBrokerHoods(props) {
  const { navigation } = props;
  const [gestionGen, setGestionGen] = useState({});
  const [brokerInfo, setBrokerInfo] = useState({});
  const [brokerHoods, setBrokerHoods] = useState([]);
  const [inMemoryBhoods, setInMemoryBhoods] = useState([]);
  const [loguedBh, setLoguedBh] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verGestion, setVerGestion] = useState(true);
  const [isReloadBrokerhoods, setIsReloadBrokerhoods] = useState(false);

  const { infoBroker } = useContext(MainContext);

  useEffect(() => {
    (async () => {
      const resultBrokerhoods = [];
      //Se obtienen los datos de Broker Actual desde AsyncStorage
      let cur_gestion = await getItem(GESTION_GEN);
      cur_gestion = JSON.parse(cur_gestion);
      setGestionGen(cur_gestion);
      console.log(gestionGen);
      //Se obtienen los datos de Broker Actual desde AsyncStorage
      let cur_broker = await getItem(USER_INFO);
      cur_broker = JSON.parse(cur_broker);
      setBrokerInfo(cur_broker);
      //Se obtienen BrokerHoods desde AsyncStorage
      const broker_hoods = await cargarBhoods();
      setBrokerHoods(broker_hoods);
      setInMemoryBhoods(broker_hoods);
      setLoguedBh(true);
    })();
    setIsReloadBrokerhoods(false);
  }, [isReloadBrokerhoods]);

  if (loguedBh === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }
  return (
    <View style={styles.viewBody}>
      {verGestion ? (
        <MyBrokerHoodsForm
          navigation={navigation}
          brokerHoods={brokerHoods}
          brokerInfo={brokerInfo}
          setBrokerHoods={setBrokerHoods}
          inMemoryBhoods={inMemoryBhoods}
          setIsReloadBrokerhoods={setIsReloadBrokerhoods}
          setIsLoading={setIsLoading}
        />
      ) : (
        <GestionGen navigation={navigation} gestionGen={gestionGen} />
      )}

      <AddBrokerhoodBotton
        navigation={navigation}
        brokerInfo={brokerInfo}
        setIsReloadBrokerhoods={setIsReloadBrokerhoods}
        verGestion={verGestion}
        setVerGestion={setVerGestion}
      />
      <Loading isVisible={isLoading} text="Procesando... por favor espere" />
    </View>
  );
}

function AddBrokerhoodBotton(props) {
  const {
    navigation,
    brokerInfo,
    setIsReloadBrokerhoods,
    verGestion,
    setVerGestion,
  } = props;
  return (
    <ActionButton buttonColor={CST.colorPrm} size={55} spacing={10}>
      <ActionButton.Item
        buttonColor={"#3cba54"}
        size={55}
        title=""
        onPress={() => setVerGestion(!verGestion)}
      >
        <MaterialCommunityIcons
          name="cloud-search-outline"
          name={!verGestion ? "rotate-left" : "cloud-search-outline"}
          color="#fff"
          size={25}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#65A4CA"
        size={55}
        title=""
        onPress={() =>
          navigation.navigate("SearchCity", {
            navigation: navigation,
            curBroker: brokerInfo,
            origen: 2,
          })
        }
      >
        <Icon
          type="material-community"
          name="home-city-outline"
          color="#fff"
          size={25}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#db3236"
        size={55}
        title=""
        onPress={() =>
          navigation.navigate("SearchCity", {
            navigation: navigation,
            curBroker: brokerInfo,
            origen: 1,
          })
        }
      >
        <Icon
          type="material-community"
          name="city-variant-outline"
          color="#fff"
          size={25}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#4885ed"
        size={55}
        title=""
        onPress={() =>
          navigation.navigate("AddBrokerhood", {
            brokerInfo: brokerInfo,
            setIsReloadBrokerhoods: setIsReloadBrokerhoods,
          })
        }
      >
        <Icon
          type="material-community"
          name="account-group-outline"
          color="#fff"
          size={25}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#F4B400"
        size={55}
        title=""
        onPress={() =>
          navigation.navigate("MyBrokerInvitation", {
            navigation: navigation,
            curBroker: brokerInfo,
            setIsReloadBrokerhoods: setIsReloadBrokerhoods,
          })
        }
      >
        <MaterialCommunityIcons
          name="account-multiple-check"
          color="#fff"
          size={25}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#000000"
        size={55}
        title=""
        onPress={() =>
          navigation.navigate("SearchContacts", {
            navigation: navigation,
            curBroker: brokerInfo,
            curOffer: 0,
            setIsReloadBrokerhoods: setIsReloadBrokerhoods,
          })
        }
      >
        <MaterialCommunityIcons name="phone" color="#fff" size={25} />
      </ActionButton.Item>
    </ActionButton>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
});
