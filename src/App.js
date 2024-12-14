import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Admin from './components/Admin/Admin';
import ProcurementOfficer from './components/procurementOfficer/ProcurementOfficer';
import QualityInspectorLayout from './components/QualityControlInspector/QualityControlInspectorLayout';
import WarehouseLayout from './components/warehouse/WarehouseLayout';
import InventoryManagerLayout from './components/InventoryManager/InventoryManagerLayout';
import Login from './components/login';
import UpdatePasswordPage from './components/UpdatePasswordPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/update-password" element={<UpdatePasswordPage/>} />
        {/* Public Routes */}
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/procurement-officer/*" element={<ProcurementOfficer />} />
        <Route path="/quality-inspector/*" element={<QualityInspectorLayout />} />
        <Route path="/warehouse/*" element={<WarehouseLayout />} />
        <Route path="/inventory-manager/*" element={<InventoryManagerLayout />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
