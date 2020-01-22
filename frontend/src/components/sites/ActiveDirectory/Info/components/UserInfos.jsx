import React from "react";
import InfoRow from "./InfoRow";

const UserInfos = ({ user, sid, enabled, thumbnail }) => {
  const userAccountControl = uac => {
    const control = position => {
      if ((uac & (1 << position)) !== 0) {
        return true;
      } else {
        return false;
      }
    };

    const result = [
      {
        isSet: control(0),
        text: "wird das Anmeldeskript ausgeführt werden."
      }, //1
      {
        isSet: control(1),
        text: "Benutzerkonto ist deaktiviert."
      }, //2 (//4)
      {
        isSet: control(3),
        text: "Basisordner ist erforderlich."
      }, //8
      { isSet: control(4), text: "LOCKOUT" }, //16
      {
        isSet: control(5),
        text: "Es ist kein Kennwort erforderlich."
      }, //32
      {
        isSet: control(6),
        text: "Kann das Kennwort nicht ändern."
      }, //64
      {
        isSet: control(7),
        text: "Kann ein verschlüsseltes Kennwort setzen."
      }, //128
      {
        isSet: control(8),
        text: "TEMP_DUPLICATE_ACCOUNT"
      }, //256
      { isSet: control(9), text: "Standardaccount" }, //512 (//1024)
      {
        isSet: control(11),
        text: "INTERDOMAIN_TRUST_ACCOUNT"
      }, //2048
      {
        isSet: control(12),
        text: "WORKSTATION_TRUST_ACCOUNT"
      }, //4096
      {
        isSet: control(13),
        text:
          "Computerkonto für einen Domänencontroller, der Mitglied dieser Domäne ist."
      }, //8192 (//16384 // 32768)
      {
        isSet: control(16),
        text: "Kennwort läuft nie ab."
      }, //65536
      {
        isSet: control(17),
        text: "Ein MNS Login Account"
      }, //131072
      {
        isSet: control(18),
        text: "Login per Smartcard erforderlich"
      }, //262144
      {
        isSet: control(19),
        text: "TRUSTED_FOR_DELEGATION"
      }, //524288
      { isSet: control(20), text: "NOT_DELEGATED" }, //1048576
      { isSet: control(21), text: "USE_DES_KEY_ONLY" }, //2097152
      {
        isSet: control(22),
        text:
          "dieses Konto erfordert keine Kerberos-Vorauthentifizierung für die Anmeldung."
      }, //4194304
      {
        isSet: control(23),
        text: "Das Kennwort des Benutzers ist abgelaufen."
      }, //8388608
      {
        isSet: control(24),
        text: "TRUSTED_TO_AUTH_FOR_DELEGATION"
      }, //16777216 (//33554432)
      {
        isSet: control(26),
        text: "Schreibgeschützter Domänencontroller (RODC)"
      } //67108864
    ];

    return (
      <>
        <div>Value: {uac}</div>
        <ul style={{ marginBottom: "0" }}>
          {result.map((item, index) => {
            if (item.isSet) return <li key={index}>{item.text}</li>;
            return null;
          })}
        </ul>
      </>
    );
  };

  const toDate = timestamp => {
    const hours = timestamp.substr(8, 2);
    const minutes = timestamp.substr(10, 2);
    const seconds = timestamp.substr(12, 2);

    const day = timestamp.substr(6, 2);
    const month = timestamp.substr(4, 2);
    const year = timestamp.substr(0, 4);

    return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
  };

  const arrayBufferToBase64 = buffer => {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const getMemberOf = () => {
    if (Array.isArray(user.memberOf)) {
      user.memberOf = user.memberOf.sort();

      return (
        <ul>
          {user.memberOf.map((grp, i) => {
            return <li key={i}>{grp.split(",")[0].substr(3)}</li>;
          })}
        </ul>
      );
    } else {
      return (
        <ul>
          <li>{user.memberOf.split(",")[0].substr(3)}</li>
        </ul>
      );
    }
  };

  if (user === null) return null;

  return (
    <>
      {console.log(thumbnail)}
      {thumbnail && (
        <img
          src={`data:image/png;base64,${arrayBufferToBase64(thumbnail)}`}
          alt=""
        />
      )}
      <InfoRow value={sid} text="ObjectSid" style={{ marginTop: "50px" }} />
      <InfoRow value={user.dn} text="DN" />
      <InfoRow value={user.cn} text="Name" />
      {user.mail && <InfoRow value={user.mail} text="Mail" />}
      {enabled && (
        <InfoRow value={enabled === 1 ? "True" : "False"} text="Aktiv" />
      )}

      {user.userAccountControl && (
        <InfoRow
          valueStyle={{ display: "grid" }}
          value={userAccountControl(user.userAccountControl)}
          text="userAccountControl"
        />
      )}
      {user.whenCreated && (
        <InfoRow value={toDate(user.whenCreated)} text="Erstellt am" />
      )}
      {user.whenChanged && (
        <InfoRow value={toDate(user.whenChanged)} text="Geändert am" />
      )}
      {user.memberOf && <InfoRow value={getMemberOf()} text="Mitglied" />}
    </>
  );
};

export default UserInfos;
