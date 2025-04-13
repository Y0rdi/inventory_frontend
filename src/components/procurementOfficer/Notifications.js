// src/components/PendingRequests.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPendingRequests } from "../../redux/slices/pendingRequestsSlice";

const PendingRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pendingRequests = [], pendingCount, loading, errorMessage } = useSelector(
    (state) => state.pendingRequests
  );
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    dispatch(getPendingRequests());
  }, [dispatch]);

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleUpdateStatus = (requestID) => {
    // Save the selected request ID in localStorage temporarily
    localStorage.setItem("selectedRequestID", requestID);

    // Redirect to the requested items page (without passing the request ID in the URL)
    navigate("/procurement-officer/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div>
      <h2>Pending Requests</h2>
      <p>Total Pending Requests: {pendingCount}</p>
      {pendingRequests.length === 0 ? (
        <p>No pending requests available.</p>
      ) : (
        <ul>
          {pendingRequests.map((request) => (
            <li key={request.requestID} style={{ marginBottom: "20px" }}>
              <div
                onClick={() => handleOpenModal(request)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {/* Preview section (Item name and Status) */}
                <p><strong>Item:</strong> {request.itemDetails}</p>
                <p><strong>Status:</strong> {request.status}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for request details */}
      {selectedRequest && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Request Details</h3>
            <p><strong>Item:</strong> {selectedRequest.itemDetails}</p>
            <p><strong>Quantity:</strong> {selectedRequest.quantity}</p>
            <p><strong>Delivery Requirements:</strong> {selectedRequest.deliveryRequirements}</p>
            <p><strong>Requested By:</strong> {selectedRequest.requestedBy}</p>
            <p><strong>Request Date:</strong> {new Date(selectedRequest.requestDate).toLocaleString()}</p>
            <p><strong>Note:</strong> {selectedRequest.Note || "No note provided"}</p>

            <div style={styles.modalActions}>
              <button style={styles.cancelButton} onClick={handleCloseModal}>
                Close
              </button>
              <button 
                style={styles.updateButton} 
                onClick={() => handleUpdateStatus(selectedRequest.requestID)}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modalOverlay: { 
    position: "fixed", 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  modalContent: { 
    backgroundColor: "white", 
    padding: "20px", 
    borderRadius: "8px", 
    width: "400px", 
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" 
  },
  modalActions: { 
    display: "flex", 
    justifyContent: "flex-end", 
    gap: "10px" 
  },
  cancelButton: { 
    padding: "10px 20px", 
    color: "black", 
    backgroundColor: "#bbb", 
    border: "none", 
    borderRadius: "4px", 
    cursor: "pointer" 
  },
  updateButton: { 
    padding: "10px 20px", 
    color: "white", 
    backgroundColor: "#4CAF50", 
    border: "none", 
    borderRadius: "4px", 
    cursor: "pointer" 
  }
};

export default PendingRequests;
