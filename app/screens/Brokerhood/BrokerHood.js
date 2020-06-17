import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import { Rating, ListItem, Icon } from "react-native-elements";
import Carousel from "../../components/Carousel";
import ListMembers from "../../components/BrokerHood/ListMembers";
import BrokerhoodGestion from "../../components/BrokerHood/BrokerHoodGestion";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import CST from "../../utils/CustomSettings";
import { URL_AVATAR } from "../../constants";

//Se importa firebase para uso de los datos
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const screenWidth = Dimensions.get("window").width;

export default function BrokerHood(props) {
  const { navigation, route } = props;
  const { brokerhood } = route.params;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const [imagesBrokerhood, setImagesBrokerhood] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const [userLogged, setUserLogged] = useState(false);
  const toastRef = useRef();

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useEffect(() => {
    const arrayUrls = [];
    const imageUrl = URL_AVATAR + brokerhood.bkh_avatar;
    arrayUrls.push(imageUrl);

    setImagesBrokerhood(arrayUrls);
  }, []);

  return (
    <ScrollView>
      <View style={StyleSheet.viewBody}>
        <View style={styles.viewFavorite}>
          <Text style={styles.brokerhoodDate}>
            {brokerhood.createdAt.substr(0, 16)}
          </Text>
        </View>
        <Carousel
          arrayImages={imagesBrokerhood}
          width={screenWidth}
          height={150}
        />
        <TitleBrokerhood
          bkh_nombre={brokerhood.bkh_nombre}
          bkh_asunto={brokerhood.bkh_asunto}
          createdAt={brokerhood.createdAt}
        />
        <BrokerhoodGestion
          navigation={navigation}
          idBrokerhood={brokerhood.id}
          nmBrokerhood={brokerhood.bkh_nombre}
          brokerhood={brokerhood}
        />
        <ListMembers
          navigation={navigation}
          idBrokerhood={brokerhood.bkh_id}
          nmBrokerhood={brokerhood.bkh_nombre}
          toastRef={toastRef}
          brokerhood={brokerhood}
        />
        <Toast ref={toastRef} position="center" opacity={0.5} />
        <Loading isVisible={isLoading} text={textLoading} />
      </View>
    </ScrollView>
  );
}

function TitleBrokerhood(props) {
  const { bkh_nombre, bkh_asunto, createdAt } = props;
  const bkhOption = [
    {
      title: bkh_nombre,
      subtitle: bkh_asunto,
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => Alert.alert(bkh_nombre),
    },
  ];

  return (
    <View style={styles.ViewBrokerhoodTitle}>
      {bkhOption.map((menu, index) => (
        <ListItem
          key={index}
          title={
            index === 0 ? (
              <Text style={styles.titleStyle}>{menu.title}</Text>
            ) : (
              menu.title
            )
          }
          subtitle={<Text style={styles.subtitleStyle}>{menu.subtitle}</Text>}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          continerStyle={StyleSheet.menuItem}
          bottomDivider
        />
      ))}
    </View>
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
    backgroundColor: "transparent",
    borderBottomLeftRadius: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 5,
  },
  ViewBrokerhoodTitle: {
    marginBottom: 25,
    marginLeft: -15,
  },
  nameBrokerhood: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  descriptionBrokerhood: {
    marginTop: 5,
    fontSize: 15,
    color: "grey",
  },
  viewBrokerhoodInfo: {
    margin: 15,
    marginTop: 25,
  },
  brokerhoodInfoTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  continerListItem: {
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
  },
  brokerhoodDate: {
    marginTop: 5,
    color: CST.colorPrm,
    fontSize: 16,
    textAlign: "right",
  },
  brokerhoodDescription: {
    marginTop: 5,
    color: "#fff",
    fontSize: 22,
    textAlign: "right",
    textTransform: "capitalize",
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitleStyle: {
    fontSize: 15,
    textTransform: "capitalize",
  },
});
