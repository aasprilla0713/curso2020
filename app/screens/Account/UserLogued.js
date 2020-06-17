import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, ScrollView, View, Text, Dimensions } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOption";
import AccountGestion from "../../components/Account/AccountGestion";
import CST from "../../utils/CustomSettings";
import SRV from "../../utils/Service";
import { getItem, updateItem } from "../../utils/Storage";
import { getMatchesOrd, getMatchesOfr } from "../../utils/ReloadEnv";
import { USER_INFO, AVATAR_DEFAULT } from "../../constants";
import { MainContext } from "../../context/MainContext";

export default function UserLogued(props) {
  console.log(props);
  const [userInfo, setUserInfo] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [textLoading, setTextLoading] = useState("Cargando Datos");
  const [uid, setUid] = useState(userInfo.brk_mail);

  const { setInfoBroker, setMatchesOrd, setMatchesOfr } = useContext(
    MainContext
  );

  const updateIndex = (index) => {
    setSelectedIndex(index);
  };

  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      let cur_broker = await getItem(USER_INFO);
      cur_broker = JSON.parse(cur_broker);
      setUserInfo(cur_broker);
      setInfoBroker(cur_broker);
      const matchOfr = await getMatchesOfr();
      setMatchesOfr(matchOfr);
      const matchOrd = await getMatchesOrd();
      setMatchesOrd(matchOrd);
    })();
    setReloadData(false);
    setIsLoading(false);
  }, [reloadData]);

  const getToken = async () => {
    console.log("entrando 3");
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status != "granted") {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);

    let val_broker = await SRV.updateTokenBroker(userInfo.id_mobile, 3, token);
    if (val_broker.type > 0) {
      return;
    } else {
      Alert.alert(val_broker.message);
    }
  };

  const changeAvatar = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermissions.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Acceso a la galeria denegado");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        //Cancela la galeria
        toastRef.current.show("Proceso cancelado");
      } else {
        //Se carga la imagen se pasa la ruta y el nombre de usuario
        uploadImage(result.uri, uid).then(() => {
          //Imagen subida correctamente
          updatePhotoUrl(uid);
        });
      }
    }
  };

  const uploadImage = async (uri, nameImage) => {
    setTextLoading("Actualizando Avatar");
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = (uid) => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);
        updateBroker();
      })
      .catch(() => {
        //Error descargando la foto
        toastRef.current.show("Error al descargar la foto");
      });
  };

  const updateBroker = async () => {
    const user = firebase.auth().currentUser;
    let val_broker = await SRV.updateAvatar(
      firebase.auth().currentUser.uid,
      user.photoURL
    );
    if (val_broker.type > 0) {
      let new_foto = { brk_avatar: user.photoURL };
      await updateItem(USER_INFO, JSON.stringify(new_foto));
      console.log(val_broker.broker);
      setReloadData(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      Alert.alert(val_broker.message);
    }
  };

  return (
    <ScrollView style={styles.viewUserInfo}>
      <View style={styles.viewUserInf}>
        <Avatar
          rounded
          size="large"
          showEditButton
          onEditPress={changeAvatar}
          containerStyle={styles.userInfoAvatar}
          source={{
            uri: userInfo.brk_avatar ? userInfo.brk_avatar : AVATAR_DEFAULT,
          }}
        />
        <View>
          <Text style={styles.displayName}>
            {userInfo.brk_name ? userInfo.brk_name : "ANONIMO"}
          </Text>
          <Text>{userInfo.brk_mail}</Text>
        </View>
      </View>

      <AccountGestion userInfo={userInfo} toastRef={toastRef} />
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <Toast ref={toastRef} position="center" opacity={0.8} />
      <Loading text="CARGANDO DATOS" isVisible={isLoading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    flex: 1,
    backgroundColor: "transparent",
  },
  viewUserInf: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 20,
    marginTop: 1,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    paddingTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: CST.colorPrm,
  },
  btnCloseSessionText: {
    color: "#fff",
    fontWeight: "bold",
    zIndex: 2,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
    zIndex: 2,
  },
});
