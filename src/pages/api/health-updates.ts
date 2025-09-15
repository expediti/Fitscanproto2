// src/pages/api/health-updates.ts
import type { NextApiRequest, NextApiResponse } from "next";

type HealthUpdate = {
  source: string;
  message: string;
  timestamp: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const updates: HealthUpdate[] = [];

    // WHO API (COVID19 summary)
    try {
      const whoRes = await fetch("https://api.covid19api.com/summary");
      const whoData = await whoRes.json();
      updates.push({
        source: "WHO",
        message: `Global COVID-19 cases: ${whoData.Global.TotalConfirmed}, Deaths: ${whoData.Global.TotalDeaths}`,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      updates.push({
        source: "WHO",
        message: "Unable to fetch WHO data right now.",
        timestamp: new Date().toISOString(),
      });
    }

    // India MOHFW (COVID stats from rootnet)
    try {
      const indiaRes = await fetch("https://api.rootnet.in/covid19-in/stats/latest");
      const indiaData = await indiaRes.json();
      updates.push({
        source: "MOHFW",
        message: `India confirmed: ${indiaData.data.summary.total}, Deaths: ${indiaData.data.summary.deaths}`,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      updates.push({
        source: "MOHFW",
        message: "Unable to fetch MOHFW data.",
        timestamp: new Date().toISOString(),
      });
    }

    // Placeholder for future N8n/Gov APIs
    updates.push({
      source: "IDSP",
      message: "Integrated Disease Surveillance Programme data coming soon.",
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({ updates });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch health updates." });
  }
}
