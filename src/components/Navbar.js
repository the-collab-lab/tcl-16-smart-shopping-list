import React from "react";
import { ReactComponent as MCB } from "../img/meat_cheese_bread.svg";
import { ReactComponent as ListView } from "../img/list_view.svg";
import { ReactComponent as AddItem } from "../img/add_item.svg";
import { ReactComponent as ChangeList } from "../img/change_list.svg";

import { Link } from "react-router-dom";

export default function Navbar() {
  const navContainer = {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    alignContent: "space-between",
    textAlign: "center",
  };

  const link = {
    marginLeft: "10%",
  };

  return (
    <>
      <div style={navContainer}>
        <div style={navStyle}>
          <MCB />
          <h1>MCB</h1>
          <div style={link}>
            <Link to="/List">
              <ListView />
            </Link>
          </div>
          <div style={link}>
            <Link to="/AddItem">
              <AddItem />
            </Link>
          </div>
          <div style={link}>
            <Link to="/Home">
              <ChangeList />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
