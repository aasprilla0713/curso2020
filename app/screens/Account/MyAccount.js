import React, { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import UserGuest from "../Account/UserGuest";

export default function MyAccount() {
  const { infoBroker } = useContext(MainContext);
  return <UserGuest />;
}
