import { useState, useEffect } from "react";
import { Search, Plus, Download, LayoutTemplate, Activity } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_API_URL || "";

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', email: '', password: '', phone: '', department: '', team: '', designation: '' });

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
    const interval = setInterval(fetchEmployees, 15000);
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
      setNewEmp({ name: '', email: '', password: '', phone: '', department: '', team: '', designation: '' });
    } else {
      alert("Failed to add employee");
    }
  };

  const exportCSV = () => {
    const headers = ["ID,Name,Email,Phone,Department,Team,Designation,Status,TabStatus,TabCount,CurrentURL,Location,LoginTime,LastSeen"];
    const rows = employees.map(emp => {
      const loginTime = emp.loginTime ? new Date(emp.loginTime).toLocaleString() : 'N/A';
      const lastSeen = emp.lastSeen ? new Date(emp.lastSeen).toLocaleString() : 'N/A';
      return `"${emp.id}","${emp.name}","${emp.email}","${emp.phone||''}","${emp.department||''}","${emp.team||''}","${emp.designation||''}","${emp.status}","${emp.tabStatus||'UNKNOWN'}","${emp.tabCount||0}","${emp.currentUrl}","${emp.location}","${loginTime}","${lastSeen}"`;
    });
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "employees_detailed_tracking.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase()) ||
    (emp.department || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Employee Monitoring</h2>
        
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by name, email, dept..."
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

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Employee Profile</th>
              <th className="px-6 py-4 font-medium">Work Details</th>
              <th className="px-6 py-4 font-medium">Live Activity</th>
              <th className="px-6 py-4 font-medium">Tabs & Device</th>
              <th className="px-6 py-4 font-medium">Session Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <tr><td colSpan="5" className="text-center p-8 text-gray-500">Loading...</td></tr>
            ) : filteredEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {emp.profilePic ? (
                      <img src={emp.profilePic} alt="" className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        {emp.name.charAt(0)}
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{emp.name}</div>
                      <div className="text-xs text-gray-500">{emp.email}</div>
                      <div className="text-xs text-gray-400">{emp.phone}</div>
                      <div className="text-[10px] text-gray-400 mt-1">ID: {emp.id.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white font-medium">{emp.designation || 'N/A'}</div>
                  <div className="text-xs text-gray-500 mt-1"><span className="font-semibold">Dept:</span> {emp.department || 'N/A'}</div>
                  <div className="text-xs text-gray-500"><span className="font-semibold">Team:</span> {emp.team || 'N/A'}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="mb-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      emp.status === 'Online' ? 'bg-green-100 text-green-800' :
                      emp.status === 'Idle' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {emp.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 max-w-[200px] truncate" title={emp.currentUrl}>
                    <Activity className="inline w-3 h-3 mr-1" />
                    {emp.currentUrl || 'No page data'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {emp.status !== 'Offline' ? (
                    <div className="space-y-1">
                      <div className="text-xs flex items-center">
                        <LayoutTemplate className="w-3 h-3 mr-1 text-gray-400" />
                        <span className={emp.tabStatus === 'ACTIVE' ? 'text-blue-600 font-bold' : 'text-gray-500'}>
                          {emp.tabStatus === 'ACTIVE' ? 'Tab Active' : 'Background / Minimized'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {emp.tabCount > 1 ? <span className="text-orange-500 font-bold">{emp.tabCount} Tabs Open</span> : 'Single Tab'}
                      </div>
                      <div className="text-xs text-gray-400 truncate w-32" title={emp.device}>{emp.device}</div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Not connected</span>
                  )}
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 space-y-1">
                  <div><span className="font-semibold text-gray-700 dark:text-gray-300">In:</span> {emp.loginTime ? new Date(emp.loginTime).toLocaleTimeString() : 'N/A'}</div>
                  <div><span className="font-semibold text-gray-700 dark:text-gray-300">Last:</span> {emp.lastSeen ? new Date(emp.lastSeen).toLocaleTimeString() : 'N/A'}</div>
                  {emp.loginTime && emp.lastSeen && (
                    <div className="text-indigo-600 font-medium">
                      Duration: {Math.floor((new Date(emp.lastSeen) - new Date(emp.loginTime)) / 60000)} mins
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filteredEmployees.length === 0 && (
          <div className="p-8 text-center text-gray-500">No employees found.</div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Add Employee Details</h3>
            <form onSubmit={handleAddEmployee} className="space-y-3">
              <input required type="text" placeholder="Full Name" value={newEmp.name} onChange={e=>setNewEmp({...newEmp, name:e.target.value})} className="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              <input required type="email" placeholder="Email Address" value={newEmp.email} onChange={e=>setNewEmp({...newEmp, email:e.target.value})} className="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              <input type="text" placeholder="Phone Number" value={newEmp.phone} onChange={e=>setNewEmp({...newEmp, phone:e.target.value})} className="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Department" value={newEmp.department} onChange={e=>setNewEmp({...newEmp, department:e.target.value})} className="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
                <input type="text" placeholder="Team" value={newEmp.team} onChange={e=>setNewEmp({...newEmp, team:e.target.value})} className="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              </div>
              <input type="text" placeholder="Designation" value={newEmp.designation} onChange={e=>setNewEmp({...newEmp, designation:e.target.value})} className="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              <input required type="password" placeholder="Temporary Password" value={newEmp.password} onChange={e=>setNewEmp({...newEmp, password:e.target.value})} className="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button type="button" onClick={()=>setShowAddModal(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50 text-sm">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">Save Employee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
