import { io } from 'socket.io-client';

// Backend URL (Use an environment variable for flexibility)
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://paintsync-backend69.onrender.com';

// Create the socket instance
const socket = io(BACKEND_URL, {
  transports: ['websocket'], // Use WebSocket transport
  autoConnect: false, // Prevent automatic connection
  reconnectionAttempts: 5, // Retry up to 5 times if disconnected
  timeout: 10000, // 10 seconds timeout for connection
});

// Handle connection errors
socket.on('connect_error', (err) => {
  console.error('⚠️ Socket connection error:', err.message);
});

// Handle disconnection
socket.on('disconnect', (reason) => {
  console.warn(`⚠️ Socket disconnected: ${reason}`);
});

// Function to connect manually
const connectSocket = () => {
  if (!socket.connected) {
    console.log('🔄 Connecting to Socket.IO server...');
    socket.connect();
  }
};

// Function to disconnect manually
const disconnectSocket = () => {
  if (socket.connected) {
    console.log('🔌 Disconnecting from Socket.IO server...');
    socket.disconnect();
  }
};

// Export everything as named exports
export { socket, connectSocket, disconnectSocket };
