import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory, updateThreshold } from "../../redux/slices/inventorySlice";
import { Table, Button, Input, Modal } from "antd";

const InventoryList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.inventory);
  const [threshold, setThreshold] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleUpdateThreshold = (item, rowIndex) => {
    setSelectedRowIndex(rowIndex);
    setThreshold(item.threshold);
    setIsModalVisible(true);
  };

  const handleConfirmUpdate = () => {
    if (selectedRowIndex !== null && threshold !== null) {
      const selectedItem = items[selectedRowIndex];
      dispatch(updateThreshold({ id: selectedItem.inventoryID, threshold }));
      setIsModalVisible(false);
    }
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const handleRefresh = () => {
    dispatch(fetchInventory());
  };

  if (loading) {
    return <div>Loading inventory...</div>;
  }

  if (error) {
    return <div>Error: {error.message || "An unknown error occurred"}</div>;
  }

  const columns = [
    {
      title: "Item",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Threshold",
      dataIndex: "threshold",
      key: "threshold",
      render: (text, record, rowIndex) => (
        <>
          <span>{text}</span>
          <Button type="link" onClick={() => handleUpdateThreshold(record, rowIndex)} style={{ marginLeft: 10 }}>
            Update
          </Button>
        </>
      ),
    },
  ];

  return (
    <div >
      <h2>Inventory List</h2>
      <Button type="primary" onClick={handleRefresh} style={{ marginBottom: 16 }}>
        Refresh
      </Button>

      <Table
        columns={columns}
        dataSource={items}
        rowKey="inventoryID"
        pagination={false}
        rowClassName={(record) => (record.quantity === record.threshold ? "low-threshold" : "")} // Apply class conditionally
      />

      <Modal title="Update Threshold" visible={isModalVisible} onOk={handleConfirmUpdate} onCancel={handleCancelModal}>
        <Input type="number" value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} placeholder="Enter new threshold" />
      </Modal>

      {/* Style for red row */}
      <style>
        {`
          .low-threshold {
            background-color: #ffcccc !important; /* Light red background */
          }
        `}
      </style>
    </div>
  );
};

export default InventoryList;
