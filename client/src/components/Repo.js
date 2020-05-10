/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Repo = () => {
  const { platform, namespace, repository } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getOutdatedPackages = async () => {
    const res = await axios.get(
      `http://localhost:9001/${platform}/${namespace}/${repository}`
    );

    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getOutdatedPackages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to="/">Go to Home</Link>
      <div style={{ margin: "20px" }}>
        <p>Package Name | Current Version | Latest Version</p>
        <hr />
        {data?.map((item, index) => (
          <p key={index}>
            {item.packageName} | {item.currentVersion} | {item.latestVersion}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Repo;
