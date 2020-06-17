import React, { useState, useRef } from "react";
import { View } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddBrokerHoodForm from "../../components/BrokerHood/AddBrokerHoodForm";

export default function AddBrokerHood(props) {
  const { navigation, route } = props;
  const { brokerInfo, setIsReloadBrokerhoods } = route.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View>
      <AddBrokerHoodForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        brokerInfo={brokerInfo}
        setIsReloadBrokerhoods={setIsReloadBrokerhoods}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Procesando... por favor espere" />
    </View>
  );
}
