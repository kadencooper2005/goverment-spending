"use client";

import { useState } from "react";
import { fetchSpendingData } from "../../lib/api";
import { SpendingResult } from "../../types/spending";
import dynamic from "next/dynamic";

const SankeyChart = dynamic(() => import("../../components/BarChart"), {
  ssr: false,
});

export default function Home() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [quarter, setQuarter] = useState(2);
  const [agency, setAgency] = useState("");
  const [data, setData] = useState<SpendingResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await fetchSpendingData(year, quarter, agency);
      setData(response.filtered_results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main className="p-6 max-w-4xl justify-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Federal Spending Viewer
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Year
          </label>
          <input
            type="number"
            min={2017}
            max={new Date().getFullYear()}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Year"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Quarter
          </label>
          <input
            type="number"
            min={1}
            max={4}
            value={quarter}
            onChange={(e) => setQuarter(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Quarter"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-white mb-1">
            Agency
          </label>
          <input
            type="text"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Agency name"
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={handleFetch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      {!loading && data.length > 0 && <SankeyChart data={data} />}
    </main>
  );
}
