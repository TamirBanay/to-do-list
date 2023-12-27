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
import Todo from "./pages/todo/TodoPage";
import { _userIsLoggedIn, _currentUserId, _user } from "./services/atom";
import { useRecoilState } from "recoil";

function App() {
  let { userId } = useParams();
  const [currentUserId, setCurrentUserId] = useRecoilState(_currentUserId);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:currentUserId/todo" element={<Todo />} />

          {/* Add other routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
