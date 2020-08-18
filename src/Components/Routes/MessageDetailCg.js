import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { DataContext } from "../../App";
import axios from "axios";
import apiUrl from "../../apiConfig";

const MessageDetailCg = (props) => {
  const { user, userType } = useContext(DataContext);
  const teacherId = props.location.state.teacher_id;
  const userFullName = user.first_name + " " + user.last_name;
  const [newMessage, setNewMessage] = useState({
    caregiver_id: user.id,
    author: userFullName,
    teacher_id: teacherId,
  });
  const teacherInfo = props.teachers.filter(
    (teacher) => teacher.id === teacherId
  );

  // This will zip you back to the homepage if you accidentally reload the page (causing the user to be reset)
  if (props.messages === undefined || user.id === undefined) {
    console.log("redirecting");
    return <Redirect to={"/"} />;
  }

  // Teacher ID is coming from Messages.js, and messages through App.js.
  // Create an array of all the relevant messages based on those two variables.
  const filteredMessages = props.messages.filter(
    (message) => message.teacher_id === teacherId
  );

  //handle input on new message form
  const handleNewMessageInput = (e) => {
    setNewMessage({
      ...newMessage,
      [e.target.name]: e.target.value,
    });
  };

  //handle submit new message
  const handleNewMessageSubmit = async (e) => {
    e.preventDefault();
    const newMessageApiCall = async () => {
      try {
        await axios.post(`${apiUrl}/messages`, newMessage);
      } catch (err) {
        console.error(err);
      }
    };
    await newMessageApiCall();
    props.messageReload();
  };

  return (
    <div>
      <p>message detail</p>
      <div className="thread-body">
        {filteredMessages.map((message) => {
          return (
            <div
              key={message.id}
              className={
                message.author === userFullName ? "my-message" : "their-message"
              }
            >
              {message.content}
            </div>
          );
        })}
      </div>

      <div className="message-form-containter">
        <form onSubmit={handleNewMessageSubmit}>
          <label>
            Write to{" "}
            {teacherInfo
              ? `${teacherInfo[0].first_name} ${teacherInfo[0].last_name}`
              : ""}
          </label>
          <input
            name="content"
            type="text"
            onChange={handleNewMessageInput}
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
};

export default MessageDetailCg;
