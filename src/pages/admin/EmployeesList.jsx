import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical, Plus, Download } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_API_URL || "";

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', email: '', password: '', role: 'EMPLOYEE' });

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${BACKEND_URL}/api/admin/employees`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setEmployees(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    const interval = setInterval(fetchEmployees, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${BACKEND_URL}/api/admin/employees`, {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmp)
    });
    if (res.ok) {
      setShowAddModal(false);
      fetchEmployees();
      setNewEmp({ name: '', email: '', password: '', role: 'EMPLOYEE' });
    } else {
      alert("Failed to add employee");
    }
  };

  const exportCSV = () => {
    const headers = ["Name,Email,Role,Status,LastSeen,Location,Device,CurrentPage"];
    const rows = employees.map(emp => 
      `"${emp.name}","${emp.email}","${emp.designation || emp.role}","${emp.status}","${emp.lastSeen}","${emp.location}","${emp.device}","${emp.currentUrl}"`
    );
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employees_tracking.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      {/* Header & Controls */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Employees Tracking</h2>
        
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button onClick={exportCSV} className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 w-full sm:w-auto justify-center">
            <Download className="h-4 w-4 mr-2" /> Export
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto justify-center">
            <Plus className="h-4 w-4 mr-2" /> Add Employee
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Tracking Info</th>
              <th className="px-6 py-4 font-medium">Last Seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan="4" className="text-center p-8 text-gray-500">Loading...</td></tr>
            ) : filteredEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {emp.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{emp.name}</div>
                      <div className="text-xs text-gray-500">{emp.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    emp.status === 'Online' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    emp.status === 'Idle' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    <div><span className="font-semibold">URL:</span> {emp.currentUrl || 'N/A'}</div>
                    <div><span className="font-semibold">Loc:</span> {emp.location || 'Unknown'}</div>
                    <div className="text-gray-400">{emp.device}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(emp.lastSeen).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filteredEmployees.length === 0 && (
          <div className="p-8 text-center text-gray-500">No employees found.</div>
        )}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Add New Employee</h3>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <input required type="text" placeholder="Full Name" value={newEmp.name} onChange={e=>setNewEmp({...newEmp, name:e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              <input required type="email" placeholder="Email Address" value={newEmp.email} onChange={e=>setNewEmp({...newEmp, email:e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              <input required type="password" placeholder="Temporary Password" value={newEmp.password} onChange={e=>setNewEmp({...newEmp, password:e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              <div className="flex justify-end space-x-2 mt-6">
                <button type="button" onClick={()=>setShowAddModal(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
