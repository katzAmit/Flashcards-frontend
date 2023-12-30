import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomizedAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
        fontSize={12}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function AlternativeEvents(props: any) {
  let { data } = props;
  data = data.map((entry: any) => ({
    ...entry,
    Questions: entry.questions,
    Easy: entry.easy,
    Medium: entry.medium,
    Hard: entry.hard,
  }));
  const max = Math.max(
    ...data.map((entry: any) =>
      Math.max(entry.Questions, entry.Easy, entry.Medium, entry.Hard)
    )
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 50, // Adjusted bottom margin for more space
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="category"
          angle={-45}
          textAnchor="end"
          interval={0}
          tick={{ fontSize: 9 }}
        />
        <YAxis
          domain={[0, "dataMax"]} // Use the calculated max value for the domain
          allowDataOverflow
          allowDecimals={false}
        />
        <Tooltip cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="Questions"
          fill="#5CB85C"
          barSize={
            data.some((entry: any) => entry.Questions !== undefined)
              ? 16
              : undefined
          }
        />
        <Bar dataKey="Easy" fill="#5CB85C" />
        <Bar dataKey="Medium" fill="#F7E967" animationDuration={3000} />
        <Bar dataKey="Hard" fill="#F1433F" animationDuration={3000} />
      </BarChart>
    </ResponsiveContainer>
  );
}
