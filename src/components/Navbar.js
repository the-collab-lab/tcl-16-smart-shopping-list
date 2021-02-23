import React from "react";
import { ReactComponent as MCB } from "./img/meat_cheese_bread.svg";
import { Link, useRouteMatch } from "react-router-dom";

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
    marginLeft: "1%",
  };

  return (
    <>
      <div style={navContainer}>
        <div style={navStyle}>
          <MCB />
          <h1>MCB</h1>
          <div style={link}>
            <MenuLink activeWhenExact={true} pathTo="/List" label="List View" />
          </div>
          <div style={link}>
            <MenuLink pathTo="/AddItem" label="Add Item" />
          </div>
        </div>
      </div>
    </>
  );
}

const MenuLink = ({ label, pathTo, activeWhenExact = false }) => {
  let match = useRouteMatch({
    path: pathTo,
    exact: activeWhenExact,
  });

  return (
    <div className={match ? "active" : ""}>
      <Link to={pathTo}>{label}</Link>
    </div>
  );
};
