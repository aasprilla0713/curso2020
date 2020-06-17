import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Image } from "react-native-elements";
import { getMessagesUsr } from "../utils/ReloadEnv";
import CST from "../utils/CustomSettings";

export default function ListMessages(props) {
  const { navigation, matchesOrder, fuente } = props;
  const [idMatch, setIdMatch] = useState(matchesOrder.id);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const resultMessages = [];
      const messagesUser = await getMessagesUsr(idMatch);
      setMessages(messagesUser);
    })();
  }, []);

  return (
    <View style={{ marginBottom: 60 }}>
      {matchesOrder.chats === 0 ? (
        <NotFoundMessages />
      ) : (
        <FlatList
          data={messages}
          renderItem={(message) =>
            fuente === 2 ? (
              <Oferta
                message={message}
                matchesOrder={matchesOrder}
                fuente={fuente}
              />
            ) : (
              <Pedido
                message={message}
                matchesOrder={matchesOrder}
                fuente={fuente}
              />
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

function NotFoundMessages() {
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Image
        source={require("../../assets/img/logo-login.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text h4 style={{ color: CST.colorSec }}>
        SIN MENSAJES
      </Text>
    </View>
  );
}

function Oferta(props) {
  const { message, matchesOrder, fuente } = props;
  console.log(message);

  const messageDate = message.item.msg_fecha.substr(0, 10);
  const messageHora = message.item.msg_fecha.substr(11, 5);
  return (
    <View
      style={
        message.item.id_ord === matchesOrder.id_ord
          ? styles.viewReview
          : styles.viewReview2
      }
    >
      <View
        style={
          message.item.id_ord === matchesOrder.id_ord
            ? styles.viewInfo
            : styles.viewInfo2
        }
      >
        <Text
          style={
            message.item.id_ord === matchesOrder.id_ord
              ? styles.reviewTitle
              : styles.reviewTitle2
          }
        >
          {message.item.id_ord === matchesOrder.id_ord
            ? message.item.msg_ord
            : "YO"}
        </Text>
        <Text
          style={
            message.item.id_ord === matchesOrder.id_ord
              ? styles.reviewText
              : styles.reviewText2
          }
        >
          {message.item.msg_texto}
        </Text>
        <Text
          style={
            message.item.id_ord === matchesOrder.id_ord
              ? styles.reviewDate
              : styles.reviewDate2
          }
        >
          {messageDate} A LAS {messageHora}
        </Text>
      </View>
    </View>
  );
}

function Pedido(props) {
  const { message, matchesOrder, fuente } = props;
  console.log(message);

  const messageDate = message.item.msg_fecha.substr(0, 10);
  const messageHora = message.item.msg_fecha.substr(11, 5);
  return (
    <View
      style={
        message.item.id_ord === matchesOrder.id_ofr
          ? styles.viewReview
          : styles.viewReview2
      }
    >
      <View
        style={
          message.item.id_ord === matchesOrder.id_ofr
            ? styles.viewInfo
            : styles.viewInfo2
        }
      >
        <Text
          style={
            message.item.id_ord === matchesOrder.id_ofr
              ? styles.reviewTitle
              : styles.reviewTitle2
          }
        >
          {message.item.id_ord === matchesOrder.id_ofr
            ? message.item.msg_ord
            : "YO"}
        </Text>
        <Text
          style={
            message.item.id_ord === matchesOrder.id_ofr
              ? styles.reviewText
              : styles.reviewText2
          }
        >
          {message.item.msg_texto}
        </Text>
        <Text
          style={
            message.item.id_ord === matchesOrder.id_ofr
              ? styles.reviewDate
              : styles.reviewDate2
          }
        >
          {messageDate} A LAS {messageHora}
        </Text>
      </View>
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
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  viewReview2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  viewInfo: {
    flex: 0.85,
    alignItems: "flex-start",
    margin: 5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    borderRadius: 15,
    backgroundColor: CST.colorPrm,
  },
  viewInfo2: {
    flex: 0.85,
    alignItems: "flex-start",
    margin: 5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    borderRadius: 15,
    backgroundColor: CST.colorSec,
  },
  reviewTitle: {
    fontWeight: "bold",
    color: "#fff",
  },
  reviewTitle2: {
    fontWeight: "bold",
    color: CST.colorPrm,
  },
  reviewText: {
    paddingTop: 2,
    color: "#fff",
    marginBottom: 15,
    textAlign: "justify",
  },
  reviewText2: {
    paddingTop: 2,
    color: CST.colorPrm,
    marginBottom: 15,
    textAlign: "justify",
  },
  reviewDate: {
    marginTop: 5,
    color: "#fff",
    fontSize: 12,
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  reviewDate2: {
    marginTop: 5,
    color: CST.colorPrm,
    fontSize: 12,
    position: "absolute",
    right: 15,
    bottom: 15,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
