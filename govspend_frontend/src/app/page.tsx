"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Search, DollarSign, TrendingUp } from "lucide-react";
import { SpendingResponse, SpendingResult } from "@/types/spending";
import dynamic from "next/dynamic";

// Dynamically import the BarChart with SSR disabled
const BarChart = dynamic(() => import("../../components/BarChart"), {
  ssr: false,
});

export default function GovSpend() {
  const [year, setYear] = useState<string>("");
  const [quarter, setQuarter] = useState<string>("");
  const [agency, setAgency] = useState<string>("");
  const [spendingData, setSpendingData] = useState<SpendingResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    const yearNum = Number.parseInt(year);
    const quarterNum = Number.parseInt(quarter);

    if (!year || yearNum < 2017 || yearNum > 2025) {
      alert("Please enter a valid year between 2017 and 2025");
      return;
    }

    if (!quarter || quarterNum < 1 || quarterNum > 4) {
      alert("Please enter a valid quarter between 1 and 4");
      return;
    }

    if (!agency.trim()) {
      alert("Please enter an agency name");
      return;
    }

    setLoading(true);
    setError(null);
    setSpendingData(null);

    try {
      const res = await fetch(
        `http://localhost:8000/spending/?year=${yearNum}&quarter=${quarterNum}&agency=${encodeURIComponent(
          agency.trim()
        )}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: SpendingResponse = await res.json();
      setSpendingData(data);
      console.log("Spending data:", data);
    } catch (err) {
      console.error("Failed to fetch spending data:", err);
      setError(
        "Error fetching data. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-800">GovSpend</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Access comprehensive government spending data by year, quarter, and
            agency
          </p>
        </div>

        {/* Main Form Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Search className="h-6 w-6" />
                Search Government Spending Data
              </CardTitle>
              <CardDescription className="text-blue-100">
                Enter the criteria below to fetch spending information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {/* Year Input */}
              <div className="space-y-2">
                <Label htmlFor="year" className="text-slate-700 font-medium">
                  Year
                </Label>
                <Input
                  id="year"
                  type="number"
                  min="2017"
                  max="2025"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="Enter year (2017-2025)"
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-sm text-slate-500">
                  Valid range: 2017 to 2025
                </p>
              </div>

              {/* Quarter Input */}
              <div className="space-y-2">
                <Label htmlFor="quarter" className="text-slate-700 font-medium">
                  Quarter
                </Label>
                <Input
                  id="quarter"
                  type="number"
                  min="1"
                  max="4"
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  placeholder="Enter quarter (1-4)"
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-sm text-slate-500">
                  Valid range: 1 to 4 (Q1, Q2, Q3, Q4)
                </p>
              </div>

              {/* Agency Input */}
              <div className="space-y-2">
                <Label htmlFor="agency" className="text-slate-700 font-medium">
                  Agency
                </Label>
                <Input
                  id="agency"
                  type="text"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="Enter agency name (e.g., Department of Defense)"
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-sm text-slate-500">
                  Enter the full or partial name of the government agency
                </p>
              </div>

              {/* Fetch Button */}
              <Button
                onClick={handleFetch}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 text-lg shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" />
                    Fetch Data
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto mt-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-red-700 font-medium">{error}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Display */}
        {spendingData && (
          <div className="max-w-4xl mx-auto mt-8">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Spending Results
                </CardTitle>
                <CardDescription className="text-green-100">
                  Found {spendingData.filtered_results.length} matching agencies
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {spendingData.filtered_results.length === 0 ? (
                  <div className="text-center py-8">
                    <DollarSign className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 text-lg">
                      No spending data found for the specified criteria.
                    </p>
                    <p className="text-slate-500 text-sm mt-2">
                      Try adjusting your search parameters.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {spendingData.filtered_results.map(
                      (result: SpendingResult, index: number) => (
                        <div
                          key={`${result.id}-${index}`}
                          className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-800 text-lg">
                                {result.name}
                              </h3>
                              <p className="text-slate-600 text-sm mt-1">
                                ID: {result.id} | Type: {result.type} | Code:{" "}
                                {result.code}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(result.amount)}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Chart Display */}
        {spendingData && spendingData.filtered_results.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Spending Visualization
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Interactive bar chart showing agency spending amounts
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <BarChart data={spendingData.filtered_results} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500">
          <p>© 2024 GovSpend - Government Spending Transparency Tool</p>
        </div>
      </div>
    </div>
  );
}
