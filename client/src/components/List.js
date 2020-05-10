import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const List = () => {
  const [list, setList] = useState([]);

  const getList = async () => {
    const result = await axios.get("http://localhost:9001/reminders");

    setList(result?.data);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <button onClick={getList}>Reload the list</button>
      <div>
        {list.map((item, index) => (
          <p key={index}>
            <Link to={`/${item.platform}/${item.namespace}/${item.repository}`}>
              [Review]
            </Link>{" "}
            | {item.email} | {item.platform} | {item.namespace} |{" "}
            {item.repository} | {item.date}
          </p>
        ))}
      </div>
    </div>
  );
};

export default List;
