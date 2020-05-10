import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    platform: "github",
    date: new Date(),
  });

  const changeForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const save = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:9001/createReminder", formData);

    alert("saved");
  };
  return (
    <div style={{ margin: "20px 10px" }}>
      <form onSubmit={save}>
        <div>
          Email:{" "}
          <input
            type="email"
            name="email"
            onChange={changeForm}
            value={formData.email || ""}
            required
          />
        </div>
        <div>
          Platform:{" "}
          <select
            name="platform"
            onChange={changeForm}
            value={formData.platform || ""}
            required
          >
            <option value="github">GitHub</option>
          </select>
        </div>
        <div>
          Namespace:{" "}
          <input
            type="text"
            name="namespace"
            onChange={changeForm}
            value={formData.namespace || ""}
            required
          />
        </div>
        <div>
          Repository:{" "}
          <input
            type="text"
            name="repository"
            onChange={changeForm}
            value={formData.repository || ""}
            required
          />
        </div>
        <div>
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
};

export default Form;
