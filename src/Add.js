import React, { useState } from "react";
import "./Add.css";
import { Button } from "@mui/material";
import axios from "axios";
function Add({ show, handleClose }) {
  const text_modal_style = show
    ? "addData display_block"
    : "addData display_none";

  const [key, setKey] = useState(null);
  const [portion, setPortion] = useState(null);

  const submitData = () => {
    if (key && portion) {
      const data = {
        key: key,
        portion: portion,
      };
      axios
        .post("http://localhost:8000/post", data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("invalid field values");
    }
  };

  return (
    <div className={text_modal_style}>
      <div className="text_box">
        <div className="container">
          <h3>Add Data to pie chart</h3>
          <hr />
          <h3>Attribute</h3>
          <input
            type="text"
            onChange={(e) => {
              setKey(e.target.value);
            }}
          />
          <h3>Distribution percentage</h3>
          <input
            type="text"
            onChange={(e) => {
              setPortion(e.target.value);
            }}
          />
        </div>
        <hr />
        <div className="text_submit">
          <Button
            variant="contained"
            onClick={() => {
              setKey("");
              setPortion("");
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              submitData();
              setKey("");
              setPortion("");
              handleClose();
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Add;
