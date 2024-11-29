import React from 'react';
import '../../styles/ProcurementOfficer/ReportGeneration.css'

const ReportGeneration = () => {
    const handleGenerateReport = () => {
        // Logic to generate report
        alert('Report generated!');
    };

    return (
        <div className="report-generation-container">
            <h2 style={{ color: '#4caf50' }}>Generate Report</h2>
            <button onClick={handleGenerateReport}>Generate Inventory Movement Report</button>
        </div>
    );
};

export default ReportGeneration;
