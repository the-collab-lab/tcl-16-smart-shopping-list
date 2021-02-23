import React from "react";

import { ReactComponent as MCB } from "../img/meat_cheese_bread.svg";
import { ReactComponent as ListView } from "../img/list_view.svg";
import { ReactComponent as AddItem } from "../img/add_item.svg";
import { ReactComponent as ChangeList } from "../img/change_list.svg";
import { ReactComponent as ShareList } from "../img/share_list.svg";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navContainer">
        <div className="navStyle">
          <MCB />
          <h1>MCB</h1>
          <Link className="navLink" to="/List">
            <ListView />
          </Link>
          <Link className="navLink" to="/AddItem">
            <AddItem />
          </Link>
          <Link className="navLink" to="/">
            <ChangeList />
          </Link>
          <Link className="navLink" to="/">
            <ShareList />
          </Link>
        </div>
      </div>
    </>
  );
}
