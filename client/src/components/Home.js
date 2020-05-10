import React from "react";
import List from "./List";
import Form from "./Form";

const Home = () => {
  return (
    <React.Fragment>
      <h2>Repository Checker</h2>
      <Form />
      <List />
    </React.Fragment>
  );
};

export default Home;
