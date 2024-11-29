import React, { useState } from 'react';
import { Table, Button, Modal, message } from 'antd';

const InternalTransferPage = () => {
  // Sample internal transfer requests data
  const [requests, setRequests] = useState([
    {
      key: '1',
      itemName: 'Laptop',
      department: 'IT',
      quantity: 5,
      approvedBy: 'Inventory Manager',
      status: 'Approved',
    },
    {
      key: '2',
      itemName: 'Desk Chair',
      department: 'HR',
      quantity: 2,
      approvedBy: 'Inventory Manager',
      status: 'Pending',
    },
    {
      key: '3',
      itemName: 'Printer',
      department: 'Admin',
      quantity: 1,
      approvedBy: 'Inventory Manager',
      status: 'Approved',
    },
  ]);

  const handleMarkProcessed = (request) => {
    // Check if the request has been approved
    if (request.status === 'Approved') {
      // Update status to "Processed"
      const updatedRequests = requests.map((req) =>
        req.key === request.key ? { ...req, status: 'Processed' } : req
      );
      setRequests(updatedRequests);
      message.success('Request marked as processed.');
    } else {
      message.error('Request must be approved before processing.');
    }
  };

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Approved By',
      dataIndex: 'approvedBy',
      key: 'approvedBy',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'Processed' ? 'green' : status === 'Approved' ? 'blue' : 'red' }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => handleMarkProcessed(record)}
          disabled={record.status === 'Processed'}
        >
          Mark as Processed
        </Button>
      ),
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Internal Transfer Requests</h2>
      <Table
        columns={columns}
        dataSource={requests}
        pagination={false}
        style={styles.table}
      />
    </div>
  );
};


const styles = {
  container: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '60px auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  table: {
    marginTop: '20px',
  },
};

export default InternalTransferPage;
