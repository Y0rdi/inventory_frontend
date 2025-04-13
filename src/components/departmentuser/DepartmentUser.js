// src/components/departmentUser/DepartmentUser.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DepartmentUserLayout from './DepartmentUserLayout'; // Import the layout
import PurchaseRequestForm from './PurchaseRequestForm'; // Purchase Request Page
import InventoryRequest from './InventoryRequest'; // Inventory Request Page
import RequestHistory from './RequestHistory'; // Request History Page

const DepartmentUser = () => {
  return (
    <DepartmentUserLayout>
      <Routes>
        <Route path="/" element={<PurchaseRequestForm />} />
        <Route path="/inventory-request" element={<InventoryRequest />} />
        <Route path="/request-history" element={<RequestHistory />} />
      </Routes>
    </DepartmentUserLayout>
  );
};

export default DepartmentUser;
