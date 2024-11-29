import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Import from Redux to access the auth state
import Admin from './components/Admin/Admin';
import ProcurementOfficer from './components/procurementOfficer/ProcurementOfficer';
import QualityInspectorLayout from './components/QualityControlInspector/QualityControlInspectorLayout';
import WarehouseLayout from './components/warehouse/WarehouseLayout';
import InventoryManagerLayout from './components/InventoryManager/InventoryManagerLayout';
import Login from './components/login'; 

// ProtectedRoute component that checks if user is logged in
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Use auth state check

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/admin/*" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/procurement-officer/*" element={<ProtectedRoute><ProcurementOfficer /></ProtectedRoute>} />
        <Route path="/quality-inspector/*" element={<ProtectedRoute><QualityInspectorLayout /></ProtectedRoute>} />
        <Route path="/warehouse/*" element={<ProtectedRoute><WarehouseLayout /></ProtectedRoute>} />
        <Route path="/inventory-manager/*" element={<ProtectedRoute><InventoryManagerLayout /></ProtectedRoute>} />
        
        {/* Default route (this will redirect to login if the user is not logged in) */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
