import React, { useState } from "react";

const MainContext = React.createContext();
const { Provider, Consumer } = MainContext;

function MainProvider({ children }) {
  const [matchesOrd, setMatchesOrd] = useState([]);
  const [matchesOfr, setMatchesOfr] = useState([]);
  const [infoBroker, setInfoBroker] = useState({
    brk_activo: 0,
    brk_admin: null,
    brk_avatar: null,
    brk_cargo: null,
    brk_catches: 0,
    brk_ciudad: null,
    brk_company: null,
    brk_hits: 0,
    brk_invita: 0,
    brk_mail: null,
    brk_matches: 0,
    brk_name: null,
    brk_offers: 0,
    brk_orders: 0,
    brk_parent: 0,
    brk_telefono: null,
    brk_token: null,
    brk_vence: null,
    ciu_id: 0,
    createdAt: null,
    id: 0,
    id_mobile: null,
  });

  return (
    <Provider
      value={{
        infoBroker,
        setInfoBroker,
        matchesOfr,
        setMatchesOfr,
        matchesOrd,
        setMatchesOrd,
      }}
    >
      {children}
    </Provider>
  );
}

export { MainProvider, Consumer as MainConsumer, MainContext };
