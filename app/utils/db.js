import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("brokerhood.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS brokerhoods (id INTEGER PRIMARY KEY AUTOINCREMENT, bkh_id INTEGER NOT NULL, brk_id INTEGER NOT NULL, bkh_nombre VARCHAR(100) NOT NULL, bkh_asunto VARCHAR(255) NOT NULL, bkh_avatar BOLB, bkh_activo INTEGER NOT NULL, createdAt TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS brokers (id INTEGER PRIMARY KEY AUTOINCREMENT, brk_id INTEGER NOT NULL, id_mobile VARCHAR(50) NOT NULL, brk_name VARCHAR(100) NOT NULL, brk_mail VARCHAR(100) NOT NULL, brk_company VARCHAR(100), brk_telefono VARCHAR(15), brk_cargo VARCHAR(40), brk_ciudad VARCHAR(50), brk_avatar BLOB, brk_admin VARCHAR(5), createdAt TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, mbr_id INTEGER NOT NULL,bkh_id INTEGER NOT NULL, brk_id INTEGER NOT NULL, mbr_admin VARCHAR(5), mbr_activo INTEGER NOT NULL, createdAt TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tipo_inmueble (id INTEGER PRIMARY KEY AUTOINCREMENT, tin_id INTEGER NOT NULL, tin_nombre VARCHAR(50) NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertBrokerhood = (
  bkh_id,
  brk_id,
  bkh_nombre,
  bkh_asunto,
  bkh_avatar,
  bkh_activo,
  createdAt
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO brokerhoods (brk_id, bkh_nombre, bkh_asunto, bkh_avatar, bkh_activo, createdAt) VALUES (?, ?, ?, ?, ?, ?);",
        [
          bkh_id,
          brk_id,
          bkh_nombre,
          bkh_asunto,
          bkh_avatar,
          bkh_activo,
          createdAt,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertBroker = (
  brk_id,
  id_mobile,
  brk_name,
  brk_mail,
  createdAt
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO broker (brk_id, id_mobile, brk_name, brk_mail, createdAt) VALUES (?, ?, ?, ?, ?);",
        [brk_id, id_mobile, brk_name, brk_mail, createdAt],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertMember = (
  mbr_id,
  bkh_id,
  brk_id,
  mbr_admin,
  mbr_activo,
  createdAt
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO broker (mbr_id, bkh_id, brk_id, mbr_admin, mbr_activo, createdAt) VALUES (?, ?, ?, ?, ?, ?);",
        [mbr_id, bkh_id, brk_id, mbr_admin, mbr_activo, createdAt],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertTipoInm = (tim_id, tim_nombre) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO tipo_inmueble (tim_id, tim_nombre) VALUES (?, ?);",
        [tim_id, tim_nombre],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

/*CREATE TABLE `crmaales_sistema`.`Untitled`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `bkh_id` int(0) NULL DEFAULT 0,
  `brk_id` int(0) NULL DEFAULT 0,
  `mbr_id` int(0) NULL DEFAULT 0,
  `tin_id` int(0) NULL DEFAULT 0,
  `mtv_id` int(0) NULL DEFAULT 0,
  `mtv_nombre` varchar(20) NULL DEFAULT NULL,
  `ofr_area` decimal(12, 2) NULL,
  `ofr_precio` decimal(12, 2) NULL,
  `ofr_alcobas` smallint(3) NULL DEFAULT 0,
  `ofr_banos` smallint(2) NULL DEFAULT 0,
  `ofr_parking` smallint(2) NULL DEFAULT 0,
  `ofr_name` varchar(100) NULL DEFAULT NULL,
  `ofr_address` varchar(150) NULL DEFAULT NULL,
  `ofr_nota` text NULL,
  `ofr_latitud` varchar(25) NULL DEFAULT NULL,
  `ofr_latitudDelta` varchar(25) NULL DEFAULT NULL,
  `ofr_longitud` varchar(25) NULL DEFAULT NULL,
  `ofr_longitudDelta` varchar(25) NULL DEFAULT NULL,
  `ofr_activa` smallint(1) NULL DEFAULT 1,
  `ofr_image1` varchar(25) NULL DEFAULT NULL,
  `ofr_image2` varchar(25) NULL DEFAULT NULL,
  `ofr_image3` varchar(25) NULL DEFAULT NULL,
  `ofr_image4` varchar(25) NULL DEFAULT NULL,
  `ofr_image5` varchar(25) NULL DEFAULT NULL;
  `createdAt` datetime(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;*/
