// src/components/QualityControlInspector/ChecklistPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Checkbox, Button } from 'antd';

const ChecklistPage = () => {
  const { itemName } = useParams(); // Get the item name from the URL

  const [checklist, setChecklist] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  // Define different checklists for each item
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

  useEffect(() => {
    setChecklist(getChecklist(itemName));
  }, [itemName]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setCheckedItems(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSubmit = () => {
    // Here you can add logic to save the checklist status
    console.log('Checked items:', checkedItems);
  };

  return (
    <div>
      <h2>Quality Control Checklist for {itemName}</h2>
      <ul>
        {checklist.map((item, index) => (
          <li key={index}>
            <Checkbox value={item} onChange={handleCheckboxChange}>{item}</Checkbox>
          </li>
        ))}
      </ul>
      <Button type="primary" onClick={handleSubmit}>Submit Checklist</Button>
    </div>
  );
};

export default ChecklistPage;
