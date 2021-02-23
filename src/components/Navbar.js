import React from "react";

import { ReactComponent as MCB } from "../img/meat_cheese_bread.svg";
import { ReactComponent as ListView } from "../img/list_view.svg";
import { ReactComponent as AddItem } from "../img/add_item.svg";
import { ReactComponent as ChangeList } from "../img/change_list.svg";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navContainer">
        <div className="navStyle">
          <MCB />
          <h1>MCB</h1>
          <div className="navLink">
            <Link to="/List">
              <ListView />
            </Link>
          </div>
          <div className="navLink">
            <Link to="/AddItem">
              <AddItem />
            </Link>
          </div>
          <div className="navLink">
            <Link to="/">
              <ChangeList />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
