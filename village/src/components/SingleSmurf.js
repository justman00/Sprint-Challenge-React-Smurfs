import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleSmurf = props => {
  const [smurf, setSmurf] = useState({});

  useEffect(() => {
    console.log("running");
    axios.get("http://localhost:3333/smurfs").then(res => {
      const neededSmurf = res.data.filter(
        val => val.id + "" === props.match.params.id
      );
      console.log(res);
      setSmurf(...neededSmurf);
    });
  }, []);

  if (!smurf) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Smurf">
      <h3>{smurf.name}</h3>
      <strong>{smurf.height} tall</strong>
      <p>{smurf.age} smurf years old</p>
      <button
        onClick={async () => {
          const res = await axios.delete(
            `http://localhost:3333/smurfs/${smurf.id}`
          );
          props.rerenderApp(res.data);
          props.history.push("/");
        }}
      >
        Delete Smurf
      </button>
    </div>
  );
};

export default SingleSmurf;
