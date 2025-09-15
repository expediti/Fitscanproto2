// src/components/LiveHealthUpdates.tsx
import React, { useEffect, useState } from "react";

type HealthUpdate = {
  source: string;
  message: string;
  timestamp: string;
};

export default function LiveHealthUpdates() {
  const [updates, setUpdates] = useState<HealthUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/health-updates");
      const data = await res.json();
      setUpdates(data.updates || []);
      setConnected(true);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Fetch error:", err);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
    const interval = setInterval(fetchUpdates, 120000); // 2 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🌐 Live Health Updates
        {connected ? (
          <span className="text-green-600 animate-pulse">● Connected</span>
        ) : (
          <span className="text-red-600">● Offline</span>
        )}
      </h2>

      {loading ? (
        <p className="text-gray-600">Fetching latest updates...</p>
      ) : updates.length === 0 ? (
        <p className="text-gray-600">No updates available.</p>
      ) : (
        <ul className="space-y-3">
          {updates.map((update, idx) => (
            <li
              key={idx}
              className="p-4 bg-white rounded-xl shadow flex flex-col hover:shadow-md transition"
            >
              <span className="text-sm text-gray-500">{update.source}</span>
              <span className="font-medium">{update.message}</span>
              <span className="text-xs text-gray-400">
                {new Date(update.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Last update: {lastUpdate || "loading..."}
      </div>
    </div>
  );
}
