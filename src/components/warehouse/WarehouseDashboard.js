// src/components/warehouse/WarehouseDashboard.js
import React, { useState } from 'react';
import { Button, Table, Input, Modal } from 'antd';

const WarehouseDashboard = () => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({ name: '', quantity: 0, quality: '' });

  const addItem = () => {
    setItems([...items, currentItem]);
    setCurrentItem({ name: '', quantity: 0, quality: '' });
    setModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setModalVisible(true)}>Log Received Item</Button>
      <Table
        dataSource={items}
        columns={[
          { title: 'Item', dataIndex: 'name', key: 'name' },
          { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
          { title: 'Quality', dataIndex: 'quality', key: 'quality' },
        ]}
      />
      <Modal visible={modalVisible} onOk={addItem} onCancel={() => setModalVisible(false)} title="Log Item">
        <Input placeholder="Item Name" value={currentItem.name} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} />
        <Input placeholder="Quantity" type="number" value={currentItem.quantity} onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })} />
        <Input placeholder="Quality" value={currentItem.quality} onChange={(e) => setCurrentItem({ ...currentItem, quality: e.target.value })} />
      </Modal>
    </div>
  );
};

export default WarehouseDashboard;
