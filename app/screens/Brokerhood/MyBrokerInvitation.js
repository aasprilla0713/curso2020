import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import Loading from "../../components/Loading";
import MyBrokerInvitationForm from "../../components/BrokerHood/MyBrokerInvitationForm";
import { cargarBhoodsInv } from "../../utils/ReloadEnv";

export default function MyBrokerInvitation(props) {
  const { navigation, route } = props;
  const { curBroker, setIsReloadBrokerhoods } = route.params;
  const [brokerInfo, setBrokerInfo] = useState(curBroker);
  const [brokerInvita, setBrokerInvita] = useState([]);
  const [inMemoryInvita, setInMemoryInvita] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReloadBrokerInv, setIsReloadBrokerInv] = useState(false);

  useEffect(() => {
    (async () => {
      const resultBrokerhoods = [];
      //Se obtienen BrokerHoods desde AsyncStorage
      const broker_hoods = await cargarBhoodsInv();
      setBrokerInvita(broker_hoods);
      setInMemoryInvita(broker_hoods);
    })();
    setIsLoading(false);
    setIsReloadBrokerInv(false);
  }, [isReloadBrokerInv]);

  return (
    <View style={styles.viewBody}>
      <MyBrokerInvitationForm
        navigation={navigation}
        brokerInvita={brokerInvita}
        brokerInfo={brokerInfo}
        setBrokerInvita={setBrokerInvita}
        inMemoryInvita={inMemoryInvita}
        setIsLoading={setIsLoading}
        setIsReloadBrokerhoods={setIsReloadBrokerhoods}
      />
      <Loading isVisible={isLoading} text="Procesando... por favor espere" />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
});
