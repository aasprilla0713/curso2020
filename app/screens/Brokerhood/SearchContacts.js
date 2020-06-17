import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import * as Contacts from "expo-contacts";
import { SwipeListView } from "react-native-swipe-list-view";
import Loading from "../../components/Loading";
import CST from "../../utils/CustomSettings";
import { URL_SHARE_OFFERT, URL_SHARE_INVITE } from "../../constants";

export default function SearchMembers(props) {
  const { navigation, route } = props;
  const { curOffer, curBroker } = route.params;
  const [brokers, setBrokers] = useState([]);
  const [findContact, setFindContact] = useState("");
  const [isLoading, setIsLoadin] = useState(false);
  const [allBrokers, setAllBrokers] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => sendOnWhatsApp(data)}
      >
        <Icon
          type="material-community"
          name="chat"
          color="#fff"
          containerStyle={styles.listIcon}
          size={35}
          underlayColor="#fff"
        />
        <Text style={styles.backTextWhite}>Chat</Text>
      </TouchableOpacity>
    </View>
  );

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const sendOnWhatsApp = (data) => {
    let numero = false;
    if (data.item.broker.phoneNumbers) {
      if (Platform.OS === "ios") {
        numero = data.item.broker.phoneNumbers[0].digits.toString();
        //? data.item.broker.phoneNumbers[0].digits.toString()
        //: false;
      } else {
        numero = data.item.broker.phoneNumbers[0].number.toString();
      }
    }

    if (numero) {
      if (curOffer === 0) {
        let url =
          "whatsapp://send?text=Descarga y únete a la revolución del colegaje: " +
          URL_SHARE_INVITE +
          "&phone=" +
          numero;

        Linking.openURL(url)
          .then((data) => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            Alert.alert("Debes instalar WhatsApp... :(");
          });
      } else {
        let url =
          "whatsapp://send?text=Por favor revise esta oferta para el pedido realizado " +
          URL_SHARE_OFFERT +
          curOffer +
          "&phone=" +
          numero;
        console.log(url);

        Linking.openURL(url)
          .then((data) => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            Alert.alert("Debes instalar WhatsApp... :(");
          });
      }
    } else {
      Alert.alert("POR FAVOR REGISTRE NUMERO TELEFONICO");
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        setIsLoadin(true);
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const resultContacts = [];
          data.forEach((data) => {
            let broker = data;
            resultContacts.push({ broker });
          });
          setBrokers(resultContacts);
          console.log(brokers);
        }
        setIsLoadin(false);
        setAllBrokers(false);
      }
    })();
  }, [allBrokers]);

  useEffect(() => {
    if (findContact) {
      setIsLoadin(true);
      const filteredBrokers = brokers.filter((brokers) => {
        let brokerLowercase = brokers.broker.name.toLowerCase();

        let searchLowercase = findContact.toLowerCase();

        return brokerLowercase.indexOf(searchLowercase) > -1;
      });
      setBrokers(filteredBrokers);
      setIsLoadin(false);
    } else {
      setIsLoadin(true);
      setAllBrokers(true);
      setIsLoadin(false);
    }
  }, [findContact]);

  return (
    <View style={styles.viewContainer}>
      <SearchBar
        placeholder="Buscar Contacto..."
        onChangeText={(e) => setFindContact(e)}
        value={findContact}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputSearh}
        inputStyle={styles.textStyle}
      />
      {brokers.length === 0 ? (
        <NotFoundBrokers />
      ) : (
        <SwipeListView
          style={{}}
          data={brokers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(broker, rowMap) => (
            <Broker
              broker={broker}
              navigation={navigation}
              curBroker={curBroker}
            />
          )}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-80}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      )}
      {isLoading ? (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#6A3E98" />
        </View>
      ) : null}
      <Loading text="Validando Credenciales..." isVisible={isVisibleLoading} />
    </View>
  );
}

function Broker(props) {
  const { broker, curBroker, navigation } = props;
  const { name, company, phoneNumbers } = broker.item.broker;
  const [imageMember, setImageMember] = useState("");
  return (
    <View style={styles.viewBrokerhood}>
      <View>
        <Text style={styles.brokerhoodName}>{name}</Text>
        <Text style={styles.brokerhoodDescription}>
          {company ? company : "Compañia no registrada"}
        </Text>
      </View>
      <Icon
        type="material-community"
        name="chevron-right"
        color="#CED2D2"
        containerStyle={styles.listRight}
        size={40}
        underlayColor="#fff"
      />
    </View>
  );
}

function NotFoundBrokers() {
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
      <Text style={{ fontSize: 18, color: "#6A3E98" }}>NO CONTACTS FOUND</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  searchBar: {
    marginBottom: 1,
    backgroundColor: CST.colorPrm,
    padding: 3,
    borderWidth: 0,
  },
  inputSearh: {
    backgroundColor: "transparent",
  },
  textStyle: {
    color: "white",
  },
  itemList: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 80,
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#DDD",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    margin: 1,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 80,
  },
  backRightBtnLeft: {
    backgroundColor: "#25d366",
    right: 0,
  },
  backRightBtnCenter: {
    backgroundColor: "#4885ed",
    right: 0,
  },
  listIcon: {
    top: 0,
  },
  listRight: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  listLeft: {
    position: "absolute",
    left: 5,
    bottom: 10,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  viewBrokerhood: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 1,
    padding: 5,
  },
  viewBrokerhoodImage: {
    marginRight: 15,
  },
  imageBrokerhood: {
    width: 50,
    height: 50,
  },
  brokerhoodName: {
    fontWeight: "bold",
    marginTop: 4,
    fontSize: 16,
    textTransform: "capitalize",
  },
  brokerhoodDescription: {
    paddingTop: 2,
    paddingBottom: 4,
    color: "grey",
    width: 300,
    fontSize: 15,
    textTransform: "capitalize",
  },
});
