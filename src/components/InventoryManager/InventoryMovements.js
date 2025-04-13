import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventoryRequests, approveInventoryRequest } from "../../redux/slices/approveinventoryrequest";
import { Table, Button, Spin, Alert } from "antd";

const InventoryRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.inventoryRequests);

  useEffect(() => {
    dispatch(fetchInventoryRequests());
  }, [dispatch]);

  const handleApprove = (requestID) => {
    dispatch(approveInventoryRequest(requestID));  // dispatching the action with reqid
  };

  const columns = [
    {
      title: "Request ID",
      dataIndex: "reqid",
      key: "reqid",
    },
    {
      title: "Item",
      dataIndex: "reqitem",
      key: "reqitem",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Requested By",
      dataIndex: "requestedBy",
      key: "requestedBy",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "Pending" ? "orange" : "green" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        record.status === "Pending" ? (
          <Button type="primary" onClick={() => handleApprove(record.reqid)}>  {/* Passing reqid here */}
            Approve
          </Button>
        ) : (
          <Button disabled>Approved</Button>
        ),
    },
  ];

  return (
    <div>
      <h2>Inventory Requests</h2>
      {loading && <Spin tip="Loading..." />}
      {error && <Alert type="error" message={`Error: ${error}`} />}
      <Table
        dataSource={requests}
        columns={columns}
        rowKey="reqid"
        pagination={false} // To disable pagination for simplicity
        bordered
      />
    </div>
  );
};

export default InventoryRequests;
