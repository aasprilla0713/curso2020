import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, ListItem, Text, Icon } from "react-native-elements";
import ActionButton from "react-native-action-button";
import {
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import Map from "../../components/Map";
import Carousel from "../../components/Carousel";
import Loading from "../../components/Loading";
import CST from "../../utils/CustomSettings";
import { URL_OFFERT, AVATAR_DEFAULT } from "../../constants";

import ListMessages from "../../components/ListMessages";
import Modal from "../../components/Modal";
import SendMessageForm from "../../components/Coincidences/SendMessage";
import FinishMatchForm from "../../components/Coincidences/FinishMatchForm";
import CancelMatchForm from "../../components/Coincidences/CancelMatchForm";
import ShowDetalleBrk from "../../components/Coincidences/ShowDetalleBrk";

const screenWidth = Dimensions.get("window").width;

export default function MatchPedido(props) {
  const { navigation, route } = props;
  const { matchesOrder, curBroker, setReloadMatch } = route.params;
  const [selectedPanel, setSelectedPanel] = useState(1);
  const [imagesMatch, setImagesMatch] = useState([]);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updMatches, setUpdMatches] = useState(true);
  const [textLoading, setTextLoading] = useState("");
  const [renderComponent, setRenderComponent] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleDetails, setIsVisibleDetails] = useState(false);
  const toastRef = useRef();
  console.log("aca");
  console.log(matchesOrder.ofr_latitud);

  useEffect(() => {
    const arrayUrls = [];

    (async () => {
      const imageOfr = URL_OFFERT + matchesOrder.ofr_image1;
      arrayUrls.push(imageOfr);
      if (matchesOrder.ofr_image2) {
        arrayUrls.push(URL_OFFERT + matchesOrder.ofr_image2);
      }
      if (matchesOrder.ofr_image3) {
        arrayUrls.push(URL_OFFERT + matchesOrder.ofr_image3);
      }
      if (matchesOrder.ofr_image4) {
        arrayUrls.push(URL_OFFERT + matchesOrder.ofr_image4);
      }
      if (matchesOrder.ofr_image5) {
        arrayUrls.push(URL_OFFERT + matchesOrder.ofr_image5);
      }
      setImagesMatch(arrayUrls);
      let cur_locat = null;
      if (Number.parseFloat(matchesOrder.ofr_latitud) > 0) {
        cur_locat = {
          latitude: Number.parseFloat(matchesOrder.ofr_latitud),
          latitudeDelta: Number.parseFloat(matchesOrder.ofr_latitudDelta),
          longitude: Number.parseFloat(matchesOrder.ofr_longitud),
          longitudeDelta: Number.parseFloat(matchesOrder.ofr_longitudDelta),
        };
      } else {
        cur_locat = null;
      }
      setLocation(cur_locat);
    })();
    setIsLoading(false);
  }, []);

  const updateIndex = (index) => {
    setSelectedPanel(index);
  };

  const selecttedComponent = (key) => {
    setIsVisibleModal(true);
    switch (key) {
      case "sendMessage":
        setRenderComponent(
          <SendMessageForm
            navigation={navigation}
            fuente={1}
            matchesOrder={matchesOrder}
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
            setReloadMatch={setReloadMatch}
          />
        );
        setIsVisibleModal(true);
        break;
      case "cancelMatch":
        setRenderComponent(
          <CancelMatchForm
            navigation={navigation}
            fuente={1}
            matchesOrder={matchesOrder}
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
            setReloadMatch={setReloadMatch}
          />
        );
        setIsVisibleModal(true);
        break;
      case "approbeMatch":
        setRenderComponent(
          <FinishMatchForm
            navigation={navigation}
            fuente={1}
            matchesOrder={matchesOrder}
            setIsVisibleModal={setIsVisibleModal}
            toastRef={toastRef}
            setReloadMatch={setReloadMatch}
          />
        );
        setIsVisibleModal(true);
        break;
      case "showDetalleBrk":
        setRenderComponent(
          <ShowDetalleBrk
            navigation={navigation}
            fuente={1}
            matchesOrder={matchesOrder}
            setIsVisibleModal={setIsVisibleModal}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 2, backgroundColor: "#fff" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 0,
        }}
      >
        <View style={styles.viewBtn}>
          <Button
            icon={
              <View style={{ width: 26, height: 26, margin: 5 }}>
                <FontAwesome
                  name="search"
                  size={26}
                  color={selectedPanel === 1 ? CST.colorPrm : CST.colorSec}
                />
              </View>
            }
            type="clear"
            buttonStyle={
              selectedPanel === 1 ? styles.btnStyle1 : styles.btnStyle2
            }
            containerStyle={
              selectedPanel === 1 ? styles.btnContainer1 : styles.btnContainer2
            }
            titleStyle={
              selectedPanel === 1 ? styles.btnTitle1 : styles.btnTitle2
            }
            onPress={() => updateIndex(1)}
          />
        </View>
        <View style={styles.viewBtn}>
          <Button
            type="clear"
            icon={
              <View style={{ width: 26, height: 26, margin: 5 }}>
                <FontAwesome
                  name="comments-o"
                  size={26}
                  color={selectedPanel === 2 ? CST.colorPrm : CST.colorSec}
                />
                {matchesOrder.chats > 0 && (
                  <View
                    style={{
                      // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
                      position: "absolute",
                      right: -10,
                      top: -1,
                      backgroundColor: "green",
                      borderRadius: 8,
                      width: 15,
                      height: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 9,
                        fontWeight: "bold",
                      }}
                    >
                      {matchesOrder.chats}
                    </Text>
                  </View>
                )}
              </View>
            }
            buttonStyle={
              selectedPanel === 2 ? styles.btnStyle1 : styles.btnStyle2
            }
            containerStyle={
              selectedPanel === 2 ? styles.btnContainer1 : styles.btnContainer2
            }
            titleStyle={
              selectedPanel === 2 ? styles.btnTitle1 : styles.btnTitle2
            }
            onPress={() => updateIndex(2)}
          />
        </View>
      </View>
      <View style={{ width: "100%" }}>
        {selectedPanel === 1 ? (
          <ScrollView style={StyleSheet.viewBody}>
            <Text
              style={{
                marginHorizontal: 10,
                marginVertical: 5,
                fontSize: 15,
                marginTop: 5,
                fontWeight: "600",
                color: CST.colorPrm,
                textAlign: "center",
              }}
            >
              {matchesOrder.cnc_date.substr(0, 10)}
            </Text>
            <Carousel
              arrayImages={imagesMatch}
              width={screenWidth}
              height={200}
            />
            <HeaderMatch
              matchesOrder={matchesOrder}
              selecttedComponent={selecttedComponent}
            />
            <TitleMatch matchesOrder={matchesOrder} />
            <EstateInfo
              location={location}
              name={matchesOrder.ofr_address}
              nota={matchesOrder.ofr_nota}
            />
          </ScrollView>
        ) : (
          <ListMessages
            navigation={navigation}
            matchesOrder={matchesOrder}
            fuente={1}
          />
        )}
      </View>
      <AddMessageBotton
        navigation={navigation}
        matchesOrder={matchesOrder}
        curBroker={curBroker}
        setIsVisibleModal={setIsVisibleModal}
        selecttedComponent={selecttedComponent}
      />
      <Loading isVisible={isLoading} text="Cargando datos" />
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

function HeaderMatch(props) {
  const { matchesOrder, selecttedComponent } = props;
  const imageUrl = matchesOrder.ofr_avatar;
  const urlImage = imageUrl ? imageUrl : AVATAR_DEFAULT;
  return (
    <View style={styles.ViewEstateTitle}>
      <ListItem
        key={1}
        leftAvatar={{ source: { uri: urlImage } }}
        title={matchesOrder.oferente}
        subtitle={matchesOrder.mail_oferente}
        bottomDivider
        chevron
        onPress={() => selecttedComponent("showDetalleBrk")}
      />
    </View>
  );
}

function TitleMatch(props) {
  const { matchesOrder } = props;
  const imageUrl = matchesOrder.ofr_avatar;
  const urlImage = imageUrl ? imageUrl : AVATAR_DEFAULT;
  return (
    <View style={styles.ViewEstateTitle}>
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
        <Text style={styles.textAmenity}>{matchesOrder.zna_nombre}</Text>
      </View>
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
        <Text style={styles.textAmenity}>
          {matchesOrder.ofr_address.substr(0, 50)}
        </Text>
        <TouchableOpacity
          onPress={() => Alert.alert("NOTA VENDEDOR", matchesOrder.ofr_nota)}
        >
          <MaterialCommunityIcons
            name="account-details"
            size={25}
            color={CST.colorPrm}
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.viewFormMedia,
          {
            marginVertical: 0,
            marginHorizontal: 0,
            backgroundColor: "#fff",
            padding: 15,
            paddingTop: 10,
          },
        ]}
      >
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
      <View
        style={[
          styles.viewFormMedia,
          {
            marginVertical: 0,
            marginHorizontal: 0,
            backgroundColor: "#fff",
            padding: 15,
            paddingTop: 10,
          },
        ]}
      >
        <Text style={styles.textAmenity}>{matchesOrder.ofr_alcobas}</Text>
        <FontAwesome name="bed" size={25} color={CST.colorPrm} />
        <Text style={styles.textAmenity}>{matchesOrder.ofr_banos}</Text>
        <MaterialCommunityIcons name="toilet" size={25} color={CST.colorPrm} />
        <Text style={styles.textAmenity}>{matchesOrder.ofr_parking}</Text>
        <AntDesign name="car" size={25} color={CST.colorPrm} />
      </View>
    </View>
  );
}

function EstateInfo(props) {
  const { location, name, nota } = props;
  console.log(location);
  return (
    <View style={styles.viewEstateInfo}>
      {location ? <Map location={location} name={name} height={130} /> : null}
    </View>
  );
}

function AddMessageBotton(props) {
  const {
    navigation,
    matchesOrder,
    curBroker,
    setIsVisibleModal,
    selecttedComponent,
  } = props;
  console.log(matchesOrder);
  return (
    <ActionButton buttonColor={CST.colorPrm} size={55} spacing={10}>
      <ActionButton.Item
        buttonColor="#4885ed"
        size={55}
        title=""
        onPress={() => selecttedComponent("sendMessage")}
      >
        <Icon type="material-community" name="chat" color="#fff" size={30} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#db3236"
        size={55}
        title=""
        onPress={() => selecttedComponent("cancelMatch")}
      >
        <Icon
          type="material-community"
          name="trash-can-outline"
          color="#fff"
          size={30}
        />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3cba54"
        size={55}
        title=""
        onPress={() => selecttedComponent("approbeMatch")}
      >
        <Icon type="material-community" name="hand" color="#fff" size={30} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#000000"
        size={55}
        title=""
        onPress={() =>
          navigation.navigate("SearchContacts", {
            navigation: navigation,
            curBroker: curBroker,
            curOffer: matchesOrder.id,
          })
        }
      >
        <Icon type="material-community" name="share" color="#fff" size={30} />
      </ActionButton.Item>
    </ActionButton>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "transparent",
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5,
  },
  ViewEstateTitle: {
    margin: 0,
  },
  nameEstate: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  descriptionEstate: {
    marginTop: 5,
    color: "grey",
  },
  viewEstateInfo: {
    margin: 0,
    marginTop: 1,
    paddingTop: 0,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  estateInfoTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  continerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
  viewFormMedia: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
    borderBottomWidth: 0.4,
    borderBottomColor: "#BEC0C4",
  },
  textAmenity: {
    fontSize: 16,
    paddingTop: 5,
  },
  textGestion: {
    fontSize: 18,
    fontWeight: "600",
    paddingTop: 5,
  },
  logo: {
    width: 200,
    height: 200,
  },
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
