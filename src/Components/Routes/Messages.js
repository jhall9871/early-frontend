import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../App";
import { Link, Redirect } from 'react-router-dom';
import apiUrl from "../../apiConfig";
import axios from "axios";

const Messages = ({ caregivers, messages }) => {
  const { user, userType } = useContext(DataContext);
  const userFullName = user.first_name + " " + user.last_name;
  // const [newMessage, setNewMessage] = useState({
  //   teacher_id: user.id,
  //   author: userFullName,
  // });

  // //handle input on new message form
  // const handleNewMessageInput = (e) => {
  //   setNewMessage({
  //     ...newMessage,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // //handle submit new message
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const newMessageApiCall = async () => {
  //     try {
  //       await axios.post(`${apiUrl}/messages`, newMessage);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   await newMessageApiCall();
  //   // makeAPICall();
  // };

  // if there's no user, go back to login.
  if (user.id === undefined) {
    console.log('redirecting')
    return <Redirect to={'/'} />
  }

  if (caregivers) {
  
    return (
      <div className="messages">
        <h2>Messages</h2>
        {caregivers.map((caregiver) => {
          let relevantMessages = messages.filter(
            (message) => message.caregiver_id === caregiver.id
          );
          return (
            <div className="thread-container">
              <Link to={{
                pathname: `messages/detail`,
                state: { caregiver_id: caregiver.id}
              }}>
                <div className="thread-header">
                  <h4 className="thread-recipient">
                    {caregiver.first_name} {caregiver.last_name}
                  </h4>
                  <h4 className="last-message-time">
                    {relevantMessages[0]
                      ? `${relevantMessages[0].updated_at.slice(
                        11,
                        16
                      )} on ${relevantMessages[0].updated_at.slice(5, 10)}`
                      : ""}
                  </h4>
                  <h4 className="last-message-summary">
                    {relevantMessages[0]
                      ? `${relevantMessages[0].content.slice(0, 30)}...`
                      : ""}
                  </h4>
                </div>
              </Link>
            
            </div>
          );
        })}
        {/* <div className="message-form-containter">
          <form onSubmit={handleSubmit}>
            <label>To:</label>
            <select name="caregiver_id" onChange={handleNewMessageInput}>
              <option value=""></option>
              {caregivers.map((person) => {
                return (
                  <option value={parseInt(person.id)}>
                    {person.first_name} {person.last_name}
                  </option>
                );
              })}
            </select>
            <label>Message:</label>
            <input
              name="content"
              type="text"
              onChange={handleNewMessageInput}
            ></input>
            <input type="submit"></input>
          </form>
        </div> */}
      </div>
    );
  } else return <p>nothing yet</p>
};

export default Messages;
