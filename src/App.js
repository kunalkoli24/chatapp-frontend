import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./component/Join/Join";
import Chat from "./component/Chat/Chat"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={Join} />
          <Route path="/chat" Component={Chat} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
