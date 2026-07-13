import { useAnalytics } from "../../context/AnalyticsContext";
import { Users, Activity, Clock, MousePointer2, UserCheck, UserX, Zap, Coffee, Calendar, Radio, UserPlus, RefreshCw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { stats } = useAnalytics();

  const cards = [
    { name: "Total Employees", value: stats.totalEmployees || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { name: "Employees Online", value: stats.employeesOnline || 0, icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { name: "Employees Offline", value: stats.employeesOffline || 0, icon: UserX, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
    { name: "Active Right Now", value: stats.activeRightNow || 0, icon: Zap, color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
    { name: "Employees Idle", value: stats.employeesIdle || 0, icon: Coffee, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/30" },
    { name: "Working Today", value: stats.workingToday || 0, icon: Calendar, color: "text-indigo-600", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
    { name: "Avg Session Time", value: stats.avgSessionTime || "0m 0s", icon: Clock, color: "text-pink-600", bg: "bg-pink-100 dark:bg-pink-900/30" },
    { name: "Today's Visits", value: stats.totalTodaysVisits || 0, icon: MousePointer2, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
    { name: "Live Sessions", value: stats.liveSessions || 0, icon: Radio, color: "text-rose-600", bg: "bg-rose-100 dark:bg-rose-900/30" },
    { name: "New Employees", value: stats.newEmployees || 0, icon: UserPlus, color: "text-teal-600", bg: "bg-teal-100 dark:bg-teal-900/30" },
    { name: "Returning Employees", value: stats.returningEmployees || 0, icon: RefreshCw, color: "text-cyan-600", bg: "bg-cyan-100 dark:bg-cyan-900/30" },
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

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.name} className="bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
            <div className="p-4 flex items-center">
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} aria-hidden="true" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate uppercase tracking-wider">{card.name}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mt-8">
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
