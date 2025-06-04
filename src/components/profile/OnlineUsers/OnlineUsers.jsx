import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
const OnlineUsers = () => {
    const { t } = useTranslation();
    const [onlineStats, setOnlineStats] = useState({
    women: 0,
    men: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const response = await fetch('https://kiqko-backend.onrender.com/api/users/online-count');
        
        if (!response.ok) {
          throw new Error('No Internet Connection');
        }
        
        const data = await response.json();
        setOnlineStats({
          women: data.women || 0,
          men: data.men || 0,
          loading: false,
          error: null
        });
      } catch (err) {
        setOnlineStats(prev => ({
          ...prev,
          loading: false,
          error: 'No Internet Connection'
        }));
      }
    };

    fetchOnlineUsers();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchOnlineUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    
   <div className="top-user-id text-center">
  <div className="online-user-all">
    <h5 className="border-h5">{t('Users Online Now')}</h5>

    {onlineStats.loading ? (
      <p>Loading...</p>
    ) : onlineStats.error ? (
      <p style={{ color: 'red' }}>{onlineStats.error}</p>
    ) : (
      <>
        <div className="online-user-status border-right-online">
          <h6>Women</h6>
          <h4>{onlineStats.women}</h4>
        </div>
        <div className="online-user-status">
          <h6>Men</h6>
          <h4>{onlineStats.men}</h4>
        </div>
      </>
    )}
  </div>
</div>
    </>
  )
}

export default OnlineUsers