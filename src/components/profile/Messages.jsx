import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import checkall from "../../assets/images/checkall.png";
import deleteall from "../../assets/images/deleteall.png";
import { io } from "socket.io-client";

const socket = io("https://kiqko-backend.onrender.com", { transports: ["websocket"] });

const Messages = () => {
  const currentUserId = localStorage.getItem("userId");
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConversations, setSelectedConversations] = useState([]);
  const history = useHistory();

  // Register user with Socket.IO
  useEffect(() => {
    if (currentUserId) {
      socket.emit("register", currentUserId);
      console.log(`Registered user ${currentUserId} with Socket.IO`);
    }
    return () => socket.off("register");
  }, [currentUserId]);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `https://kiqko-backend.onrender.com/api/messages/conversations/${currentUserId}`
        );
        console.log("Conversations response:", response.data);
        setConversations(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching conversations:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load conversations. Please try again."
        );
        setConversations([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUserId) fetchConversations();
  }, [currentUserId]);

  // Handle clicking on a conversation
  const handleConversationClick = (userId) => {
    history.push(`/chat/${userId}`);
  };

  // Format message preview
  const getMessagePreview = (message) => {
    if (message.attachment) return "📎 Attachment";
    return message.text?.length > 30
      ? `${message.text.substring(0, 30)}...`
      : message.text || "";
  };

  // Handle checkbox toggle
  const handleCheckboxToggle = (userId) => {
    setSelectedConversations((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedConversations.length === conversations.length) {
      setSelectedConversations([]);
    } else {
      setSelectedConversations(conversations.map((conv) => conv.user._id));
    }
  };

  // Handle delete (placeholder)
  const handleDelete = async () => {
    if (selectedConversations.length === 0) return;
    try {
      console.log("Deleting conversations:", selectedConversations);
      setConversations((prev) =>
        prev.filter((conv) => !selectedConversations.includes(conv.user._id))
      );
      setSelectedConversations([]);
    } catch (err) {
      console.error("Error deleting conversations:", err);
      setError("Failed to delete conversations. Please try again.");
    }
  };

  return (
    <div className="table-all-mailbox">
      <Table responsive="sm">
        <thead>
          <tr>
            <th className="sender-th">Sender</th>
            <th>Message</th>
            <th className="date-th">Date / Time</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3" className="text-center">
                <div
                  className="spinner-border text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="3" className="text-center text-danger">
                {error}
                <button
                  className="btn btn-link ms-2"
                  onClick={() => {
                    setIsLoading(true);
                    setError(null);
                    fetchConversations();
                  }}
                >
                  Retry
                </button>
              </td>
            </tr>
          ) : conversations.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No conversations yet. Start a chat!
              </td>
            </tr>
          ) : (
            conversations.map((conv) => (
              <tr
                key={conv.user._id}
                onClick={() => handleConversationClick(conv.user._id)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <Form.Group
                    className="check-mail"
                    controlId={`checkbox-${conv.user._id}`}
                  >
                    <Form.Check
                      type="checkbox"
                      label={conv.user.username}
                      checked={selectedConversations.includes(conv.user._id)}
                      onChange={() => handleCheckboxToggle(conv.user._id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Form.Group>
                </td>
                <td>{getMessagePreview(conv.lastMessage)}</td>
                <td>
                  {formatDistanceToNow(new Date(conv.lastMessage.timestamp), {
                    addSuffix: true,
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div className="footer-table">
        <label onClick={handleSelectAll} style={{ cursor: "pointer" }}>
          Select All
          <img src={checkall} alt="checkall" />
        </label>
        <label onClick={handleDelete} style={{ cursor: "pointer" }}>
          Delete
          <img src={deleteall} alt="deleteall" />
        </label>
      </div>
      <style jsx>{`
        .table-all-mailbox {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .table-all-mailbox th,
        .table-all-mailbox td {
          padding: 12px;
          vertical-align: middle;
        }
        .table-all-mailbox tr:hover {
          background: rgba(0, 0, 0, 0.03);
        }
        .footer-table {
          display: flex;
          justify-content: flex-start;
          gap: 20px;
          padding: 10px 15px;
          border-top: 1px solid #eee;
        }
        .footer-table label {
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          font-size: 14px;
          color: #333;
        }
        .footer-table img {
          width: 20px;
          height: 20px;
        }
      `}</style>
    </div>
  );
};

export default Messages;