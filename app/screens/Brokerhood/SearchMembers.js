import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { SearchBar, Icon } from "react-native-elements";
import SRV from "../../utils/Service";
import AvatarCache from "../../utils/AvatarCache";
import { SwipeListView } from "react-native-swipe-list-view";
import Loading from "../../components/Loading";
import CST from "../../utils/CustomSettings";
import { reloadInfo } from "../../utils/ReloadEnv";

export default function SearchMembers(props) {
  const { navigation, route } = props;
  const {
    idBrokerhood,
    nombreBroker,
    emailBroker,
    telefonoBroker,
    nmBrokerhood,
    brokerhood,
    setMembersReload,
  } = route.params;
  console.log("buscando3");
  console.log(brokerhood);
  const [foundBrokers, setFoundBrokers] = useState([]);
  const [findContact, setFindContact] = useState("");
  const [isLoading, setIsLoadin] = useState(false);
  const [allBrokers, setAllBrokers] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnCenter]}
        onPress={() => sendOnEmail(data)}
      >
        <Icon
          type="material-community"
          name="account-multiple-check"
          color="#fff"
          containerStyle={styles.listIcon}
          size={35}
          underlayColor="#fff"
        />
        <Text style={styles.backTextWhite}>Inivitar</Text>
      </TouchableOpacity>
    </View>
  );

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const sendOnEmail = async (data) => {
    setIsVisibleLoading(true);
    let val_broker = await SRV.addMemberBroker(
      idBrokerhood,
      nmBrokerhood,
      data.item.broker.id,
      1
    );
    if (val_broker.type > 0) {
      let updInfo = await reloadInfo(val_broker.datos);
      setMembersReload(true);
      navigation.navigate("Brokerhood", {
        brokerhood: brokerhood,
      });
    } else {
      Alert.alert(val_broker.message);
      setIsVisibleLoading(false);
    }
  };

  useEffect(() => {
    //Se invoca funcion asyncrona que obtiene el total de los grupos creados por el usuario
    const traerMembers = async () => {
      setIsVisibleLoading(true);
      const resultBrokers = [];
      let data = await SRV.getFindBrokers(
        idBrokerhood,
        nombreBroker,
        emailBroker,
        telefonoBroker
      );
      data.forEach((data) => {
        let broker = data;
        resultBrokers.push({ broker });
      });
      setFoundBrokers(resultBrokers);
      setIsVisibleLoading(false);
    };
    //Se invoca la funcion Async
    traerMembers();
  }, []);

  useEffect(() => {
    let criterio = findContact.trim();
    //console.log(criterio.length);
    if (criterio.length >= 7) {
      const buscarMembers = async () => {
        setIsVisibleLoading(true);
        const resultBrokers = [];
        let data = await SRV.getFindBrokers2(idBrokerhood, findContact);
        data.forEach((data) => {
          let broker = data;
          resultBrokers.push({ broker });
        });
        setFoundBrokers(resultBrokers);
        setIsVisibleLoading(false);
      };
      //Se invoca la funcion Async
      buscarMembers();
    } else {
      setIsLoadin(true);
      setAllBrokers(true);
      setIsLoadin(false);
    }
  }, [findContact]);

  return (
    <View style={styles.viewContainer}>
      <SearchBar
        placeholder="Buscar Broker... min 8 caracteres"
        onChangeText={(e) => setFindContact(e)}
        value={findContact}
        containerStyle={styles.searchBar}
        inputContainerStyle={styles.inputSearh}
        inputStyle={styles.textStyle}
      />
      {foundBrokers.length === 0 ? (
        <NotFoundBrokers />
      ) : (
        <SwipeListView
          style={{}}
          data={foundBrokers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(broker, rowMap) => (
            <Broker
              broker={broker}
              navigation={navigation}
              idBrokerhood={idBrokerhood}
            />
          )}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
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
      <Loading
        text="Procesando, por favor espere..."
        isVisible={isVisibleLoading}
      />
    </View>
  );
}

function Broker(props) {
  const { broker, idBrokerhood, navigation } = props;
  const {
    brk_name,
    brk_company,
    brk_telefono,
    brk_avatar,
  } = broker.item.broker;
  const [imageMember, setImageMember] = useState("");
  const imageUrl = brk_avatar;
  const urlImage = imageUrl
    ? imageUrl
    : "http://2020.aal-estate.com/files/brokerhood/avatar/avatar-1.png";
  return (
    <View style={styles.viewBrokerhood}>
      <View style={styles.viewImageAvatar}>
        <AvatarCache
          uri={urlImage}
          size="large"
          style={styles.userInfoAvatar}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
      </View>
      <View>
        <Text style={styles.brokerhoodName}>{brk_name}</Text>
        <Text style={styles.brokerhoodDescription}>
          {brk_company ? brk_company : "Compañia no registrada"}
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
    width: 75,
  },
  backRightBtnCenter: {
    backgroundColor: "#F4B400",
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
  viewImageAvatar: {
    marginRight: 15,
  },
  userInfoAvatar: {
    width: 45,
    height: 45,
  },
});
