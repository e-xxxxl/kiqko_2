import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './similar.css';

const SimilarUsersSection = () => {
  const [similarUsers, setSimilarUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchSimilarUsers = async () => {
      try {
        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await fetch(`https://kiqko-backend.onrender.com/api/users/similar-users/${userId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }

        const data = await response.json();
        console.log('Fetched users:', data);
        setSimilarUsers(data);
        
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarUsers();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-4">Loading similar users...</div>;
  }
  
  if (error) {
    return <div className="text-center py-4 text-danger">Error: {error}</div>;
  }

  return (
    <div className="similar-user">
      <h5>Similar Users</h5>
      <Row>
        {similarUsers.length > 0 ? (
          similarUsers.map(user => (
            <Col md={3} key={user._id}>
              <div className="similar-user-block">
                <NavLink to={`/userprofile/${user._id}`}>
                  <img
                    className="sm-user-profile rounded-circle"
                    src={
                      user.profilephoto?.trim() || 
                      user.profile?.profilephoto?.trim() ||
                      'https://cdn-icons-png.flaticon.com/512/847/847969.png'
                    }
                    alt={user.username}
                    onError={(e) => {
                      e.target.src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
                    }}
                  />
                  <div className="simler-user-details">
                    <h6>{user.username}</h6>
                    <p>
                      {user.profile?.age || 'N/A'}, {user.profile?.gender || user.gender || 'N/A'},{' '}
                      {user.profile?.maritalStatus || 'N/A'}
                    </p>
                    <p>
                      {user.location?.city || 'N/A'}
                      {user.location?.state ? `, ${user.location.state}` : ''}
                    </p>
                  </div>
                </NavLink>
              </div>
            </Col>
          ))
        ) : (
          <Col md={12} className="text-center py-3 text-muted">
            No opposite gender users found.
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SimilarUsersSection;