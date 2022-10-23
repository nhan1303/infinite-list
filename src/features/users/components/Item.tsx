import React from "react";
import { IUser } from "@features/users/types";

export interface IItemProps {
  user: IUser;
  index: number;
}

export const Item: React.FC<IItemProps> = ({ user, index }) => {
  return (
    <div
      style={{
        position: "relative",
        borderBottom: "1px solid yellow",
        padding: 8,
        textAlign: "center",
      }}
    >
      <div>{`Row index ${index}`}</div>
      <div>{`User id ${user.id}`}</div>
      <div>{`User name ${user.name}`}</div>
      <div>{`User email ${user.email}`}</div>
      <img
        width={80}
        height={80}
        style={{
          borderRadius: "50%",
          position: "absolute",
          top: 8,
          left: 8,
        }}
        src={user.avatar}
        alt={user.name}
      />
    </div>
  );
};

export default Item;
