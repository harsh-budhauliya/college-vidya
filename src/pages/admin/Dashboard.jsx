import { useState, useEffect } from "react";
import { Users, UserCheck, Eye, Clock, Monitor } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAnalytics } from "../../context/AnalyticsContext";

export default function Dashboard() {
  const { stats, isConnected } = useAnalytics();
  
  // Mock data for chart, in a real scenario we'd fetch this from the API
  const visitData = [
    { time: "09:00", visits: 120 },
    { time: "10:00", visits: 200 },
    { time: "11:00", visits: 150 },
    { time: "12:00", visits: 300 },
    { time: "13:00", visits: 250 },
    { time: "14:00", visits: 400 },
  ];

  const cards = [
    { title: "Total Employees", value: stats?.totalEmployees || 0, icon: Users, color: "text-blue-600" },
    { title: "Active Sessions (Live)", value: stats?.activeSessions || 0, icon: Monitor, color: "text-green-600" },
    { title: "Total Visits Today", value: stats?.totalVisits || 0, icon: Eye, color: "text-purple-600" },
    { title: "Avg Session Time", value: "12m 45s", icon: Clock, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {isConnected ? "Live Connection Active" : "Disconnected"}
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex items-center space-x-4 transition-transform hover:scale-105">
              <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Page Views (Today)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="visits" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, stroke: '#60A5FA', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
