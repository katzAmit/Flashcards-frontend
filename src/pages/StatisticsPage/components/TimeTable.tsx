import React from "react";
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLabel, VictoryPortal } from "victory";


export default function TimeTable(props: any) {

    const colorScale = ["#83f28f", "#F7E967", "#F1433F"];

    return(
        <VictoryChart height={300} width={300} domainPadding={{ x: 50, y: [0, 20]}}>
  <VictoryGroup offset={10}>
    <VictoryBar
   
      labelComponent={<VictoryPortal><VictoryLabel/></VictoryPortal>}
      data={[{x: "amit", y: 1}, {x: "itay", y: 2}, {x: "yuval", y: 5}]}
      style={{ data: { fill: colorScale[0] } }}
    />
    <VictoryBar
      data={[{x: "amit", y: 2}, {x: "itay", y: 1}, {x: "yuval", y: 7}]}
      style={{ data: { fill: colorScale[1] } }}
    />
    <VictoryBar
      data={[{x: "amit", y: 3}, {x: "itay", y: 4}, {x: "yuval", y: 9}]}
      style={{ data: { fill: colorScale[2] } }}
    />
  </VictoryGroup>
</VictoryChart>
    );
}
