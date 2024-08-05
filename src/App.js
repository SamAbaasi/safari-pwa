import './App.css';
import {ToastContainer, Zoom} from "react-toastify";
import Notification from "./firebaseNotifications/Notification";
import { useState } from 'react';

function App() {
const [count, setCount] = useState(0)  
  return (
    <div className="App">
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Zoom}
          closeButton={false}
      />
        <Notification/>
        <h1>counter is: {count}</h1>
        <button onClick={() => setCount(c => c + 1)}>Add counter</button>
    </div>
  );
}

export default App;
