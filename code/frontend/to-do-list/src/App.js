import "./App.css";
// import react from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login/LoginPage";
import Register from "./pages/register/RegisterPage";

function App() {
  let { userId } = useParams();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/:currentUserId/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Add other routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
