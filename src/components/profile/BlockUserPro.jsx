import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const BlockUserPro = ({ isShowBlockUser, handleBlockUser, onBlockStatusChange }) => {
  const currentUserId = localStorage.getItem('userId');
  const { userId } = useParams();
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check block status when modal opens
  useEffect(() => {
    const checkBlockStatus = async () => {
      try {
        const response = await axios.get(
          `https://kiqko-backend.onrender.com/api/users/blocked-users/${currentUserId}`
        );
        const isUserBlocked = response.data.data?.some(
          user => user.blocked._id === userId
        );
        setIsBlocked(isUserBlocked);
      } catch (error) {
        console.error('Error checking block status:', error);
      }
    };

    if (isShowBlockUser) {
      checkBlockStatus();
    }
  }, [isShowBlockUser, currentUserId, userId]);

  const handleConfirmAction = async () => {
    setIsLoading(true);
    try {
      if (isBlocked) {
        // Unblock user
        await axios.delete('https://kiqko-backend.onrender.com/api/users/unblock-user', {
          data: { blockerId: currentUserId, blockedId: userId }
        });
        toast.success('User unblocked successfully');
      } else {
        // Block user
        await axios.post('https://kiqko-backend.onrender.com/api/users/block-user', {
          blockerId: currentUserId,
          blockedId: userId
        });
        toast.success('User blocked successfully');
      }
      
      setIsBlocked(!isBlocked);
      onBlockStatusChange?.(!isBlocked); // Notify parent of status change
      handleBlockUser(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        `Failed to ${isBlocked ? 'unblock' : 'block'} user`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={isShowBlockUser}
      onHide={() => handleBlockUser(false)}
      backdrop="static"
      keyboard={false}
      dialogClassName="custom-all-modal modal-all-width bloch-user-modal space-all-modal-top"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {isBlocked ? 'Unblock User' : 'Block User'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="pb-5">
        <div className="modal-all-padding">
          <p className="p-all-modal text-center">
            {isBlocked
              ? 'Are you sure you want to unblock this user?'
              : 'Are you sure you want to block this user?'}
          </p>

          <Row className="m-0 mb-4 ps-3 pe-5">
            <Col className="btn-modal-round" lg={6}>
              <Button 
                variant="link" 
                onClick={() => handleBlockUser(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Col>
            <Col className="btn-modal-round" lg={6}>
              <Button
                variant="link"
                onClick={handleConfirmAction}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Confirm'}
              </Button>
            </Col>
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BlockUserPro;