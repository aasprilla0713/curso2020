import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import Modal from "../Modal";
import SRV from "../../utils/Service";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

export default function AccountGestion(props) {
  const { userInfo, setReloadData, toastRef } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [currBroker, setCurrBroker] = useState("");

  useEffect(() => {
    //Se invoca funcion asyncrona que obtiene el broker asociado al usuario
    const traerBroker = async () => {
      const curr_user = firebase.auth().currentUser.uid;
      let data = await SRV.getBroker(curr_user);
      setCurrBroker(data);
    };

    //Se invoca la funcion Async
    traerBroker();
  }, []);

  return (
    <View style={styles.viewGestion}>
      <View style={styles.viewBrokerhood}>
        <Icon
          type="material-community"
          name="account-circle-outline"
          color="#c2c2c2"
          containerStyle={styles.listRight}
          size={25}
          underlayColor="#fff"
        />
        {currBroker.brk_name ? (
          <Text style={styles.brokerhoodName}>{currBroker.brk_name}</Text>
        ) : (
          <Text style={styles.brokerPlaceh}>{currBroker.brk_name}</Text>
        )}
      </View>
      <View style={styles.viewBrokerhood}>
        <Icon
          type="material-community"
          name="shield-account-outline"
          color="#c2c2c2"
          containerStyle={styles.listRight}
          size={25}
          underlayColor="#fff"
        />
        {currBroker.brk_company ? (
          <Text style={styles.brokerhoodName}>{currBroker.brk_company}</Text>
        ) : (
          <Text style={styles.brokerPlaceh}>Compañía</Text>
        )}
      </View>
      <View style={styles.viewBrokerhood}>
        <Icon
          type="material-community"
          name="at"
          color="#c2c2c2"
          containerStyle={styles.listRight}
          size={25}
          underlayColor="#fff"
        />
        {currBroker.brk_mail ? (
          <Text style={styles.brokerhoodName}>{currBroker.brk_mail}</Text>
        ) : (
          <Text style={styles.brokerPlaceh}>Correo Electrónico</Text>
        )}
      </View>
      <View style={styles.viewBrokerhood}>
        <Icon
          type="material-community"
          name="phone"
          color="#c2c2c2"
          containerStyle={styles.listRight}
          size={25}
          underlayColor="#fff"
        />
        {currBroker.brk_telefono ? (
          <Text style={styles.brokerhoodName}>{currBroker.brk_telefono}</Text>
        ) : (
          <Text style={styles.brokerPlaceh}>Número Telefónico</Text>
        )}
      </View>
      <View style={styles.viewBrokerhood}>
        <Icon
          type="material-community"
          name="seat-recline-extra"
          color="#c2c2c2"
          containerStyle={styles.listRight}
          size={25}
          underlayColor="#fff"
        />
        {currBroker.brk_cargo ? (
          <Text style={styles.brokerhoodName}>{currBroker.brk_cargo}</Text>
        ) : (
          <Text style={styles.brokerPlaceh}>Cargo que Ocupa</Text>
        )}
      </View>

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewGestion: {
    marginBottom: 25,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  viewBrokerhood: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    margin: 1,
    padding: 8,
  },
  brokerhoodName: {
    marginTop: 4,
    fontSize: 18,
    marginLeft: 50,
  },
  listRight: {
    position: "absolute",
    left: 10,
    bottom: 2,
  },
  brokerPlaceh: {
    marginTop: 4,
    fontSize: 18,
    marginLeft: 50,
    color: "#c2c2c2",
  },
});
