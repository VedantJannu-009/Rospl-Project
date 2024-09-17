import React from "react";
import "./detail.css";
import { auth } from "../../../lib/firebase";

const EmptyDetails = () => {
  return (
    <div className="detail">
      <div className="user">
        <h3>No details to display</h3>
        <h5>select a chat to display chat details..</h5>
      </div>

      {/* <button className="LogoutBottom" onClick={() => auth.signOut()}>
        Logout
      </button> */}
    </div>
  );
};

export default EmptyDetails;
