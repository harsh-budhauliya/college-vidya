import { useState, useEffect } from "react";
import { Download } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_API_URL || "";

export default function SessionsList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`${BACKEND_URL}/api/admin/sessions`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setSessions(await res.json());
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const exportCSV = () => {
    const headers = ["Employee,Email,Status,Login Time,Last Activity,Device,Location,Page Views"];
    const rows = sessions.map(s => 
      `"${s.user?.name || 'Anonymous'}","${s.user?.email || 'N/A'}","${s.status}","${new Date(s.loginTime).toLocaleString()}","${new Date(s.lastActivity).toLocaleString()}","${s.os} ${s.browser}","${s.gpsLocation || s.location || ''}","${s.pageViews?.length || 0}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "session_logs.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Session Logs</h2>
        <button onClick={exportCSV} className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50">
          <Download className="h-4 w-4 mr-2" /> Export
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 text-gray-500 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Status / Login</th>
              <th className="px-6 py-4 font-medium">Device & Loc</th>
              <th className="px-6 py-4 font-medium">Pages Visited</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? <tr><td colSpan="4" className="p-8 text-center text-gray-500">Loading...</td></tr> : sessions.map(s => (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {s.user?.name || 'Anonymous Session'}
                  <div className="text-xs text-gray-500">{s.user?.email}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${s.status==='ONLINE'?'bg-green-100 text-green-800':'bg-gray-100 text-gray-800'}`}>{s.status}</span>
                  <div className="text-gray-500 mt-1">In: {new Date(s.loginTime).toLocaleTimeString()}</div>
                  <div className="text-gray-500">Out: {new Date(s.lastActivity).toLocaleTimeString()}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <div>{s.os} - {s.browser}</div>
                  <div className="text-gray-400 text-xs">{s.gpsLocation || s.location || 'IP Unknown'}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="max-h-24 overflow-y-auto pr-2">
                    {s.pageViews?.map(p => (
                      <div key={p.id} className="text-xs text-gray-500 truncate mb-1" title={p.url}>
                        {p.url} ({p.duration}s)
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
