import './App.css';
import {ToastContainer, Zoom} from "react-toastify";
import Notification from "./firebaseNotifications/Notification";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Home View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h2>About View</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function NoMatch() {
  return (
    <div style={{ padding: 20 }}>
      <h2>404: Page Not Found</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adip.</p>
    </div>
  );
}

function App() {
  const [isGrranted, setGranted] = useState("notGranted")
  const getPermission = async () =>  {
    if("Notification" in window) {
      if(Notification.permission !== "granted") {
        await Notification.requestPermission().then((permission) => {
          if(permission === "granted") {
            setGranted("granted")
          }
        })
      }
    }
  }
  return (
      <Router>
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
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
        Home
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
        About
        </Link>
      </nav>
      <div>
        <h1>Granted statust: {isGrranted}</h1>
        <button onClick={getPermission}>Notification Permission</button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
