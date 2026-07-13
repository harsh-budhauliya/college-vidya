import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import MockCalls from './pages/MockCalls';
import UniversityDetails from './pages/UniversityDetails';
import SpecializationDetails from './pages/SpecializationDetails';
import CounselorFlow from './pages/CounselorFlow';
import SpecializationGuide from './pages/SpecializationGuide';
import StudentProfiler from './pages/StudentProfiler';
import { AnalyticsProvider } from './context/AnalyticsContext';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import EmployeesList from './pages/admin/EmployeesList';
import AdminLogin from './pages/admin/AdminLogin';
import EmployeeLogin from './pages/EmployeeLogin';
import SessionsList from './pages/admin/SessionsList';

function AdminWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));

  if (!isAuthenticated) {
    return <AdminLogin onLogin={setIsAuthenticated} />;
  }

  return <AdminLayout />;
}

function App() {
  return (
    <BrowserRouter>
      <AnalyticsProvider>
        <Routes>
          <Route path="/login" element={<EmployeeLogin />} />
          <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="university-data" element={<MockCalls />} />
          <Route path="counselor-framework" element={<CounselorFlow />} />
          <Route path="specialization-guide" element={<SpecializationGuide />} />
          <Route path="student-profiler" element={<StudentProfiler />} />
          <Route path="university-data/university/:uniId" element={<UniversityDetails />} />
          <Route path="university-data/university/:uniId/program/:programName/specialization/:specName" element={<SpecializationDetails />} />
          {/* Placeholder for Manual */}
          <Route path="manual" element={<div className="pt-24 min-h-screen grid items-center justify-center text-xl font-bold text-slate-500">Manual Module Under Construction</div>} />
          {/* Legacy Mock Calls Redirect */}
          <Route path="mock-calls/*" element={<Navigate to="/university-data" replace />} />
          
          {/* 404 Catch All */}
          <Route path="*" element={
            <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-4xl font-black text-slate-800 mb-2">404</h1>
              <p className="text-slate-500 font-medium mb-6">Page not found or has been moved.</p>
              <button 
                onClick={() => window.location.href = '/'} 
                className="px-6 py-3 bg-[#0047ad] text-white font-bold rounded-xl shadow-lg"
              >
                Go to Dashboard
              </button>
            </div>
          } />
        </Route>
        <Route path="/admin" element={<AdminWrapper />}>
            <Route index element={<AdminDashboard />} />
            <Route path="employees" element={<EmployeesList />} />
            <Route path="sessions" element={<SessionsList />} />
            <Route path="auditlogs" element={<div className="p-8 font-bold text-gray-500">Audit Logs Placeholder</div>} />
            <Route path="settings" element={<div className="p-8 font-bold text-gray-500">Settings Placeholder</div>} />
          </Route>
        </Routes>
      </AnalyticsProvider>
    </BrowserRouter>
  );
}

export default App;
