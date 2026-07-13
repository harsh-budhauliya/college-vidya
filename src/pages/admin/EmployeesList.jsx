import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical } from "lucide-react";

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // In a real app, this data would be fetched from the API
  useEffect(() => {
    // Mock Data
    setEmployees([
      { id: 1, name: "John Doe", email: "john@company.com", department: "Engineering", status: "Online", role: "Developer" },
      { id: 2, name: "Jane Smith", email: "jane@company.com", department: "HR", status: "Offline", role: "Manager" },
      { id: 3, name: "Alice Johnson", email: "alice@company.com", department: "Marketing", status: "Idle", role: "Specialist" },
    ]);
  }, []);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      {/* Header & Controls */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Employees</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
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
          <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {emp.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{emp.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{emp.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">{emp.role}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{emp.department}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    emp.status === 'Online' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    emp.status === 'Idle' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEmployees.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No employees found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
