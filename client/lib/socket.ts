import { io } from 'socket.io-client'

const socket = io('https://paintsync-backend69.onrender.com', {
  transports: ['websocket'],
  autoConnect: false,
});

export default socket;
