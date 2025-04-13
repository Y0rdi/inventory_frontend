import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersForSupplier, // Use the correct export name
  confirmOrder,
} from "../../redux/slices/ordersSlice"; // Adjust the import path as needed

import { Button, Spin, Table, message, Modal, Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

const SupplierOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state) => state.orders
  );
  const supplierID = useSelector((state) => state.auth.supplierID); // Get supplierID from the Redux state

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [form] = Form.useForm();

  // Fetch orders for the supplier on component mount
  useEffect(() => {
    dispatch(fetchOrdersForSupplier());
  }, [dispatch]);

  // Open the confirmation modal
  const handleOpenConfirmModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
    form.resetFields(); // Clear previous form data
  };

  // Confirm order with delivery details
  const handleConfirmOrder = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = dayjs(values.deliveryDate).format("YYYY-MM-DD"); // Convert date format

      if (!selectedOrder) {
        message.error("No order selected.");
        return;
      }

      // Dispatch the confirm order action
      await dispatch(
        confirmOrder({
          orderID: selectedOrder.orderID,
          deliveryInfo: values.deliveryInfo,
          deliveryDate: formattedDate,
        })
      ).unwrap();

      message.success("Order confirmed successfully!");
      setIsModalVisible(false); // Close the modal after success
    } catch (error) {
      message.error(error.message || "Failed to confirm order.");
    }
  };

  // Refresh orders list
  const handleRefresh = () => {
    dispatch(fetchOrdersForSupplier());
  };

  // Define table columns
  const columns = [
    { title: "Item Name", dataIndex: "itemDetails", key: "itemName" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Note", dataIndex: "note", key: "note" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Delivery Date", dataIndex: "deliveryDate", key: "deliveryDate" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleOpenConfirmModal(record)}
            disabled={record.status === "Confirmed" || record.status === "Delivered"}
          >
            Confirm
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Button type="primary" onClick={handleRefresh} style={{ marginBottom: "10px" }}>
        Refresh
      </Button>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <Table dataSource={orders} columns={columns} rowKey="orderID" />
      )}

      {/* Confirm Order Modal */}
      <Modal
        title="Confirm Order"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleConfirmOrder}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Delivery Date"
            name="deliveryDate"
            rules={[{ required: true, message: "Please select a delivery date" }]}
          >
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            label="Delivery Information"
            name="deliveryInfo"
            rules={[{ required: true, message: "Please enter delivery information" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter details about the delivery" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplierOrders;
