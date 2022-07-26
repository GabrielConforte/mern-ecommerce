import socket from 'socket.io-client';

let Socket = socket('http://localhost:5001');

export default Socket;