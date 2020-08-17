import React, { useContext } from "react";
import { DataContext } from "../../App";


const MessageDetail = (props) => {
    const { user, userType } = useContext(DataContext);
    const userFullName = user.first_name + " " + user.last_name;

  return (
    <div>
      <p>message detail</p>
      <div className="thread-body">
        {props.location.state.messages.map((message) => {
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
    </div>
  );
};

export default MessageDetail;
