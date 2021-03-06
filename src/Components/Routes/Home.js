import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faChalkboardTeacher,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

const Home = ({ handleLogIn, handleLogInChange }) => {
  const { user } = useContext(DataContext);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setSubmitLoading(false);
  }, [user]);

  const handleSubmitClassChange = () => {
    setSubmitLoading(true);
  };

  if (user.id) {
    return (
      <div id="home">
        <div id="logo-container">
          <img src="https://res.cloudinary.com/des92wft8/image/upload/v1597434344/Early%20App/logo_transparent_qcf47g.png" />
        </div>
        <h2>Childcare Simplified</h2>
        <div className="login-wrapper">
          <h3>Welcome, {user.first_name}!</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div id="home">
        <div id="logo-container">
          <img
            alt="Early Logo (sunrise)"
            src="https://res.cloudinary.com/des92wft8/image/upload/v1597434344/Early%20App/logo_transparent_qcf47g.png"
          />
        </div>
        <h2>Childcare Simplified</h2>
        <div className="login-wrapper">
          <h3>Log in:</h3>
          <p className="demo">
            This is a demo. Just input "1" or "2" into any of the fields and
            click "submit."
          </p>
          <form onSubmit={handleLogIn}>
            <FontAwesomeIcon icon={faIdBadge} title="administrator"/>
            <label htmlFor="admin">Admin</label>
            <input
              type="text"
              name="admin"
              placeholder="Admin ID"
              onChange={handleLogInChange}
            ></input>
            <FontAwesomeIcon icon={faChalkboardTeacher} title="teacher"/>
            <label htmlFor="teacher">Teacher</label>
            <input
              type="text"
              name="teacher"
              placeholder="Teacher ID"
              onChange={handleLogInChange}
            ></input>
            <FontAwesomeIcon icon={faUserFriends} title="caregiver" />
            <label htmlFor="caregiver">Caregiver</label>
            <input
              type="text"
              name="caregiver"
              placeholder="Caregiver ID"
              onChange={handleLogInChange}
            ></input>
            <button
              type="submit"
              className="submit-class"
              onClick={handleSubmitClassChange}
            >
              {submitLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default Home;
