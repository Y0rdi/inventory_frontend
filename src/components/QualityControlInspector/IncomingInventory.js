import React, { useState } from 'react';
import { Modal, Button, Checkbox, Radio, Divider } from 'antd';

const IncomingInventory = () => {
  // Manually define the sample item data
  const item = {
    itemName: 'Soya Bean',
    date: '2024-11-01',
    quantity: 100,
    loggedBy: 'Alemu k.',
    status: 'Pending',
  };

  const [checklistVisible, setChecklistVisible] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [inspectionResult, setInspectionResult] = useState('');

  // Simulated checklists for different items
  const getChecklist = (itemName) => {
    if (itemName === 'Soya Bean') {
      return [
        'Check for moisture',
        'Check packaging condition',
        'Check expiry date',
      ];
    }
    if (itemName === 'Film') {
      return [
        'Check for film quality',
        'Check packaging integrity',
      ];
    }
    if (itemName === 'Seasoning') {
      return [
        'Check for smell',
        'Check packaging seal',
      ];
    }
    return [];
  };

  const handleChecklistClick = () => {
    setChecklistVisible(true);
  };

  const handleChecklistCancel = () => {
    setChecklistVisible(false);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedCriteria((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleResultChange = (e) => {
    setInspectionResult(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Checklist passed/failed:', inspectionResult);
    console.log('Checked criteria:', selectedCriteria);
    setChecklistVisible(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.itemDetails}>
        <h3 style={styles.header}>Item Details</h3>
        <p><strong>Item Name:</strong> {item.itemName}</p>
        <p><strong>Date:</strong> {item.date}</p>
        <p><strong>Quantity:</strong> {item.quantity}</p>
        <p><strong>Logged By:</strong> {item.loggedBy}</p>
        <p><strong>Status:</strong> {item.status}</p>

        <Button
          type="primary"
          onClick={handleChecklistClick}
          style={styles.button}
        >
          Fill Quality Checklist
        </Button>
      </div>

      {/* Checklist Modal for Quality Control */}
      <Modal
        title={`Quality Control Checklist for ${item.itemName}`}
        visible={checklistVisible}
        onCancel={handleChecklistCancel}
        footer={null}
        width={600}
      >
        <div>
          <h4>Quality Control Criteria:</h4>
          <ul>
            {getChecklist(item.itemName).map((check, index) => (
              <li key={index}>
                <Checkbox value={check} onChange={handleCheckboxChange}>{check}</Checkbox>
              </li>
            ))}
          </ul>

          <Divider />

          <h4>Inspection Result:</h4>
          <Radio.Group onChange={handleResultChange} value={inspectionResult}>
            <Radio value="pass">Pass</Radio>
            <Radio value="fail">Fail</Radio>
          </Radio.Group>

          <div style={{ marginTop: 16 }}>
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </Modal>
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
    maxWidth: '600px',
    margin: '20px auto',
  },
  itemDetails: {
    backgroundColor: '#fafafa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    marginTop: '20px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default IncomingInventory;
