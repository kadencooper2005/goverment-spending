// components/BarChart.tsx
"use client";

import Plot from "react-plotly.js";
import { SpendingResult } from "../../src/types/spending";

type Props = {
  data: SpendingResult[];
};

export default function BarChart({ data }: Props) {
  if (!data || data.length === 0)
    return <p className="text-center text-gray-500">No data to display.</p>;

  const labels = data.map((d) => d.name);
  const values = data.map((d) => d.amount);

  return (
    <Plot
      data={[
        {
          type: "bar",
          x: labels,
          y: values,
          marker: { color: "#6366f1" },
          hoverinfo: "text",
          text: labels.map(
            (label, i) =>
              `<b>${label} Spending: <b>$${values[i].toLocaleString()}</b>`
          ),
          hovertemplate: "%{text}<extra></extra>",
        },
      ]}
      layout={{
        title: {
          text: "Agency Spending Overview",
          font: { size: 22 },
          xanchor: "center",
          x: 0.5,
        },
        width: 1000,
        height: 600,
        yaxis: {
          title: {
            text: "Dollars",
            standoff: 10,
          },
          tickformat: "~s",
          automargin: true,
        },
        xaxis: {
          tickangle: -35,
          automargin: true,
        },
        margin: { t: 80, b: 160, l: 80, r: 40 },
        hoverlabel: {
          bgcolor: "#f9fafb",
          bordercolor: "#4b5563",
          font: {
            color: "#1f2937",
            size: 14,
          },
        },
      }}
      config={{ displayModeBar: false, responsive: true }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
