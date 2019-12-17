import React from "react";
import InfoRow from "./InfoRow";

const GroupInfos = ({ group, sid }) => {
  const toDate = timestamp => {
    const hours = timestamp.substr(8, 2);
    const minutes = timestamp.substr(10, 2);
    const seconds = timestamp.substr(12, 2);

    const day = timestamp.substr(6, 2);
    const month = timestamp.substr(4, 2);
    const year = timestamp.substr(0, 4);

    return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
  };

  const getMember = () => {
    if (Array.isArray(group.member)) {
      group.member = group.member.sort();

      return (
        <ul>
          {group.member.map((grp, i) => {
            return <li key={i}>{grp.split(",")[0].substr(3)}</li>;
          })}
        </ul>
      );
    } else {
      return (
        <ul>
          <li>{group.member.split(",")[0].substr(3)}</li>
        </ul>
      );
    }
  };

  if (group === null) return null;

  return (
    <>
      <InfoRow value={sid} text="ObjectSid" />
      <InfoRow value={group.dn} text="DN" />
      <InfoRow value={group.cn} text="Name" />
      <InfoRow value={group.description} text="Beschreibung" />
      {/* {user.mail && <InfoRow value={user.mail} text="Mail" />} */}
      {/* {enabled && (
        <InfoRow value={enabled === 1 ? "True" : "False"} text="Aktiv" />
      )} */}

      {group.whenCreated && (
        <InfoRow value={toDate(group.whenCreated)} text="Erstellt am" />
      )}
      {group.whenChanged && (
        <InfoRow value={toDate(group.whenChanged)} text="Geändert am" />
      )}
      {group.member && <InfoRow value={getMember()} text="Mitglied" scroll />}
    </>
  );
};

export default GroupInfos;
