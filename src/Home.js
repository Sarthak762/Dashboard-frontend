import React, { useEffect, useState } from "react";
import "./Home.css";
import { Chart } from "react-google-charts";
import { Button } from "@mui/material";
import Add from "./Add";
import axios from "axios";
import Pusher from "pusher-js";

function Home() {
  const [addDataShow, setAddDataShow] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/get")
      .then((res) => {
        console.log(res.data);
        const obj = res.data;
        const arr = [["Object", "Contribution"]];
        for (const key in obj) {
          arr.push([obj[key]["key"], Number(obj[key]["portion"])]);
        }
        setData(arr);
        console.log(arr);
      })
      .catch((error) => {
        console.log("ERROR OCCCURRED");
      });
  };

  useEffect(() => {
    const pusher = new Pusher("4fdbda7428b820c4b701", {
      cluster: "ap2",
    });
    pusher.subscribe("post").bind(
      "inserted",
      (data) => {
        console.log(data);
        fetchData();
      },
      []
    );
  });
  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    title: "Pie chart",
    sliceVisibilityThreshold: 0.2, // 20%
    backgroundColor: {
      gradient: {
        // Start color for gradient.
        color1: "#C3DEE5",
        // Finish color for gradient.
        color2: "#C3DEE5",
        // Where on the boundary to start and
        // end the color1/color2 gradient,
        // relative to the upper left corner
        // of the boundary.
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "100%",
        // If true, the boundary for x1,
        // y1, x2, and y2 is the box. If
        // false, it's the entire chart.
        useObjectBoundingBoxUnits: true,
      },
    },
  };
  return (
    <div className="home">
      <div className="add">
        <span> Add data to the pie chart</span>
        <Button
          variant="contained"
          onClick={() => {
            setAddDataShow(true);
          }}
        >
          ADD
        </Button>
      </div>
      <Add
        show={addDataShow}
        handleClose={() => {
          setAddDataShow(null);
        }}
      />
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"100vh"}
      />
    </div>
  );
}

export default Home;
