// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Join from "./component/Join/Join";
// import Chat from "./component/Chat/Chat"

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" Component={Join} />
//           <Route path="/chat" Component={Chat} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <RouteManager />
      </Router>
    </div>
  );
}

// This component manages routes and ensures the last visited path is restored
function RouteManager() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Save the current route to localStorage whenever it changes
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  useEffect(() => {
    // On initial load, check if a last route exists and navigate to it
    const lastRoute = localStorage.getItem("lastRoute");
    if (lastRoute && lastRoute !== location.pathname) {
      navigate(lastRoute);
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route path="/" Component={Join} />
      <Route path="/chat" Component={Chat} />
    </Routes>
  );
}

export default App;
