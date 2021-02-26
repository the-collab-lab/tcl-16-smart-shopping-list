import React from "react";
import "./Navbar.scss";

import { ReactComponent as MCB } from "../../img/meat_cheese_bread.svg";
import { ReactComponent as ListView } from "../../img/list_view.svg";
import { ReactComponent as AddItem } from "../../img/add_item.svg";
import { ReactComponent as ChangeList } from "../../img/change_list.svg";
import { ReactComponent as ShareList } from "../../img/share_list.svg";

import { Link, useHistory } from "react-router-dom";
import swal from "@sweetalert/with-react";

export default function Navbar(props) {
  const history = useHistory();

  const shareTokenHandler = () => {
    const token = localStorage.getItem("token");
    swal({
      title: token,
      text:
        "Write down this three-word token phrase to share access with friends or reaccess this list yourself",
      dangerMode: true,
    });
  };

  const clearTokenHandler = () => {
    swal({
      title: "Do you want to eject this list and access another?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        localStorage.removeItem("token");
        props.setAuth(false);
        history.push("/");
        swal({
          text: "You have successfully logged out",
          icon: "success",
          buttons: false,
          timer: 2000,
        });
      }
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
            <Link className="navLink" onClick={clearTokenHandler}>
              <ChangeList />
            </Link>
            <Link className="navLink" onClick={shareTokenHandler}>
              <ShareList />
            </Link>
          </nav>
        </header>
      )}
    </>
  );
}
