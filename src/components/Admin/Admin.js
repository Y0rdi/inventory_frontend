// src/components/admin/Admin.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminUserManagement from './AdminUserManagement';
import AdminDashboard from './AdminDashboard';
import AdminInventorySettings from './AdminInventorySettings';
//import '../../styles/Admin.css';

const Admin = () => {
  return (
    <AdminLayout> 
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="user-management" element={<AdminUserManagement />} />
        <Route path="inventory-settings" element={<AdminInventorySettings />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
