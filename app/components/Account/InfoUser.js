import React, { useState } from "react";
import { View } from "react-native";
import { Icon, ListItem } from "react-native-elements";

export default function InfoUser(props) {
  const {
    userInfo,
    setReloadData,
    toastRef,
    setIsLoading,
    setTextLoading,
  } = props;
  const [uid, setUid] = useState(userInfo.brk_mail);

  return (
    <>
      <View style={{ marginBottom: 20 }}>
        <ListItem
          key={1}
          title={userInfo.brk_company}
          leftIcon={
            <Icon
              type="material-community"
              name="shield-account-outline"
              color="#c2c2c2"
              size={25}
              underlayColor="#fff"
            />
          }
          bottomDivider
        />
        <ListItem
          key={2}
          title={userInfo.brk_cargo}
          leftIcon={
            <Icon
              type="material-community"
              name="seat-recline-extra"
              color="#c2c2c2"
              size={25}
              underlayColor="#fff"
            />
          }
          bottomDivider
        />
        <ListItem
          key={3}
          title={userInfo.brk_telefono}
          leftIcon={
            <Icon
              type="material-community"
              name="phone"
              color="#c2c2c2"
              size={25}
              underlayColor="#fff"
            />
          }
          bottomDivider
        />
      </View>
    </>
  );
}
