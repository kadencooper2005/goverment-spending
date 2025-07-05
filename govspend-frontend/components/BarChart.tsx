// components/SankeyChart.tsx
"use client";

import Plot from "react-plotly.js";
import { SpendingResult } from "../types/spending";

type Props = {
  data: SpendingResult[];
};

export default function BarChart({ data }: Props) {
  if (!data || data.length === 0) return <p>No data to display.</p>;

  const labels = data.map((d) => d.name);
  const values = data.map((d) => d.amount);

  return (
    <Plot
      data={[
        {
          type: "bar",
          x: labels,
          y: values,
          marker: { color: "#60a5fa" },
          hoverinfo: "text",
          text: labels.map(
            (label, i) =>
              `<b>${label} Spending: <b>$${values[i].toLocaleString()}</b>`
          ),
          hovertemplate: "%{text}<extra></extra>", // cleaner tooltip, no trace name
        },
      ]}
      layout={{
        title: { text: "Agency Spending" },
        width: 1200,
        height: 600,
        yaxis: {
          title: {
            text: "Dollars",
            standoff: 10,
          },
          tickformat: "~s",
        },
        xaxis: {
          tickangle: -35,
        },
        margin: { t: 80, b: 140, l: 80, r: 40 },
        hoverlabel: {
          bgcolor: "#ffffff",
          bordercolor: "#333333",
          font: {
            color: "#000000",
            size: 14,
          },
        },
      }}
      config={{ displayModeBar: false }}
    />
  );
}
