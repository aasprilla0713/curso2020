import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import Loading from "../../components/Loading";
import CST from "../../utils/CustomSettings";
import { cargarCiudades } from "../../utils/ReloadEnv";

export default function SearchCity(props) {
  const { navigation, route } = props;
  const { origen, curBroker } = route.params;
  const [ciudades, setCiudades] = useState([]);
  const [inMemoryCiudades, setInMemoryCiudades] = useState([]);
  const [findCity, setFindCity] = useState("");
  const [isLoading, setIsLoadin] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const lst_ciudades = await cargarCiudades();
      setCiudades(lst_ciudades);
      setInMemoryCiudades(lst_ciudades);
    })();
  }, []);

  useEffect(() => {
    if (findCity) {
      setIsLoadin(true);
      const filteredCities = ciudades.filter((ciudades) => {
        let ciudadLowercase = ciudades.label.toLowerCase();

        let searchLowercase = findCity.toLowerCase();

        return ciudadLowercase.indexOf(searchLowercase) > -1;
      });
      setCiudades(filteredCities);
      setIsLoadin(false);
    } else {
      setIsLoadin(true);
      setCiudades(inMemoryCiudades);
      setIsLoadin(false);
    }
  }, [findCity]);

  return (
    <View style={styles.viewContainer}>
      <SearchBar
        placeholder="Buscar Ciudad..."
        onChangeText={(e) => setFindCity(e)}
        value={findCity}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputSearh}
        inputStyle={styles.textStyle}
      />
      {ciudades.length === 0 ? (
        <NotFoundCities />
      ) : (
        <FlatList
          style={{}}
          data={ciudades}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(ciudad, rowMap) => (
            <Ciudad
              origen={origen}
              ciudad={ciudad}
              navigation={navigation}
              curBroker={curBroker}
            />
          )}
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

function Ciudad(props) {
  const { origen, ciudad, curBroker, navigation } = props;
  const { label } = ciudad.item;
  return (
    <TouchableOpacity
      style={styles.touchHigh}
      underlayColor="#fff"
      onPress={() =>
        navigation.navigate("SearchComuna", {
          navigation: navigation,
          curBroker: curBroker,
          ciudad: ciudad.item,
          origen: origen,
        })
      }
    >
      <View style={styles.viewBrokerhood}>
        <View>
          <Text style={styles.brokerhoodName}>{label}</Text>
        </View>
        <Icon
          type="material-community"
          name="chevron-right"
          color="#CED2D2"
          containerStyle={styles.listRight}
          size={30}
          underlayColor="#fff"
        />
      </View>
    </TouchableOpacity>
  );
}

function NotFoundCities() {
  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
      <Text style={{ fontSize: 18, color: "#6A3E98" }}>NO HAY CIUDADES</Text>
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
  backLeftBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backLeftBtnLeft: {
    backgroundColor: "#E74453",
    left: 0,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "#25d366",
    right: 75,
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
    textTransform: "uppercase",
  },
  viewBrokerhood: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 1,
    padding: 10,
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
    textTransform: "uppercase",
  },
  brokerhoodDescription: {
    paddingTop: 2,
    paddingBottom: 4,
    color: "grey",
    width: 300,
    fontSize: 15,
    textTransform: "uppercase",
  },
});
