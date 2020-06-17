import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Button, ListItem, Avatar, Rating } from "react-native-elements";
import SRV from "../../utils/Service";
import AvatarCache from "../../utils/AvatarCache";
import AddMemberForm from "./AddMemberForm";
import Modal from "../Modal";
import { URL_AVATAR, AVATAR_DEFAULT } from "../../constants";

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ListMembers(props) {
  const {
    navigation,
    idBrokerhood,
    nmBrokerhood,
    toastRef,
    brokerhood,
  } = props;
  console.log(brokerhood);
  const [members, setMembers] = useState([]);
  const [membersReload, setMembersReload] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  useEffect(() => {
    //Se invoca funcion asyncrona que obtiene el total de los grupos creados por el usuario
    (async () => {
      const resultMembers = [];
      let data = await SRV.getBrokerhoodMembers(idBrokerhood);
      data.forEach((data) => {
        let member = data;
        resultMembers.push({ member });
      });
      setMembers(resultMembers);
    })();
    setMembersReload(false);
  }, []);

  return (
    <View>
      <MembersLength
        numMembers={members.length}
        idBrokerhood={idBrokerhood}
        nmBrokerhood={nmBrokerhood}
        navigation={navigation}
        setIsVisibleModal={setIsVisibleModal}
        setRenderComponent={setRenderComponent}
        setMembersReload={setMembersReload}
        toastRef={toastRef}
        brokerhood={brokerhood}
      />
      <FlatList
        data={members}
        renderItem={(member) => <Member member={member} />}
        keyExtractor={(item, index) => index.toString()}
      />
      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

function Member(props) {
  const {
    id_mobile,
    mbr_id,
    brk_name,
    brk_email,
    mbr_desde,
    brk_avatar,
    mbr_admin,
  } = props.member.item.member;
  const curr_user = firebase.auth().currentUser.uid;
  const imageUrl = brk_avatar;
  const urlImage = imageUrl ? imageUrl : AVATAR_DEFAULT;

  return (
    <View style={styles.viewReview}>
      <View style={styles.viewImageAvatar}>
        <AvatarCache
          uri={urlImage}
          size="large"
          style={styles.userInfoAvatar}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
        />
      </View>
      <View style={styles.viewInfo}>
        <Text
          style={
            id_mobile === curr_user ? styles.reviewTitleU : styles.reviewTitle
          }
        >
          {id_mobile === curr_user ? "Tú" : brk_name}
        </Text>
        <Text style={styles.reviewAdmin}>{mbr_admin}</Text>
      </View>
    </View>
  );
}

function MembersLength(props) {
  const {
    numMembers,
    idBrokerhood,
    nmBrokerhood,
    navigation,
    setIsVisibleModal,
    setRenderComponent,
    setMembersReload,
    toastRef,
    brokerhood,
  } = props;
  const bkhOption = [
    {
      title: numMembers + " BROKER(S)",
      iconType: "material-community",
      iconNameLeft: "account-group-outline",
      iconColorLeft: "#3380FF",
      iconNameRight: "account-multiple-plus-outline",
      iconColorRight: "#3380FF",
      orden: 2,
      onPress: () => selecttedComponent("displayOption"),
    },
  ];

  const selecttedComponent = (key) => {
    switch (key) {
      case "displayOption":
        setIsVisibleModal(true);
        setRenderComponent(
          <AddMemberForm
            setIsVisibleModal={setIsVisibleModal}
            setMembersReload={setMembersReload}
            toastRef={toastRef}
            navigation={navigation}
            idBrokerhood={idBrokerhood}
            nmBrokerhood={nmBrokerhood}
            brokerhood={brokerhood}
          />
        );
        setIsVisibleModal(true);
        break;
      case "displayContacts":
        navigation.navigate("SearchContacts", {
          navigation: navigation,
          idBrokerhood: idBrokerhood,
        });
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.ViewBrokerhoodTitle}>
      {bkhOption.map((menu, index) => (
        <ListItem
          key={index}
          title={
            <Text
              style={menu.orden === 1 ? styles.titleStyle1 : styles.titleStyle2}
            >
              {menu.title}
            </Text>
          }
          subtitle={menu.subtitle}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          onPress={menu.onPress}
          continerStyle={StyleSheet.menuItem}
          bottomDivider
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent",
  },
  btnTitleAddReview: {
    color: "#00a680",
  },
  viewReview: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingBottom: 5,
    paddingTop: 5,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  viewImageAvatar: {
    marginRight: 15,
  },
  userInfoAvatar: {
    width: 40,
    height: 40,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontSize: 15,
    paddingTop: 10,
  },
  reviewTitleU: {
    fontSize: 18,
    paddingTop: 10,
    fontWeight: "bold",
  },
  reviewAdmin: {
    marginTop: -15,
    color: "grey",
    fontSize: 14,
    position: "absolute",
    right: 10,
    bottom: 10,
    fontWeight: "bold",
  },
  reviewText: {
    paddingTop: 8,
    color: "grey",
    marginBottom: 5,
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  titleStyle1: {
    fontSize: 18,
    color: "#2c2c2c",
  },
  titleStyle2: {
    fontSize: 18,
    color: "#3380FF",
  },
});
