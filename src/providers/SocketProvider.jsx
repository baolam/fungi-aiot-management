import React, { useEffect, useState } from 'react';
import { socket as newSocket } from '../config/socket';
import { SocketContext } from '../config/socket';
import { useDispatch } from 'react-redux';
import { addOnline, initalizeOnlineDevices } from '../store/harvest.store';

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(newSocket);

    newSocket.on('harvest-online', (harvest_id) => {
      dispatch(addOnline(harvest_id));
    });

    newSocket.on('harvest-onlines', (harvests) => {
      dispatch(initalizeOnlineDevices(harvests));
    });

    return () => {
      newSocket.off('harvest-online');
      newSocket.off('harvest-onlines');
      newSocket.disconnect();
    };
  }, [dispatch]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
