import React from "react";
import "./Navbar.scss";
import "../../styles/base.scss";

import { ReactComponent as MCB } from "../../img/meat_cheese_bread.svg";
import { ReactComponent as ListView } from "../../img/list_view.svg";
import { ReactComponent as AddItem } from "../../img/add_item.svg";
import { ReactComponent as ChangeList } from "../../img/change_list.svg";
import { ReactComponent as ShareList } from "../../img/share_list.svg";

import { Link } from "react-router-dom";
import swal from "@sweetalert/with-react";

export default function Navbar(props) {
  const shareTokenHandler = () => {
    const token = localStorage.getItem("token");
    swal({
      title: token,
      text: "Use this token to share this shopping list with friends",
      dangerMode: true,
    });
  };

  return (
    <>
      {!props.auth ? (
        <header className="navContainer">
          <main className="navStyle">
            <Link className="homeLink" to="/">
              <MCB />
              <h1>MCB</h1>
            </Link>
          </main>
        </header>
      ) : (
        <header className="navContainer">
          <nav className="navStyle">
            <Link className="homeLink" to="/">
              <MCB />
              <h1>MCB</h1>
            </Link>
            <Link className="navLink" to="/List">
              <ListView />
            </Link>
            <Link className="navLink" to="/AddItem">
              <AddItem />
            </Link>
            <Link className="navLink" to="/">
              <ChangeList />
            </Link>
            <Link className="navLink" to="/" onClick={shareTokenHandler}>
              <ShareList />
            </Link>
          </nav>
        </header>
      )}
    </>
  );
}
