import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:3002');


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;