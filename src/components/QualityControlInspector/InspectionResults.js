import React from 'react';
import { Table, Divider } from 'antd';

const InspectionResults = () => {
  // Sample data for inspection results
  const inspectionData = [
    {
      key: '1',
      itemName: 'Soya Bean',
      date: '2024-11-01',
      inspectedBy: 'eleni',
      result: 'Pass',
      criteria: 'Moisture check, Packaging check, Expiry check',
    },
    {
      key: '2',
      itemName: 'Film',
      date: '2024-10-29',
      inspectedBy: 'biruk',
      result: 'Fail',
      criteria: 'Film quality check, Packaging integrity check',
    },
    {
      key: '3',
      itemName: 'Seasoning',
      date: '2024-11-02',
      inspectedBy: 'beza',
      result: 'Pass',
      criteria: 'Smell check, Packaging seal check',
    },
  ];

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: 'Inspection Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Inspected By',
      dataIndex: 'inspectedBy',
      key: 'inspectedBy',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Criteria',
      dataIndex: 'criteria',
      key: 'criteria',
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Inspection Results</h2>
      <Divider />
      
      <Table
        columns={columns}
        dataSource={inspectionData}
        pagination={false}
        style={styles.table}
      />
    </div>
  );
};

// Styles for better visual appeal
const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '20px auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    marginTop: '20px',
  },
};

export default InspectionResults;
