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
import {
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import Map from "./Map";
import Carousel from "./Carousel";
import CST from "../utils/CustomSettings";
import { URL_OFFERT, AVATAR_DEFAULT } from "../constants";

const screenWidth = Dimensions.get("window").width;

export default function OfferDetail(props) {
  console.log("detalle");
  console.log(props);
  const { offert, navigation } = props;
  const [imagesMatch, setImagesMatch] = useState([]);
  const [location, setLocation] = useState(null);
  console.log("aca");
  console.log(offert.ofr_latitud);

  useEffect(() => {
    const arrayUrls = [];

    (async () => {
      const imageOfr = URL_OFFERT + offert.ofr_image1;
      arrayUrls.push(imageOfr);
      if (offert.ofr_image2) {
        const image2 = URL_OFFERT + offert.ofr_image2;
        arrayUrls.push(image2);
      }
      if (offert.ofr_image3) {
        const image3 = URL_OFFERT + offert.ofr_image3;
        arrayUrls.push(image3);
      }
      if (offert.ofr_image4) {
        const image4 = URL_OFFERT + offert.ofr_image4;
        arrayUrls.push(image4);
      }
      if (offert.ofr_image5) {
        const image5 = URL_OFFERT + offert.ofr_image5;
        arrayUrls.push(image5);
      }
      setImagesMatch(arrayUrls);
      let cur_locat = null;
      if (Number.parseFloat(offert.ofr_latitud) > 0) {
        cur_locat = {
          latitude: Number.parseFloat(offert.ofr_latitud),
          latitudeDelta: Number.parseFloat(offert.ofr_latitudDelta),
          longitude: Number.parseFloat(offert.ofr_longitud),
          longitudeDelta: Number.parseFloat(offert.ofr_longitudDelta),
        };
      } else {
        cur_locat = null;
      }
      setLocation(cur_locat);
    })();
  }, []);

  return (
    <View style={{ flex: 1, marginHorizontal: 2, backgroundColor: "#fff" }}>
      <View style={{ width: "100%" }}>
        <ScrollView style={StyleSheet.viewBody}>
          <Carousel
            arrayImages={imagesMatch}
            width={screenWidth}
            height={250}
          />
          <TitleMatch offert={offert} />
          <EstateInfo
            location={location}
            name={offert.ofr_address}
            nota={offert.ofr_nota}
          />
        </ScrollView>
      </View>
    </View>
  );
}

function HeaderMatch(props) {
  const { offert } = props;
  const imageUrl = offert.ofr_avatar;
  const urlImage = imageUrl ? imageUrl : AVATAR_DEFAULT;
  return (
    <View style={styles.ViewEstateTitle}>
      <ListItem
        key={1}
        leftAvatar={{ source: { uri: urlImage } }}
        title={offert.oferente}
        subtitle={offert.mail_oferente}
        bottomDivider
        chevron
      />
    </View>
  );
}

function TitleMatch(props) {
  const { offert } = props;
  const imageUrl = offert.ofr_avatar;
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
        <Text style={styles.textAmenity}>{offert.tin_nombre}</Text>
        <Text
          style={[
            styles.textAmenity,
            { fontWeight: "bold", color: CST.colorPrm },
          ]}
        >
          ${Number.parseInt(offert.ofr_precio)}M
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
        <Text style={styles.textAmenity}>{offert.zna_nombre}</Text>
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
          {offert.ofr_address.substr(0, 50)}
        </Text>
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
          {"Area: " + Number.parseInt(offert.ofr_area)} mts
        </Text>
        <MaterialCommunityIcons
          name="floor-plan"
          size={25}
          color={CST.colorPrm}
        />
        <Text style={styles.textAmenity}>
          {"Lote: " + Number.parseInt(offert.ofr_lote)} mts
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
        <Text style={styles.textAmenity}>{offert.ofr_alcobas}</Text>
        <FontAwesome name="bed" size={25} color={CST.colorPrm} />
        <Text style={styles.textAmenity}>{offert.ofr_banos}</Text>
        <MaterialCommunityIcons name="toilet" size={25} color={CST.colorPrm} />
        <Text style={styles.textAmenity}>{offert.ofr_parking}</Text>
        <AntDesign name="car" size={25} color={CST.colorPrm} />
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
        <Text style={styles.textAmenity}>{offert.ofr_nota}</Text>
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
    borderBottomColor: "#EAECF1",
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
