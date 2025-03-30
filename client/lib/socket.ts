import { io } from 'socket.io-client'

// Create the socket instance
const socket = io('https://paintsync-backend69.onrender.com', {
  transports: ['websocket'],
  autoConnect: false,
});

// Export as a named export instead of default export
export { socket };
