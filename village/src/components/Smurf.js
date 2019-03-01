import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Smurf = props => {
  return (
    <div className="Smurf">
      <Link to={`/smurf/${props.id}`}>
        <h3>{props.name}</h3>
      </Link>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
      <button
        onClick={async () => {
          const res = await axios.delete(
            `http://localhost:3333/smurfs/${props.id}`
          );
          props.rerenderApp(res.data);
        }}
      >
        Delete Smurf
      </button>
    </div>
  );
};

Smurf.defaultProps = {
  name: "",
  height: "",
  age: ""
};

export default Smurf;
