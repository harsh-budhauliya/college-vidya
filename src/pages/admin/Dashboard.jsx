import { useAnalytics } from "../../context/AnalyticsContext";
import { Users, Activity, Clock, MousePointer2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { stats } = useAnalytics();

  const cards = [
    { name: "Total Employees", value: stats.totalEmployees || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { name: "Active Sessions", value: stats.activeSessions || 0, icon: Activity, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { name: "Total Page Views", value: stats.totalVisits || 0, icon: MousePointer2, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { name: "Avg Session", value: "12m 30s", icon: Clock, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" }
  ];

  const defaultData = [
    { name: 'Mon', visits: 0 }, { name: 'Tue', visits: 0 }, { name: 'Wed', visits: 0 },
    { name: 'Thu', visits: 0 }, { name: 'Fri', visits: 0 }, { name: 'Sat', visits: 0 }, { name: 'Sun', visits: 0 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span>Live Tracking Active</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.name} className="bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-xl ${card.bg}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{card.name}</dt>
                    <dd className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{card.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Activity Timeline (Last 7 Days)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.activityChart || defaultData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#60a5fa' }}
              />
              <Area type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
