import React, { useEffect } from "react";

import Notes from "./Notes";
import AddNote from "./AddNote";

const Home = (props) => {
  return (
    <>
      <Notes showAlert={props.showAlert} />
    </>
  );
};

export default Home;
