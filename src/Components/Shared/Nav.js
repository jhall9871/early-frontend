import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTachometerAlt,
  faComments,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../../App";

const Nav = ({ handleLogOut }) => {
  const { userType } = useContext(DataContext);

  return (
    <nav>
      <Link to="/" >
        <FontAwesomeIcon icon={faHome} title="home"/>
      </Link>
      <Link to="/messages">
        <FontAwesomeIcon icon={faComments} title="messages" />
      </Link>
      <Link to={`/${userType}`}>
        <FontAwesomeIcon icon={faTachometerAlt} title="dashboard" />
      </Link>
      <Link to="/" onClick={handleLogOut}>
        <FontAwesomeIcon icon={faSignOutAlt} title="sign out"/>
      </Link>
    </nav>
  );
};

export default Nav;
