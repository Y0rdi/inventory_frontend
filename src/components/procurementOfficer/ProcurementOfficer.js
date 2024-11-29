// src/components/procurementOfficer/ProcurementOfficer.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProcurementOfficerLayout from './ProcurementOfficerLayout'; // Import your new layout
import RequestedItems from './RequestedItems';
import Notifications from './Notifications';
import SupplierCommunication from './SupplierCommunication';
import GenerateReport from './ReportGeneration';

const ProcurementOfficer = () => {
  return (
    <ProcurementOfficerLayout>
      <Routes>
        <Route path="/" element={<RequestedItems />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/supplier-communication" element={<SupplierCommunication />} />
        <Route path="/generate-report" element={<GenerateReport />} />
      </Routes>
    </ProcurementOfficerLayout>
  );
};

export default ProcurementOfficer;
