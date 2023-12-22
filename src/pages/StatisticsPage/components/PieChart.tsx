import React, { useState } from "react";
import ReactDOM from "react-dom";
import { VictoryLabel, VictoryPie } from "victory";

export default function PieChart(props: any){

    const colorScale = ["#83f28f", "#F7E967", "#F1433F"];
    

    return( <svg viewBox="0 0 400 400">
          <VictoryPie
            standalone={false}
            width={400} height={400}
            data={props.data}
            innerRadius={0} labelRadius={100}
            colorScale={colorScale}
            style={{ labels: { fontSize: 20, fill: "white" }}}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 20 }}
            x={200} y={200}
            text=""
          />
        </svg>);
}


