import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

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
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Questions" fill="#5CB85C" />
        <Bar dataKey="Easy" fill="#5CB85C" />
        <Bar dataKey="Medium" fill="#F7E967" />
        <Bar dataKey="Hard" fill="#F1433F" />
      </BarChart>
    </ResponsiveContainer>
  );
  function getColorByKey(key: string) {
    const colorMap: { [key: string]: string } = {
      Questions: "#5CB85C",
      Easy: "#5CB85C",
      Medium: "#FFD700",
      Hard: "#FF0000",
      // Add more keys and colors if needed
    };
    return colorMap[key];
  }
}
